/**
 * Mock Event Data
 * This file contains hardcoded event data that simulates an API response.
 * Each event object follows a consistent schema for the booking portal.
 */

export const EVENTS = [
	{
		id: 1,
		title: "Jazz Night",
		date: "2024-12-20",
		location: "Hall A",
		category: "Music",
		price: 50,
		availableSeats: 10,
		description: "Experience an unforgettable evening of smooth jazz with renowned musicians. Enjoy classic standards and contemporary pieces in an intimate setting with premium acoustics."
	},
	{
		id: 2,
		title: "Tech Conference 2024",
		date: "2024-12-22",
		location: "Main Auditorium",
		category: "Technology",
		price: 150,
		availableSeats: 100,
		description: "Join industry leaders and innovators for a day of cutting-edge technology discussions. Topics include AI, blockchain, cloud computing, and the future of software development."
	},
	{
		id: 3,
		title: "Art Exhibition: Modern Visions",
		date: "2024-12-25",
		location: "Gallery Wing B",
		category: "Art",
		price: 25,
		availableSeats: 50,
		description: "Explore contemporary art from emerging artists around the world. This exhibition features paintings, sculptures, and digital installations that challenge conventional perspectives."
	},
	{
		id: 4,
		title: "Comedy Night Live",
		date: "2024-12-28",
		location: "Comedy Club",
		category: "Entertainment",
		price: 40,
		availableSeats: 75,
		description: "Laugh out loud with our lineup of talented comedians. From stand-up to improv, this night promises non-stop entertainment and unforgettable moments."
	},
	{
		id: 5,
		title: "Yoga & Wellness Retreat",
		date: "2025-01-05",
		location: "Wellness Center",
		category: "Health",
		price: 80,
		availableSeats: 30,
		description: "Rejuvenate your mind and body with expert-led yoga sessions, meditation workshops, and wellness seminars. Perfect for beginners and experienced practitioners alike."
	},
	{
		id: 6,
		title: "Culinary Masterclass",
		date: "2025-01-10",
		location: "Culinary Studio",
		category: "Food",
		price: 120,
		availableSeats: 20,
		description: "Learn gourmet cooking techniques from award-winning chefs. This hands-on masterclass covers everything from knife skills to plating like a professional."
	},
	{
		id: 7,
		title: "Rock Concert: The Legends",
		date: "2025-01-15",
		location: "Open Air Stadium",
		category: "Music",
		price: 200,
		availableSeats: 500,
		description: "Experience the ultimate rock concert featuring legendary bands and electrifying performances. Get ready for a night of classic hits and raw musical energy."
	},
	{
		id: 8,
		title: "Startup Pitch Competition",
		date: "2025-01-20",
		location: "Innovation Hub",
		category: "Technology",
		price: 0,
		availableSeats: 200,
		description: "Watch promising startups pitch their ideas to top investors. Network with entrepreneurs, investors, and industry professionals in this exciting competition."
	}
];

/**
 * Get all unique categories from events
 * @returns {string[]} Array of unique category names
 */
export const getCategories = () => {
	const categories = EVENTS.map(event => event.category);
	return [...new Set(categories)];
};
