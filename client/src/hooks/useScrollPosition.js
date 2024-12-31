// useScrollPosition.js
import { useState, useEffect } from 'react';

export const useScrollPosition = (threshold = 100) => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
            setScrolled(position > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return { scrolled, scrollPosition };
};