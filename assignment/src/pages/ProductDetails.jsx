import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { getProductById } from '../services/api.js';
import { CartContext } from '../contexts/CartContext.jsx';
import { WishlistContext } from '../contexts/WishlistContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const { addToCart } = useContext(CartContext);
	const { toggle, isWished } = useContext(WishlistContext);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		(async () => {
			const data = await getProductById(id);
			setProduct(data);
		})();
	}, [id]);

	if (!product) return null;

	const onAddCart = () => {
		addToCart(product);
		toast.success('Added to cart!');
	};

	const onWishlist = () => {
		if (!user) {
			toast.info('Please sign in to save wishlist');
			navigate(`/login?redirect_uri=${encodeURIComponent(location.pathname + location.search)}`);
			return;
		}
		toggle(product.id);
		toast.success(isWished(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
	};

	const onSale = product.tags?.includes('sale') && product.salePrice != null;
	const isHot = product.tags?.includes('hot');

	return (
		<Container className="py-4">
			<Row className="g-4">
				<Col md={6}>
					<img className="img-fluid" src={product.image} alt={product.title} />
				</Col>
				<Col md={6}>
					<h3>
						{product.title} {isHot && <Badge bg="danger" className="ms-2">HOT</Badge>}
					</h3>
					<p className="text-muted">{product.name}</p>
					<div className="mb-3">
						{onSale ? (
							<>
								<span className="text-decoration-line-through me-2">${product.price}</span>
								<strong>${product.salePrice}</strong>
							</>
						) : (
							<strong>${product.price}</strong>
						)}
					</div>
					<p>{product.description}</p>
					<div className="d-flex gap-2">
						<Button onClick={onAddCart}>Add to Cart</Button>
						<Button variant="outline-danger" onClick={onWishlist}>{user && isWished(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}


