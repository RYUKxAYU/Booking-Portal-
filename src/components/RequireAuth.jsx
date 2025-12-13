import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * RequireAuth Component - Art Deco Cinema Theme
 * Elegant protected route wrapper with theatrical styling.
 */

const RequireAuth = ({ children, adminOnly = false }) => {
	const { user, loading, isAuthenticated } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner message="Verifying access..." />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (adminOnly && !user?.isAdmin) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="max-w-md w-full text-center">
					{/* Decorative Frame */}
					<div className="relative bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-12">
						{/* Corner Decorations */}
						<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
						<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40" />
						<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40" />
						<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40" />

						{/* Icon */}
						<div className="w-20 h-20 mx-auto mb-6 border border-[#D4AF37]/30 rotate-45 flex items-center justify-center">
							<span className="text-4xl -rotate-45">🔒</span>
						</div>

						{/* Message */}
						<h2 className="font-display text-2xl text-[#FDF8E8] mb-4">
							Access Restricted
						</h2>
						<p className="text-[#FDF8E8]/50 mb-6">
							Administrator privileges are required to access this area.
						</p>

						{/* Divider */}
						<div className="flex items-center gap-3 mb-6">
							<div className="flex-1 h-px bg-[#D4AF37]/20" />
							<div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rotate-45" />
							<div className="flex-1 h-px bg-[#D4AF37]/20" />
						</div>

						{/* Tip */}
						<p className="text-sm text-[#D4AF37]/70">
							💡 Sign in with an email containing "admin" for access
						</p>
					</div>
				</div>
			</div>
		);
	}

	return children;
};

export default RequireAuth;
