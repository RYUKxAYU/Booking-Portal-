import { createContext, useContext, useState, useEffect } from 'react';
import { EVENTS } from '../utils/mockData';

/**
 * Event Context
 * Manages events and bookings state across the application.
 * Provides CRUD operations for events and booking management.
 */

const EventContext = createContext(null);

/**
 * Custom hook to access event context
 * @returns {Object} Event context value with events, bookings, and related methods
 */
export const useEvents = () => {
	const context = useContext(EventContext);
	if (!context) {
		throw new Error('useEvents must be used within an EventProvider');
	}
	return context;
};

/**
 * EventProvider Component
 * Wraps the application to provide event and booking state and methods.
 */
export const EventProvider = ({ children }) => {
	// Events state - loaded from mock data with simulated delay
	const [events, setEvents] = useState([]);
	// Bookings state - array of booked event IDs
	const [bookings, setBookings] = useState([]);
	// Loading state for simulating async data fetching
	const [loading, setLoading] = useState(true);

	// Load events and bookings on mount
	useEffect(() => {
		const loadData = async () => {
			// Simulate API delay for fetching events
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Load events from mock data
			setEvents([...EVENTS]);

			// Load bookings from localStorage
			const storedBookings = localStorage.getItem('bookings');
			if (storedBookings) {
				setBookings(JSON.parse(storedBookings));
			}

			setLoading(false);
		};

		loadData();
	}, []);

	// Persist bookings to localStorage whenever they change
	useEffect(() => {
		if (!loading) {
			localStorage.setItem('bookings', JSON.stringify(bookings));
		}
	}, [bookings, loading]);

	/**
	 * Book an event - decrements seat count and adds to bookings
	 * @param {number} eventId - ID of the event to book
	 * @returns {Object} Result with success status and message
	 */
	const bookEvent = (eventId) => {
		// Find the event
		const event = events.find(e => e.id === eventId);

		if (!event) {
			return { success: false, message: 'Event not found' };
		}

		if (event.availableSeats <= 0) {
			return { success: false, message: 'No seats available' };
		}

		if (bookings.includes(eventId)) {
			return { success: false, message: 'You have already booked this event' };
		}

		// Decrement available seats
		setEvents(prevEvents =>
			prevEvents.map(e =>
				e.id === eventId
					? { ...e, availableSeats: e.availableSeats - 1 }
					: e
			)
		);

		// Add to bookings
		setBookings(prevBookings => [...prevBookings, eventId]);

		return { success: true, message: 'Event booked successfully!' };
	};

	/**
	 * Cancel a booking - increments seat count and removes from bookings
	 * @param {number} eventId - ID of the event to cancel
	 * @returns {Object} Result with success status and message
	 */
	const cancelBooking = (eventId) => {
		if (!bookings.includes(eventId)) {
			return { success: false, message: 'Booking not found' };
		}

		// Increment available seats
		setEvents(prevEvents =>
			prevEvents.map(e =>
				e.id === eventId
					? { ...e, availableSeats: e.availableSeats + 1 }
					: e
			)
		);

		// Remove from bookings
		setBookings(prevBookings => prevBookings.filter(id => id !== eventId));

		return { success: true, message: 'Booking cancelled successfully!' };
	};

	/**
	 * Add a new event (Admin functionality)
	 * @param {Object} eventData - New event data
	 * @returns {Object} Result with success status and the new event
	 */
	const addEvent = (eventData) => {
		const newEvent = {
			...eventData,
			id: Date.now(), // Generate unique ID
		};

		setEvents(prevEvents => [...prevEvents, newEvent]);

		return { success: true, event: newEvent, message: 'Event added successfully!' };
	};

	/**
	 * Delete an event (Admin functionality)
	 * @param {number} eventId - ID of the event to delete
	 * @returns {Object} Result with success status and message
	 */
	const deleteEvent = (eventId) => {
		const event = events.find(e => e.id === eventId);

		if (!event) {
			return { success: false, message: 'Event not found' };
		}

		// Remove event from events list
		setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));

		// Also remove from bookings if exists
		setBookings(prevBookings => prevBookings.filter(id => id !== eventId));

		return { success: true, message: 'Event deleted successfully!' };
	};

	/**
	 * Get events that the user has booked
	 * @returns {Array} Array of booked event objects
	 */
	const getBookedEvents = () => {
		return events.filter(event => bookings.includes(event.id));
	};

	/**
	 * Check if an event is booked
	 * @param {number} eventId - ID of the event to check
	 * @returns {boolean} Whether the event is booked
	 */
	const isEventBooked = (eventId) => {
		return bookings.includes(eventId);
	};

	const value = {
		events,
		bookings,
		loading,
		bookEvent,
		cancelBooking,
		addEvent,
		deleteEvent,
		getBookedEvents,
		isEventBooked
	};

	return (
		<EventContext.Provider value={value}>
			{children}
		</EventContext.Provider>
	);
};

export default EventContext;
