import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext.jsx';
import { WishlistContext } from '../contexts/WishlistContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
	const { addToCart } = useContext(CartContext);
	const { add, isWished } = useContext(WishlistContext);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const price = product.salePrice ?? product.price;
	const onSale = product.tags?.includes('sale') && product.salePrice != null;
	const isHot = product.tags?.includes('hot');

	const handleAddCart = () => {
		addToCart(product);
		toast.success('Added to cart!');
	};

	const handleWishlist = () => {
		if (!user) {
			toast.info('Please sign in to save wishlist');
			navigate(`/login?redirect_uri=${encodeURIComponent(location.pathname + location.search)}`);
			return;
		}
		if (isWished(product.id)) {
			navigate('/wishlist');
			return;
		}
		add(product.id);
		toast.success('Added to wishlist!');
	};

	return (
		<Card className="h-100">
			<div className="position-relative">
				<Card.Img variant="top" src={product.image} alt={product.title} />
				{isHot && <Badge bg="danger" className="position-absolute top-0 start-0 m-2">HOT</Badge>}
			</div>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="fs-6">{product.title}</Card.Title>
				<Card.Text className="mb-2 text-muted">{product.name}</Card.Text>
				<div className="mb-3">
					{onSale ? (
						<>
							<span className="text-decoration-line-through me-2">${product.price}</span>
							<strong>${price}</strong>
						</>
					) : (
						<strong>${price}</strong>
					)}
				</div>
				<div className="mt-auto d-flex gap-2">
					<Button variant="primary" onClick={handleAddCart}>Add to Cart</Button>
					<Button variant="outline-secondary" as={Link} to={`/product/${product.id}`}>View Details</Button>
					<Button variant="outline-danger" onClick={handleWishlist}>{user && isWished(product.id) ? 'View Wishlist' : 'Add to Wishlist'}</Button>
				</div>
			</Card.Body>
		</Card>
	);
}


