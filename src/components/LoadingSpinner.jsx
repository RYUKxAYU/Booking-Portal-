/**
 * LoadingSpinner Component - Art Deco Cinema Theme
 * Elegant animated spinner with theatrical gold accents.
 */

const LoadingSpinner = ({ message = 'Loading...' }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[300px] w-full">
			{/* Art Deco Spinner */}
			<div className="relative w-20 h-20">
				{/* Outer rotating diamond */}
				<div className="absolute inset-0 border-2 border-[#D4AF37] rotate-45 animate-spin" style={{ animationDuration: '3s' }} />

				{/* Inner counter-rotating diamond */}
				<div className="absolute inset-3 border border-[#D4AF37]/50 rotate-45 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />

				{/* Center static diamond */}
				<div className="absolute inset-6 bg-gradient-to-br from-[#D4AF37] to-[#E5C158] rotate-45" />
			</div>

			{/* Loading Text */}
			<p className="mt-8 text-[#FDF8E8]/70 font-display text-lg tracking-wider animate-pulse">
				{message}
			</p>

			{/* Decorative Line */}
			<div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
		</div>
	);
};

export default LoadingSpinner;
