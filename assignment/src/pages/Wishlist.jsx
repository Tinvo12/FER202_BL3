import React, { useContext, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { WishlistContext } from '../contexts/WishlistContext.jsx';
import { getProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
	const { ids } = useContext(WishlistContext);
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			const data = await getProducts();
			setProducts(data);
		})();
	}, []);

	const wished = useMemo(() => products.filter((p) => ids.includes(p.id)), [products, ids]);

	return (
		<Container className="py-4">
			<h3 className="mb-3">Wishlist</h3>
			{wished.length === 0 ? (
				<Alert variant="info">Your wishlist is empty.</Alert>
			) : (
				<Row xs={1} md={2} lg={3} className="g-3">
					{wished.map((p) => (
						<Col key={p.id}><ProductCard product={p} /></Col>
					))}
				</Row>
			)}
		</Container>
	);
}


