import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar Component - Art Deco Cinema Theme
 * Elegant navigation bar with theatrical styling and smooth animations.
 */

const Navbar = () => {
	const { user, logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate('/');
		setIsMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<nav className="sticky top-0 z-50 bg-[#1A1A1D]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
			{/* Decorative top line */}
			<div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-3 group"
						onClick={closeMobileMenu}
					>
						{/* Art Deco Logo Mark */}
						<div className="relative w-12 h-12 flex items-center justify-center">
							<div className="absolute inset-0 border-2 border-[#D4AF37] rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
							<span className="text-2xl relative z-10">🎭</span>
						</div>
						<div className="hidden sm:block">
							<span className="font-display text-2xl font-semibold text-[#D4AF37] tracking-wide">
								EVENTIQUE
							</span>
							<div className="text-[10px] tracking-[0.3em] text-[#FDF8E8]/50 uppercase">
								Premium Events
							</div>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						<Link
							to="/"
							className="relative text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase transition-colors group"
						>
							Home
							<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
						</Link>

						{isAuthenticated ? (
							<>
								<Link
									to="/dashboard"
									className="relative text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase transition-colors group"
								>
									My Events
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
								</Link>

								{user?.isAdmin && (
									<Link
										to="/admin"
										className="relative text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase transition-colors group"
									>
										Manage
										<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
									</Link>
								)}

								{/* User Badge */}
								<div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#D4AF37]/30">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2626] to-[#6B1E1E] flex items-center justify-center border border-[#D4AF37]/50">
											<span className="font-display text-lg text-[#D4AF37]">
												{user?.name?.charAt(0).toUpperCase()}
											</span>
										</div>
										<div className="hidden lg:block">
											<p className="text-sm text-[#FDF8E8] font-medium">{user?.name}</p>
											{user?.isAdmin && (
												<span className="text-[10px] tracking-wider text-[#D4AF37] uppercase">
													Administrator
												</span>
											)}
										</div>
									</div>

									<button
										onClick={handleLogout}
										className="px-4 py-2 text-sm text-[#FDF8E8]/70 hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded transition-all duration-300"
									>
										Sign Out
									</button>
								</div>
							</>
						) : (
							<Link
								to="/login"
								className="relative px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#1A1A1D] text-sm font-semibold tracking-wider uppercase overflow-hidden group"
							>
								<span className="relative z-10">Enter</span>
								<div className="absolute inset-0 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMobileMenu}
						className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
						aria-label="Toggle menu"
					>
						<span className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
						<span className={`w-6 h-0.5 bg-[#D4AF37] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
						<span className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
					</button>
				</div>

				{/* Mobile Menu */}
				<div className={`md:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
					<div className="py-6 space-y-4 border-t border-[#D4AF37]/20">
						<Link
							to="/"
							className="block text-center text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase py-2 transition-colors"
							onClick={closeMobileMenu}
						>
							Home
						</Link>

						{isAuthenticated ? (
							<>
								<Link
									to="/dashboard"
									className="block text-center text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase py-2 transition-colors"
									onClick={closeMobileMenu}
								>
									My Events
								</Link>

								{user?.isAdmin && (
									<Link
										to="/admin"
										className="block text-center text-[#FDF8E8]/70 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase py-2 transition-colors"
										onClick={closeMobileMenu}
									>
										Manage
									</Link>
								)}

								{/* Mobile User Info */}
								<div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col items-center gap-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2626] to-[#6B1E1E] flex items-center justify-center border border-[#D4AF37]/50">
											<span className="font-display text-lg text-[#D4AF37]">
												{user?.name?.charAt(0).toUpperCase()}
											</span>
										</div>
										<span className="text-[#FDF8E8]">{user?.name}</span>
									</div>
									<button
										onClick={handleLogout}
										className="w-full max-w-xs py-2 text-sm text-[#FDF8E8]/70 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
									>
										Sign Out
									</button>
								</div>
							</>
						) : (
							<Link
								to="/login"
								className="block mx-auto w-fit px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#1A1A1D] text-sm font-semibold tracking-wider uppercase"
								onClick={closeMobileMenu}
							>
								Enter
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
