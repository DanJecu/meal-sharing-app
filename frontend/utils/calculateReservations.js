export function renderReservations(guestsLeftForCurrentDate) {
    if (guestsLeftForCurrentDate <= 0) {
        return 'Sorry there are no more bookings left for today';
    } else if (guestsLeftForCurrentDate === 1) {
        return '1 spot left for today';
    } else {
        return `${guestsLeftForCurrentDate} spots left for today`;
    }
}

export function calculateReservations(bookings, max_reservations) {
    if (!bookings.length) {
        return max_reservations;
    }

    const currentDate = new Date().toLocaleDateString('fr-CA');
    const bookingsForCurrentDate = bookings.filter(booking => {
        const bookingDate = booking.created_date.slice(0, 10);

        return bookingDate === currentDate;
    });

    const totalGuestsForCurrentDate = bookingsForCurrentDate.reduce(
        (total, booking) => total + booking.number_of_guests,
        0
    );
    const guestsLeftForCurrentDate =
        max_reservations - totalGuestsForCurrentDate;

    return guestsLeftForCurrentDate;
}
