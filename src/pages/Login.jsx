import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Login Page - Art Deco Cinema Theme
 * Elegant login form with theatrical styling and sophisticated animations.
 */

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { login, loading } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const from = location.state?.from?.pathname || '/';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!email.trim()) {
			setError('Please enter your email');
			return;
		}

		if (!password.trim()) {
			setError('Please enter your password');
			return;
		}

		try {
			const success = await login(email, password);
			if (success) {
				navigate(from, { replace: true });
			} else {
				setError('Login failed. Please try again.');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
			{/* Background Decorations */}
			<div className="absolute inset-0">
				{/* Gradient Orbs */}
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B2626]/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />

				{/* Geometric Decorations */}
				<div className="absolute top-20 left-20 w-32 h-32 border border-[#D4AF37]/10 rotate-45 hidden lg:block" />
				<div className="absolute bottom-20 right-20 w-24 h-24 border border-[#D4AF37]/10 rotate-45 hidden lg:block" />
				<div className="absolute top-1/2 left-10 w-16 h-16 border border-[#D4AF37]/5 rotate-45 hidden lg:block" />
				<div className="absolute top-1/3 right-1/4 w-12 h-12 bg-[#D4AF37]/5 rotate-45 hidden lg:block" />
			</div>

			<div className="max-w-md w-full relative">
				{/* Logo Section */}
				<div className="text-center mb-12 opacity-0 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
					<Link to="/" className="inline-block">
						<div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
							<div className="absolute inset-0 border-2 border-[#D4AF37] rotate-45" />
							<span className="text-4xl relative z-10">🎭</span>
						</div>
					</Link>

					<h1 className="font-display text-4xl text-[#FDF8E8] mb-3">
						Welcome Back
					</h1>

					{/* Decorative Line */}
					<div className="flex items-center justify-center gap-3">
						<div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
						<div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
						<div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
					</div>

					<p className="text-[#FDF8E8]/50 mt-4">
						Sign in to access your reservations
					</p>
				</div>

				{/* Login Card */}
				<div className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-8 relative opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
					{/* Corner Decorations */}
					<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
					<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40" />
					<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40" />
					<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40" />

					{/* Decorative Top Line */}
					<div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

					{loading ? (
						<LoadingSpinner message="Signing you in..." />
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Error Message */}
							{error && (
								<div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
									{error}
								</div>
							)}

							{/* Email Field */}
							<div>
								<label className="block text-[#FDF8E8]/70 text-sm tracking-wider uppercase mb-3">
									Email Address
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
									className="w-full px-4 py-4 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
									autoComplete="email"
								/>
							</div>

							{/* Password Field */}
							<div>
								<label className="block text-[#FDF8E8]/70 text-sm tracking-wider uppercase mb-3">
									Password
								</label>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full px-4 py-4 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
									autoComplete="current-password"
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#1A1A1D] text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 relative overflow-hidden group"
							>
								<span className="relative z-10">Sign In</span>
								<div className="absolute inset-0 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
							</button>
						</form>
					)}

					{/* Divider */}
					<div className="flex items-center gap-4 my-8">
						<div className="flex-1 h-px bg-[#D4AF37]/20" />
						<span className="text-[#FDF8E8]/30 text-xs tracking-wider">OR</span>
						<div className="flex-1 h-px bg-[#D4AF37]/20" />
					</div>

					{/* Info Note */}
					<div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-4 py-4">
						<p className="text-sm text-[#FDF8E8]/60">
							<span className="text-[#D4AF37]">💡 Tip:</span> Any email and password works!
							Include "admin" in your email for admin access.
						</p>
					</div>
				</div>

				{/* Back to Home Link */}
				<div className="text-center mt-8 opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
					<p className="text-[#FDF8E8]/50">
						Just browsing?{' '}
						<Link to="/" className="text-[#D4AF37] hover:text-[#E5C158] transition-colors">
							Continue as Guest
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
