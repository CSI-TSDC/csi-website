"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const EASTER_EGGS = {
    game: {
        type: 'external',
        url: 'https://rainbow-cat-1.vercel.app',
    },
    tech: {
        type: 'scroll',
        path: '/teams',
        hash: '#heads',
        highlight: 'tech-cards',
    },
};

export default function EasterEgg() {
    const router = useRouter();
    const pathname = usePathname();
    const keyBufferRef = useRef('');
    const timeoutRef = useRef(null);

    const highlightTechCards = () => {
        setTimeout(() => {
            const techCards = document.querySelectorAll('[data-tech-card="true"]');

            if (techCards.length === 0) {
                setTimeout(() => highlightTechCards(), 500);
                return;
            }

            techCards.forEach((card) => {
                // Find the h3 (name) and p (designation) elements
                const nameEl = card.querySelector('h3');
                const designationEl = card.querySelector('p');

                if (nameEl) {
                    nameEl.style.color = '#2563eb'; // Blue-600
                }
                if (designationEl) {
                    designationEl.style.color = '#3b82f6'; // Blue-500
                }
            });
        }, 300);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                return;
            }

            keyBufferRef.current += e.key.toLowerCase();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                keyBufferRef.current = '';
            }, 2000);

            for (const [trigger, action] of Object.entries(EASTER_EGGS)) {
                if (keyBufferRef.current.endsWith(trigger)) {
                    keyBufferRef.current = '';

                    if (action.type === 'external') {
                        window.open(action.url, '_blank');
                    } else if (action.type === 'scroll') {
                        if (pathname === action.path) {
                            const element = document.querySelector(action.hash);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                            if (action.highlight === 'tech-cards') {
                                highlightTechCards();
                            }
                        } else {
                            router.push(action.path + action.hash);
                            if (action.highlight === 'tech-cards') {
                                setTimeout(() => highlightTechCards(), 1500);
                            }
                        }
                    }

                    break;
                }
            }

            if (keyBufferRef.current.length > 20) {
                keyBufferRef.current = keyBufferRef.current.slice(-20);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [router, pathname]);

    return null;
}
