import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Authentication Context
 * Manages user authentication state across the application.
 * Provides login/logout functionality with localStorage persistence.
 */

const AuthContext = createContext(null);

/**
 * Custom hook to access auth context
 * @returns {Object} Auth context value with user, login, logout, and loading state
 */
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

/**
 * AuthProvider Component
 * Wraps the application to provide authentication state and methods.
 */
export const AuthProvider = ({ children }) => {
	// User state - null when not logged in, object when logged in
	const [user, setUser] = useState(null);
	// Loading state for simulating async authentication
	const [loading, setLoading] = useState(true);

	// Check for existing session on mount
	useEffect(() => {
		const initAuth = async () => {
			// Simulate async check with setTimeout
			await new Promise(resolve => setTimeout(resolve, 500));

			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	/**
	 * Login function - accepts any credentials and creates a dummy user
	 * @param {string} email - User email
	 * @param {string} password - User password (not validated)
	 * @returns {Promise<boolean>} Success status
	 */
	const login = async (email, password) => {
		setLoading(true);

		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 800));

		// Create dummy user object
		const userData = {
			id: Date.now(),
			email: email,
			name: email.split('@')[0], // Extract name from email
			isAdmin: email.toLowerCase().includes('admin'), // Admin check based on email
			createdAt: new Date().toISOString()
		};

		// Persist to localStorage
		localStorage.setItem('user', JSON.stringify(userData));
		setUser(userData);
		setLoading(false);

		return true;
	};

	/**
	 * Logout function - clears user state and localStorage
	 */
	const logout = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	const value = {
		user,
		login,
		logout,
		loading,
		isAuthenticated: !!user
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
