import { useState, useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCategories } from '../utils/mockData';

/**
 * Home Page Component - Art Deco Cinema Theme
 * Theatrical landing page with elegant hero section and sophisticated event grid.
 */

const Home = () => {
	const { events, loading } = useEvents();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');

	const categories = useMemo(() => ['All', ...getCategories()], []);

	const filteredEvents = useMemo(() => {
		return events.filter(event => {
			const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
			const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				event.location.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [events, selectedCategory, searchQuery]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner message="Preparing the stage..." />
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-24 px-4 overflow-hidden">
				{/* Background Gradients */}
				<div className="absolute inset-0 bg-gradient-to-b from-[#8B2626]/10 via-transparent to-transparent" />
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B2626]/10 rounded-full blur-3xl" />

				{/* Geometric Decorations */}
				<div className="absolute top-20 left-10 w-20 h-20 border border-[#D4AF37]/20 rotate-45 hidden lg:block" />
				<div className="absolute top-40 right-20 w-12 h-12 border border-[#D4AF37]/30 rotate-45 hidden lg:block" />
				<div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#D4AF37]/10 rotate-45 hidden lg:block" />

				<div className="max-w-5xl mx-auto text-center relative">
					{/* Decorative Top Element */}
					<div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
						<div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
						<div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
						<span className="text-[11px] tracking-[0.4em] text-[#D4AF37] uppercase font-medium">
							Premium Events
						</span>
						<div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
						<div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
					</div>

					{/* Main Title */}
					<h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-[#FDF8E8] mb-6 leading-none opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: 'forwards' }}>
						<span className="block">Extraordinary</span>
						<span className="block mt-2 text-[#D4AF37]">Experiences</span>
					</h1>

					{/* Subtitle */}
					<p className="text-lg md:text-xl text-[#FDF8E8]/60 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
						Curated events for the discerning connoisseur.
						From intimate soirées to grand galas, discover moments worth remembering.
					</p>

					{/* Search Bar */}
					<div className="max-w-xl mx-auto opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
						<div className="relative group">
							{/* Decorative border */}
							<div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							<div className="relative bg-[#242428] border border-[#D4AF37]/30 flex items-center">
								<svg
									className="w-5 h-5 text-[#D4AF37]/50 ml-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input
									type="text"
									placeholder="Search for experiences..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="flex-1 px-4 py-4 bg-transparent text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none font-light"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className="px-4 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
									>
										✕
									</button>
								)}
							</div>
						</div>
					</div>

					{/* Scroll Indicator */}
					<div className="mt-16 opacity-0 animate-fade-in-up delay-500" style={{ animationFillMode: 'forwards' }}>
						<div className="inline-flex flex-col items-center gap-2 text-[#D4AF37]/50">
							<span className="text-[10px] tracking-[0.3em] uppercase">Explore</span>
							<div className="w-px h-8 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
						</div>
					</div>
				</div>
			</section>

			{/* Events Section */}
			<section className="max-w-7xl mx-auto px-4 pb-24">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
					<div>
						{/* Decorative Label */}
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-px bg-[#D4AF37]" />
							<span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">The Collection</span>
						</div>

						<h2 className="font-display text-3xl md:text-4xl text-[#FDF8E8] font-semibold">
							Upcoming Events
						</h2>
						<p className="text-[#FDF8E8]/50 mt-2">
							{filteredEvents.length} experience{filteredEvents.length !== 1 ? 's' : ''} awaiting you
						</p>
					</div>

					{/* Category Filter */}
					<div className="flex items-center gap-4">
						<span className="text-[#FDF8E8]/50 text-sm hidden sm:block">Filter by:</span>
						<div className="relative">
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="appearance-none bg-[#242428] border border-[#D4AF37]/30 text-[#FDF8E8] px-5 py-3 pr-10 text-sm tracking-wide cursor-pointer hover:border-[#D4AF37]/60 focus:outline-none focus:border-[#D4AF37] transition-colors"
							>
								{categories.map(category => (
									<option key={category} value={category} className="bg-[#1A1A1D]">
										{category}
									</option>
								))}
							</select>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
								<svg className="w-4 h-4 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Decorative Divider */}
				<div className="flex items-center gap-4 mb-12">
					<div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
					<div className="w-2 h-2 bg-[#D4AF37]/50 rotate-45" />
					<div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
				</div>

				{/* Events Grid */}
				{filteredEvents.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredEvents.map((event, index) => (
							<EventCard key={event.id} event={event} index={index} />
						))}
					</div>
				) : (
					<div className="text-center py-24">
						<div className="w-20 h-20 mx-auto mb-6 border border-[#D4AF37]/30 rotate-45 flex items-center justify-center">
							<span className="text-4xl -rotate-45">🎭</span>
						</div>
						<h3 className="font-display text-2xl text-[#FDF8E8] mb-3">
							No Events Found
						</h3>
						<p className="text-[#FDF8E8]/50 mb-8 max-w-md mx-auto">
							Adjust your search or explore different categories to discover extraordinary experiences.
						</p>
						<button
							onClick={() => {
								setSelectedCategory('All');
								setSearchQuery('');
							}}
							className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#1A1A1D] transition-all duration-300"
						>
							View All Events
						</button>
					</div>
				)}
			</section>

			{/* Footer Decoration */}
			<div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
		</div>
	);
};

export default Home;
