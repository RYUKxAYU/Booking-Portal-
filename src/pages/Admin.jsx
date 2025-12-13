import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCategories } from '../utils/mockData';

/**
 * Admin Page - Art Deco Cinema Theme
 * Elegant admin panel with theatrical styling and sophisticated event management.
 */

const Admin = () => {
	const { events, addEvent, deleteEvent, loading } = useEvents();
	const { user } = useAuth();

	const [formData, setFormData] = useState({
		title: '',
		date: '',
		location: '',
		category: 'Music',
		price: '',
		availableSeats: '',
		description: ''
	});

	const [formError, setFormError] = useState('');
	const [formSuccess, setFormSuccess] = useState('');

	const categories = getCategories();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError('');
		setFormSuccess('');

		if (!formData.title.trim() || !formData.date || !formData.location.trim()) {
			setFormError('Please fill in all required fields');
			return;
		}

		const newEvent = {
			title: formData.title.trim(),
			date: formData.date,
			location: formData.location.trim(),
			category: formData.category,
			price: Number(formData.price) || 0,
			availableSeats: Number(formData.availableSeats) || 50,
			description: formData.description.trim() || 'No description provided.'
		};

		const result = addEvent(newEvent);

		if (result.success) {
			setFormSuccess(`"${newEvent.title}" added successfully!`);
			setFormData({
				title: '',
				date: '',
				location: '',
				category: 'Music',
				price: '',
				availableSeats: '',
				description: ''
			});
		} else {
			setFormError(result.message || 'Failed to add event');
		}
	};

	const handleDelete = (eventId, eventTitle) => {
		const confirmed = confirm(`Delete "${eventTitle}"? This cannot be undone.`);
		if (confirmed) {
			const result = deleteEvent(eventId);
			alert(result.message);
		}
	};

	const formatDate = (dateString) => {
		const options = { month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner message="Loading admin panel..." />
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Header */}
			<section className="relative py-16 px-4 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-[#8B2626]/10 via-transparent to-transparent" />
				<div className="absolute top-0 left-1/3 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />

				<div className="max-w-6xl mx-auto relative">
					<div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
						<div className="w-8 h-px bg-[#D4AF37]" />
						<span className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1D] text-[10px] tracking-[0.2em] uppercase font-semibold">
							Administrator
						</span>
					</div>

					<h1 className="font-display text-4xl md:text-5xl text-[#FDF8E8] font-semibold mb-4 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: 'forwards' }}>
						Event Management
					</h1>
					<p className="text-[#FDF8E8]/50 opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
						Create, manage, and curate extraordinary experiences
					</p>
				</div>
			</section>

			{/* Content */}
			<section className="max-w-6xl mx-auto px-4 pb-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Add Event Form */}
					<div className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 relative opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
						{/* Corner Decorations */}
						<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
						<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40" />
						<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40" />
						<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40" />

						{/* Header */}
						<div className="px-8 py-6 border-b border-[#D4AF37]/20">
							<div className="flex items-center gap-3">
								<span className="text-2xl">✨</span>
								<h2 className="font-display text-xl text-[#FDF8E8]">Create New Event</h2>
							</div>
						</div>

						{/* Form */}
						<div className="p-8">
							{formSuccess && (
								<div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 text-sm flex items-center gap-2">
									<span>✓</span> {formSuccess}
								</div>
							)}

							{formError && (
								<div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
									{formError}
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-5">
								{/* Title */}
								<div>
									<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
										Event Title *
									</label>
									<input
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										placeholder="Enter event title"
										className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
									/>
								</div>

								{/* Date & Location */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
											Date *
										</label>
										<input
											type="date"
											name="date"
											value={formData.date}
											onChange={handleInputChange}
											className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] focus:outline-none focus:border-[#D4AF37] transition-colors"
										/>
									</div>
									<div>
										<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
											Venue *
										</label>
										<input
											type="text"
											name="location"
											value={formData.location}
											onChange={handleInputChange}
											placeholder="e.g., Grand Hall"
											className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
										/>
									</div>
								</div>

								{/* Category & Price */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
											Category
										</label>
										<select
											name="category"
											value={formData.category}
											onChange={handleInputChange}
											className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
										>
											{categories.map(cat => (
												<option key={cat} value={cat}>{cat}</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
											Price ($)
										</label>
										<input
											type="number"
											name="price"
											value={formData.price}
											onChange={handleInputChange}
											placeholder="0 for free"
											min="0"
											className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
										/>
									</div>
								</div>

								{/* Seats */}
								<div>
									<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
										Available Seats
									</label>
									<input
										type="number"
										name="availableSeats"
										value={formData.availableSeats}
										onChange={handleInputChange}
										placeholder="Default: 50"
										min="1"
										className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
									/>
								</div>

								{/* Description */}
								<div>
									<label className="block text-[#FDF8E8]/70 text-xs tracking-wider uppercase mb-2">
										Description
									</label>
									<textarea
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										placeholder="Describe the event experience..."
										rows="3"
										className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#D4AF37]/30 text-[#FDF8E8] placeholder-[#FDF8E8]/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
									/>
								</div>

								{/* Submit */}
								<button
									type="submit"
									className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#1A1A1D] text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
								>
									Create Event
								</button>
							</form>
						</div>
					</div>

					{/* Events List */}
					<div className="bg-gradient-to-b from-[#242428] to-[#1A1A1D] border border-[#D4AF37]/20 relative opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
						{/* Corner Decorations */}
						<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40" />
						<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40" />

						{/* Header */}
						<div className="px-8 py-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<span className="text-2xl">📋</span>
								<h2 className="font-display text-xl text-[#FDF8E8]">All Events</h2>
							</div>
							<span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-sm">
								{events.length} total
							</span>
						</div>

						{/* List */}
						<div className="max-h-[600px] overflow-y-auto">
							{events.length > 0 ? (
								<div className="divide-y divide-[#D4AF37]/10">
									{events.map((event, index) => (
										<div
											key={event.id}
											className="px-8 py-4 flex items-center justify-between gap-4 hover:bg-[#D4AF37]/5 transition-colors group"
										>
											<div className="flex-1 min-w-0">
												<Link
													to={`/event/${event.id}`}
													className="font-medium text-[#FDF8E8] hover:text-[#D4AF37] transition-colors truncate block"
												>
													{event.title}
												</Link>
												<div className="flex items-center gap-3 mt-1 text-sm text-[#FDF8E8]/40">
													<span>{formatDate(event.date)}</span>
													<span>•</span>
													<span className="text-emerald-400/80">{event.availableSeats} seats</span>
												</div>
											</div>

											<button
												onClick={() => handleDelete(event.id, event.title)}
												className="p-2 text-[#FDF8E8]/30 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
												title="Delete event"
											>
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
											</button>
										</div>
									))}
								</div>
							) : (
								<div className="p-12 text-center">
									<span className="text-4xl opacity-50">📭</span>
									<p className="text-[#FDF8E8]/50 mt-4">No events yet. Create your first!</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Admin;
