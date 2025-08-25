import React, { useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function Cart() {
	const { items, incQty, decQty, removeFromCart, subtotal } = useContext(CartContext);

	return (
		<Container className="py-4">
			<h3 className="mb-3">Cart</h3>
			<Table bordered hover responsive>
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Qty</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items.map((it) => (
						<tr key={it.id}>
							<td>{it.title}</td>
							<td>${it.price}</td>
							<td>
								<Button size="sm" variant="light" onClick={() => decQty(it.id)}>-</Button>
								<span className="mx-2">{it.qty}</span>
								<Button size="sm" variant="light" onClick={() => incQty(it.id)}>+</Button>
							</td>
							<td>${(it.qty * it.price).toFixed(2)}</td>
							<td><Button size="sm" variant="outline-danger" onClick={() => removeFromCart(it.id)}>Remove</Button></td>
						</tr>
					))}
				</tbody>
			</Table>
			<div className="d-flex justify-content-between align-items-center">
				<h5>Subtotal: ${subtotal.toFixed(2)}</h5>
				<Button as={Link} to="/checkout" disabled={items.length === 0}>Proceed to Checkout</Button>
			</div>
		</Container>
	);
}


