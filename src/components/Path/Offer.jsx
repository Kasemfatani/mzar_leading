'use client'
import React, { useEffect, useState } from 'react';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
export default function Offer() {

    const [language, setLanguage] = useState('en');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    function isEven(number) {
        return number % 2 === 0;
    }
    const [end, setEnd] = useState(isEven(new Date().getDate()) ? new Date().getDate() + 1 : new Date().getDate() + 2);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang') || 'en');
        }
        const openingDate = new Date(`2025-02-0${end}T00:00:00`).getTime();
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
            <span>{language === 'en' ? 'Book Now And Get 20% Off' : 'احجز الان واحصل على خصم 20٪'}</span>
            <div className="uper-header-counter">
                <div className="days">
                    <span>{timeLeft.days}</span>
                    <p>{language === 'en' ? 'Days' : 'أيام'}</p>
                </div>
                <div className="days">
                    <span>{timeLeft.hours}</span>
                    <p>{language === 'en' ? 'Hours' : 'ساعات'}</p>
                </div>
                <div className="days">
                    <span>{timeLeft.minutes}</span>
                    <p>{language === 'en' ? 'Minutes' : 'دقائق'}</p>
                </div>
                <div className="days">
                    <span>{timeLeft.seconds}</span>
                    <p>{language === 'en' ? 'Seconds' : 'ثواني'}</p>
                </div>
            </div>
        </div>


    );
}
