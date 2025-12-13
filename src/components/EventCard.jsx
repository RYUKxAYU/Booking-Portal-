import { Link } from 'react-router-dom';

/**
 * EventCard Component - Art Deco Cinema Theme
 * Elegant card with theatrical styling, gold accents, and sophisticated animations.
 */

const EventCard = ({ event, index = 0 }) => {
	// Category styling with rich, theatrical colors
	const getCategoryStyle = (category) => {
		const styles = {
			Music: { bg: 'from-[#C41E3A] to-[#8B0000]', icon: '🎵' },
			Technology: { bg: 'from-[#1E3A5F] to-[#0D1B2A]', icon: '⚡' },
			Art: { bg: 'from-[#4A1942] to-[#2D0A1E]', icon: '🎨' },
			Entertainment: { bg: 'from-[#704214] to-[#3D2409]', icon: '🎬' },
			Health: { bg: 'from-[#1B4332] to-[#0D2818]', icon: '✨' },
			Food: { bg: 'from-[#7C2D12] to-[#451A03]', icon: '🍷' }
		};
		return styles[category] || { bg: 'from-[#333338] to-[#242428]', icon: '📌' };
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
		return { day, month };
	};

	const { day, month } = formatDate(event.date);
	const categoryStyle = getCategoryStyle(event.category);

	return (
		<div
			className="group relative opacity-0 animate-fade-in-up"
			style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
		>
			{/* Card */}
			<div className="relative bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">

				{/* Corner Decorations */}
				<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
				<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40" />
				<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40" />
				<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40" />

				{/* Header with Category Gradient */}
				<div className={`relative h-36 bg-gradient-to-br ${categoryStyle.bg} overflow-hidden`}>
					{/* Decorative Pattern Overlay */}
					<div className="absolute inset-0 opacity-10">
						<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern id={`deco-${event.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
									<path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill={`url(#deco-${event.id})`} className="text-white" />
						</svg>
					</div>

					{/* Category Icon */}
					<div className="absolute top-4 right-4 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
						{categoryStyle.icon}
					</div>

					{/* Date Badge */}
					<div className="absolute bottom-0 left-6 translate-y-1/2 bg-[#D4AF37] text-[#1A1A1D] px-4 py-3 text-center min-w-[70px]">
						<div className="font-display text-2xl font-bold leading-none">{day}</div>
						<div className="text-[10px] tracking-widest font-semibold">{month}</div>
					</div>

					{/* Price Tag */}
					<div className="absolute top-4 left-4">
						<span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-[#D4AF37] text-sm font-semibold">
							{event.price === 0 ? 'FREE' : `$${event.price}`}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 pt-10">
					{/* Category Tag */}
					<div className="mb-3">
						<span className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-medium">
							{event.category}
						</span>
					</div>

					{/* Title */}
					<h3 className="font-display text-xl font-semibold text-[#FDF8E8] mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
						{event.title}
					</h3>

					{/* Event Details */}
					<div className="space-y-2 mb-6">
						<div className="flex items-center gap-2 text-[#FDF8E8]/60 text-sm">
							<svg className="w-4 h-4 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span>{event.location}</span>
						</div>

						<div className="flex items-center gap-2 text-sm">
							<svg className="w-4 h-4 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span className={event.availableSeats > 0 ? 'text-emerald-400' : 'text-red-400'}>
								{event.availableSeats > 0 ? `${event.availableSeats} seats remaining` : 'Sold Out'}
							</span>
						</div>
					</div>

					{/* Divider */}
					<div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-6" />

					{/* CTA Button */}
					<Link
						to={`/event/${event.id}`}
						className="relative block w-full py-3 text-center text-sm font-semibold tracking-wider uppercase overflow-hidden group/btn"
					>
						<span className="relative z-10 text-[#D4AF37] group-hover/btn:text-[#1A1A1D] transition-colors duration-300">
							View Details
						</span>
						<div className="absolute inset-0 border border-[#D4AF37]/50 group-hover/btn:border-[#D4AF37]" />
						<div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
