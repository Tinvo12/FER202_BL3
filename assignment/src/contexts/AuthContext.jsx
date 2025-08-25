import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createAccount, findAccountByEmail } from '../services/api';

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'auth:user';
const REDIRECT_KEY = 'auth:redirectAfterLogin';

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [redirectAfterLogin, setRedirectAfterLogin] = useState('/');

	// restore from localStorage
	useEffect(() => {
		try {
			const raw = localStorage.getItem(AUTH_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				setUser(parsed);
			}
			const r = localStorage.getItem(REDIRECT_KEY);
			if (r) setRedirectAfterLogin(r);
		} catch {}
	}, []);

	useEffect(() => {
		if (user) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
		else localStorage.removeItem(AUTH_STORAGE_KEY);
	}, [user]);

	const login = useCallback(async (email, password) => {
		try {
			const account = await findAccountByEmail(email);
			if (!account || account.password !== password) {
				throw new Error('Invalid email or password');
			}
			// Lưu thông tin đầy đủ của user
			setUser(account);
			return account;
		} catch (error) {
			throw new Error('Login failed. Please check your credentials and try again.');
		}
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	const register = useCallback(async (payload) => {
		// payload includes: name, email, avatar, username, password, secretQuestion, answer, address, wishlist
		const created = await createAccount(payload);
		// Lưu thông tin đầy đủ của user
		setUser(created);
		return created;
	}, []);

	const setRedirect = useCallback((uri) => {
		const next = uri || '/';
		setRedirectAfterLogin(next);
		localStorage.setItem(REDIRECT_KEY, next);
	}, []);

	const value = useMemo(() => ({
		user,
		redirectAfterLogin,
		login,
		logout,
		register,
		setRedirectAfterLogin: setRedirect
	}), [user, redirectAfterLogin, login, logout, register, setRedirect]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


