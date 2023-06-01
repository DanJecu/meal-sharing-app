import React from 'react';

export function Footer() {
    const currentYear: number = new Date().getFullYear();
    return <footer>© {currentYear} Dan Jecu</footer>;
}
