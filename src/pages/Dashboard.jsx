import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Dashboard Page - Art Deco Cinema Theme
 * Elegant user dashboard with theatrical styling and sophisticated booking management.
 */

const Dashboard = () => {
	const { getBookedEvents, cancelBooking, loading } = useEvents();
	const { user } = useAuth();

	const bookedEvents = getBookedEvents();

	const formatDate = (dateString) => {
		const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	const handleCancelBooking = (eventId, eventTitle) => {
		const confirmed = confirm(`Cancel your reservation for "${eventTitle}"?`);
		if (confirmed) {
			const result = cancelBooking(eventId);
			alert(result.message);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner message="Loading your reservations..." />
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Header */}
			<section className="relative py-16 px-4 overflow-hidden">
				{/* Background Decoration */}
				<div className="absolute inset-0 bg-gradient-to-b from-[#8B2626]/10 via-transparent to-transparent" />
				<div className="absolute top-0 right-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />

				<div className="max-w-5xl mx-auto relative">
					{/* Decorative Label */}
					<div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
						<div className="w-8 h-px bg-[#D4AF37]" />
						<span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">Personal Dashboard</span>
					</div>

					{/* Welcome Message */}
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: 'forwards' }}>
						<div>
							<h1 className="font-display text-4xl md:text-5xl text-[#FDF8E8] font-semibold mb-2">
								Welcome, <span className="text-[#D4AF37]">{user?.name}</span>
							</h1>
							<p className="text-[#FDF8E8]/50">
								Manage your reservations and upcoming experiences
							</p>
						</div>

						{/* User Avatar */}
						<div className="flex items-center gap-4">
							<div className="w-16 h-16 bg-gradient-to-br from-[#8B2626] to-[#6B1E1E] flex items-center justify-center border border-[#D4AF37]/50">
								<span className="font-display text-2xl text-[#D4AF37]">
									{user?.name?.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className="hidden md:block">
								<p className="text-[#FDF8E8] font-medium">{user?.email}</p>
								{user?.isAdmin && (
									<span className="text-[10px] tracking-wider text-[#D4AF37] uppercase">
										Administrator
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="max-w-5xl mx-auto px-4 -mt-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
					{[
						{ label: 'Total Reservations', value: bookedEvents.length, icon: '🎫' },
						{ label: 'Upcoming Events', value: bookedEvents.filter(e => new Date(e.date) >= new Date()).length, icon: '📅' },
						{ label: 'Total Investment', value: `$${bookedEvents.reduce((sum, e) => sum + e.price, 0)}`, icon: '💰' }
					].map((stat, index) => (
						<div
							key={index}
							className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-6 relative group hover:border-[#D4AF37]/40 transition-colors"
						>
							{/* Corner accent */}
							<div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#D4AF37]/30" />

							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#FDF8E8]/50 text-sm tracking-wider uppercase mb-1">
										{stat.label}
									</p>
									<p className="font-display text-3xl text-[#D4AF37]">
										{stat.value}
									</p>
								</div>
								<span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
									{stat.icon}
								</span>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Reservations Section */}
			<section className="max-w-5xl mx-auto px-4 py-16">
				{/* Section Header */}
				<div className="flex items-center gap-3 mb-8">
					<div className="w-8 h-px bg-[#D4AF37]" />
					<span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">Your Reservations</span>
				</div>

				{/* Divider */}
				<div className="flex items-center gap-4 mb-8">
					<div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
					<div className="w-2 h-2 bg-[#D4AF37]/50 rotate-45" />
					<div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
				</div>

				{bookedEvents.length > 0 ? (
					<div className="space-y-4">
						{bookedEvents.map((event, index) => (
							<div
								key={event.id}
								className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 p-6 relative group hover:border-[#D4AF37]/40 transition-all opacity-0 animate-fade-in-up"
								style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'forwards' }}
							>
								{/* Corner Decorations */}
								<div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]/30" />
								<div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]/30" />

								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									{/* Event Info */}
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
												{event.category}
											</span>
											<span className="text-emerald-400 text-xs">✓ Confirmed</span>
										</div>

										<Link
											to={`/event/${event.id}`}
											className="font-display text-xl text-[#FDF8E8] hover:text-[#D4AF37] transition-colors"
										>
											{event.title}
										</Link>

										<div className="flex flex-wrap gap-4 mt-3 text-sm text-[#FDF8E8]/50">
											<div className="flex items-center gap-2">
												<svg className="w-4 h-4 text-[#D4AF37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
												</svg>
												{formatDate(event.date)}
											</div>
											<div className="flex items-center gap-2">
												<svg className="w-4 h-4 text-[#D4AF37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												</svg>
												{event.location}
											</div>
										</div>
									</div>

									{/* Price & Actions */}
									<div className="flex items-center gap-6">
										<div className="text-right">
											<p className="font-display text-2xl text-[#D4AF37]">
												{event.price === 0 ? 'FREE' : `$${event.price}`}
											</p>
										</div>

										<button
											onClick={() => handleCancelBooking(event.id, event.title)}
											className="px-4 py-2 border border-red-500/30 text-red-400 text-sm tracking-wider uppercase hover:bg-red-500/10 hover:border-red-500/50 transition-all"
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<div className="w-24 h-24 mx-auto mb-8 border border-[#D4AF37]/30 rotate-45 flex items-center justify-center">
							<span className="text-5xl -rotate-45">🎭</span>
						</div>
						<h3 className="font-display text-2xl text-[#FDF8E8] mb-4">
							No Reservations Yet
						</h3>
						<p className="text-[#FDF8E8]/50 max-w-md mx-auto mb-8">
							You haven't made any reservations. Explore our curated events
							and find your next extraordinary experience.
						</p>
						<Link
							to="/"
							className="inline-block px-8 py-3 bg-[#D4AF37] text-[#1A1A1D] font-semibold tracking-wider uppercase hover:bg-[#E5C158] transition-colors"
						>
							Explore Events
						</Link>
					</div>
				)}
			</section>
		</div>
	);
};

export default Dashboard;
