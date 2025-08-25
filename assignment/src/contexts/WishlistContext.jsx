import React, { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { updateAccount, getAccountById } from '../services/api';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext(null);

const STORAGE_KEY = 'wishlist:ids';

export function WishlistProvider({ children }) {
	const [ids, setIds] = useState([]);
	const auth = useContext(AuthContext);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setIds(JSON.parse(raw));
		} catch {}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
	}, [ids]);

	// if logged in, try to sync from account on first load
	useEffect(() => {
		(async () => {
			try {
				if (auth && auth.user) {
					const account = await getAccountById(auth.user.id);
					if (Array.isArray(account.wishlist)) setIds(account.wishlist);
				}
			} catch (error) {
				// Fallback: check localStorage for accounts
				try {
					const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
					const account = accounts.find(a => a.id === auth.user.id);
					if (account && Array.isArray(account.wishlist)) {
						setIds(account.wishlist);
					}
				} catch {}
			}
		})();
	}, [auth]);

	const isWished = useCallback((id) => ids.includes(id), [ids]);

	const add = useCallback(async (id) => {
		setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
		try {
			if (auth && auth.user) {
				await updateAccount(auth.user.id, { wishlist: [...new Set([...ids, id])] });
			}
		} catch (error) {
			// Fallback: update localStorage
			try {
				const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
				const updatedAccounts = accounts.map(a => 
					a.id === auth.user.id 
						? { ...a, wishlist: [...new Set([...(a.wishlist || []), id])] }
						: a
				);
				localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
			} catch {}
		}
	}, [auth, ids]);

	const remove = useCallback(async (id) => {
		setIds((prev) => prev.filter((x) => x !== id));
		try {
			if (auth && auth.user) {
				await updateAccount(auth.user.id, { wishlist: ids.filter((x) => x !== id) });
			}
		} catch (error) {
			// Fallback: update localStorage
			try {
				const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
				const updatedAccounts = accounts.map(a => 
					a.id === auth.user.id 
						? { ...a, wishlist: (a.wishlist || []).filter(x => x !== id) }
						: a
				);
				localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
			} catch {}
		}
	}, [auth, ids]);

	const toggle = useCallback(async (id) => {
		if (ids.includes(id)) return remove(id);
		return add(id);
	}, [ids, add, remove]);

	const value = useMemo(() => ({ ids, isWished, add, remove, toggle }), [ids, isWished, add, remove, toggle]);

	return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}


