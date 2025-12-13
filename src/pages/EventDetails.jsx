import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * EventDetails Page - Art Deco Cinema Theme
 * Elegant event details page with theatrical styling and sophisticated booking interface.
 */

const EventDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { events, loading, bookEvent, isEventBooked } = useEvents();
	const { isAuthenticated } = useAuth();

	const event = events.find(e => e.id === parseInt(id));
	const isBooked = event ? isEventBooked(event.id) : false;

	const formatDate = (dateString) => {
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	const handleBooking = () => {
		if (!isAuthenticated) {
			navigate('/login', { state: { from: { pathname: `/event/${id}` } } });
			return;
		}

		const result = bookEvent(event.id);
		alert(result.message);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner message="Loading event details..." />
			</div>
		);
	}

	if (!event) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<div className="w-24 h-24 mx-auto mb-8 border border-[#D4AF37]/30 rotate-45 flex items-center justify-center">
						<span className="text-5xl -rotate-45">🎭</span>
					</div>
					<h2 className="font-display text-3xl text-[#FDF8E8] mb-4">Event Not Found</h2>
					<p className="text-[#FDF8E8]/50 mb-8">
						This event may have ended or the link is incorrect.
					</p>
					<Link
						to="/"
						className="inline-block px-8 py-3 bg-[#D4AF37] text-[#1A1A1D] font-semibold tracking-wider uppercase hover:bg-[#E5C158] transition-colors"
					>
						Return to Events
					</Link>
				</div>
			</div>
		);
	}

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

	const categoryStyle = getCategoryStyle(event.category);

	const getButtonState = () => {
		if (isBooked) {
			return { disabled: true, text: 'Reservation Confirmed', variant: 'confirmed' };
		}
		if (event.availableSeats <= 0) {
			return { disabled: true, text: 'Sold Out', variant: 'soldout' };
		}
		if (!isAuthenticated) {
			return { disabled: false, text: 'Sign In to Reserve', variant: 'login' };
		}
		return { disabled: false, text: 'Reserve Your Seat', variant: 'available' };
	};

	const buttonState = getButtonState();

	return (
		<div className="min-h-screen">
			{/* Hero Header */}
			<section className={`relative py-20 px-4 bg-gradient-to-br ${categoryStyle.bg} overflow-hidden`}>
				{/* Decorative Pattern */}
				<div className="absolute inset-0 opacity-5">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
								<path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#hero-pattern)" className="text-white" />
					</svg>
				</div>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-transparent to-transparent" />

				<div className="max-w-5xl mx-auto relative">
					{/* Back Button */}
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-[#FDF8E8]/70 hover:text-[#D4AF37] mb-8 transition-colors group"
					>
						<svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span className="text-sm tracking-wider uppercase">Back to Events</span>
					</Link>

					{/* Category & Icon */}
					<div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
						<div className="w-14 h-14 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
							{categoryStyle.icon}
						</div>
						<span className="text-[11px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
							{event.category}
						</span>
					</div>

					{/* Title */}
					<h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FDF8E8] font-semibold leading-tight mb-6 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: 'forwards' }}>
						{event.title}
					</h1>

					{/* Quick Info */}
					<div className="flex flex-wrap gap-6 text-[#FDF8E8]/80 opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
						<div className="flex items-center gap-2">
							<svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>{formatDate(event.date)}</span>
						</div>
						<div className="flex items-center gap-2">
							<svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span>{event.location}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="max-w-5xl mx-auto px-4 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-10">
						{/* About Section */}
						<div className="opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-8 h-px bg-[#D4AF37]" />
								<span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">About This Event</span>
							</div>
							<p className="text-[#FDF8E8]/70 text-lg leading-relaxed">
								{event.description}
							</p>
						</div>

						{/* Event Details Card */}
						<div className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-8 relative opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
							{/* Corner Decorations */}
							<div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40" />
							<div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/40" />
							<div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/40" />
							<div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40" />

							<h3 className="font-display text-xl text-[#FDF8E8] mb-6">Event Details</h3>

							<dl className="space-y-4">
								{[
									{ label: 'Category', value: event.category },
									{ label: 'Date', value: formatDate(event.date) },
									{ label: 'Venue', value: event.location },
									{ label: 'Available Seats', value: event.availableSeats > 0 ? event.availableSeats : 'Sold Out', highlight: event.availableSeats <= 0 }
								].map((item, index) => (
									<div key={index} className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10 last:border-0">
										<dt className="text-[#FDF8E8]/50">{item.label}</dt>
										<dd className={`font-semibold ${item.highlight ? 'text-red-400' : 'text-[#FDF8E8]'}`}>
											{item.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

					{/* Booking Card */}
					<div className="lg:col-span-1">
						<div className="sticky top-28 bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-8 relative opacity-0 animate-fade-in-up delay-500" style={{ animationFillMode: 'forwards' }}>
							{/* Decorative Top Line */}
							<div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

							{/* Price */}
							<div className="text-center mb-8">
								<p className="text-[#FDF8E8]/50 text-sm tracking-wider uppercase mb-2">
									Price per ticket
								</p>
								<p className="font-display text-5xl text-[#D4AF37]">
									{event.price === 0 ? 'FREE' : `$${event.price}`}
								</p>
							</div>

							{/* Availability */}
							<div className="mb-8">
								<div className="flex justify-between text-sm mb-3">
									<span className="text-[#FDF8E8]/50">Availability</span>
									<span className={event.availableSeats > 0 ? 'text-emerald-400' : 'text-red-400'}>
										{event.availableSeats} seats
									</span>
								</div>
								<div className="h-1 bg-[#333338] overflow-hidden">
									<div
										className={`h-full transition-all duration-500 ${event.availableSeats > 0 ? 'bg-[#D4AF37]' : 'bg-red-500'}`}
										style={{ width: `${Math.min((event.availableSeats / 50) * 100, 100)}%` }}
									/>
								</div>
							</div>

							{/* Divider */}
							<div className="flex items-center gap-3 mb-8">
								<div className="flex-1 h-px bg-[#D4AF37]/20" />
								<div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rotate-45" />
								<div className="flex-1 h-px bg-[#D4AF37]/20" />
							</div>

							{/* Booking Button */}
							<button
								onClick={handleBooking}
								disabled={buttonState.disabled}
								className={`w-full py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${buttonState.variant === 'confirmed'
										? 'bg-emerald-600 text-white cursor-default'
										: buttonState.variant === 'soldout'
											? 'bg-[#333338] text-[#FDF8E8]/30 cursor-not-allowed'
											: 'bg-[#D4AF37] text-[#1A1A1D] hover:bg-[#E5C158] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]'
									}`}
							>
								{buttonState.text}
							</button>

							{!isAuthenticated && event.availableSeats > 0 && (
								<p className="text-center text-[#FDF8E8]/40 text-sm mt-4">
									Sign in to complete your reservation
								</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EventDetails;
