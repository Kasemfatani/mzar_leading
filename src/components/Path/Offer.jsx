'use client'
import React, { useEffect, useState } from 'react';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Offer() {
    const [language, setLanguage] = useState('en');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    function isEven(number) {
        return number % 2 === 0;
    }

    const today = new Date();
    const year = today.getFullYear(); // Get current year
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Get current month (0-based index)
    const end = isEven(today.getDate()) ? today.getDate() + 1 : today.getDate() + 2;
    const formattedEnd = String(end).padStart(2, "0"); // Ensure double-digit format for day

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang') || 'en');
        }

        // Use dynamic year and month instead of hardcoding
        const openingDate = new Date(`${year}-${month}-${formattedEnd}T00:00:00Z`).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = openingDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="uper-header-counter-cont">
            <span className='ohsol-span'>{language === 'en' ? 'Book Now And Get 20% Off' : 'احجز الان واحصل على خصم 20٪'}</span>
            <div className="uper-header-counter">
                <div className="days">
                    <span>{timeLeft.days}</span>
                    <p>{language === 'en' ? 'Days' : 'أيام'}</p>
                </div>
                <span className='nokteten'>:</span>
                <div className="days">
                    <span>{timeLeft.hours}</span>
                    <p>{language === 'en' ? 'Hours' : 'ساعات'}</p>
                </div>
                <span className='nokteten'>:</span>
                <div className="days">
                    <span>{timeLeft.minutes}</span>
                    <p>{language === 'en' ? 'Minutes' : 'دقائق'}</p>
                </div>
                <span className='nokteten'>:</span>
                <div className="days">
                    <span>{timeLeft.seconds}</span>
                    <p>{language === 'en' ? 'Seconds' : 'ثواني'}</p>
                </div>
            </div>
        </div>
    );
}
