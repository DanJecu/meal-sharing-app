import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectHome = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(redirectHome);
    }, [navigate]);

    return (
        <main>
            <h1>Sorry, this page does not exist.</h1>
        </main>
    );
}
