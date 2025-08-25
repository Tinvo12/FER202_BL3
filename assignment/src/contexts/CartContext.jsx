import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';

export const CartContext = createContext(null);

const STORAGE_KEY = 'cart:items';

function cartReducer(state, action) {
	switch (action.type) {
		case 'INIT':
			return Array.isArray(action.payload) ? action.payload : state;
		case 'ADD': {
			const exists = state.find((it) => it.id === action.payload.id);
			if (exists) {
				return state.map((it) => (it.id === action.payload.id ? { ...it, qty: it.qty + (action.payload.qty || 1) } : it));
			}
			return [...state, { ...action.payload, qty: action.payload.qty || 1 }];
		}
		case 'REMOVE':
			return state.filter((it) => it.id !== action.payload);
		case 'INC':
			return state.map((it) => (it.id === action.payload ? { ...it, qty: it.qty + 1 } : it));
		case 'DEC':
			return state.map((it) => (it.id === action.payload ? { ...it, qty: Math.max(1, it.qty - 1) } : it));
		case 'CLEAR':
			return [];
		default:
			return state;
	}
}

export function CartProvider({ children }) {
	const [items, dispatch] = useReducer(cartReducer, []);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) });
		} catch {}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items]);

	const addToCart = useCallback((product) => {
		dispatch({ type: 'ADD', payload: { id: product.id, title: product.title, price: product.salePrice ?? product.price, image: product.image } });
	}, []);

	const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), []);
	const incQty = useCallback((id) => dispatch({ type: 'INC', payload: id }), []);
	const decQty = useCallback((id) => dispatch({ type: 'DEC', payload: id }), []);
	const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

	const { count, subtotal } = useMemo(() => {
		const countVal = items.reduce((acc, it) => acc + it.qty, 0);
		const subtotalVal = items.reduce((acc, it) => acc + it.qty * Number(it.price), 0);
		return { count: countVal, subtotal: subtotalVal };
	}, [items]);

	const value = useMemo(() => ({ items, addToCart, removeFromCart, incQty, decQty, clearCart, count, subtotal }), [items, addToCart, removeFromCart, incQty, decQty, clearCart, count, subtotal]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


