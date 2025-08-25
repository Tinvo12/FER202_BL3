import React, { useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { createOrder } from '../services/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
	const { items, subtotal, clearCart } = useContext(CartContext);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const submitOrder = async () => {
		if (!user) {
			toast.info('Please sign in to checkout');
			navigate('/login?redirect_uri=/checkout');
			return;
		}
		try {
			await createOrder({
				userid: user.id,
				items,
				total: subtotal,
				date: new Date().toISOString()
			});
			toast.success('Order placed!');
			clearCart();
			navigate('/');
		} catch {
			toast.error('Failed to place order');
		}
	};

	return (
		<Container className="py-4">
			<h3 className="mb-3">Checkout</h3>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Qty</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{items.map((it) => (
						<tr key={it.id}>
							<td>{it.title}</td>
							<td>${it.price}</td>
							<td>{it.qty}</td>
							<td>${(it.qty * it.price).toFixed(2)}</td>
						</tr>
					))}
					<tr>
						<td colSpan={3} className="text-end"><strong>Grand Total</strong></td>
						<td><strong>${subtotal.toFixed(2)}</strong></td>
					</tr>
				</tbody>
			</Table>
			<div className="text-end">
				<Button disabled={items.length === 0} onClick={submitOrder}>Confirm Order</Button>
			</div>
		</Container>
	);
}


