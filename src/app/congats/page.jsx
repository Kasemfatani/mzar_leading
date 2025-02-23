'use client'
import React, { useEffect } from 'react';
import doneImage from '/public/done.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Book() {
    const searchParams = useSearchParams();  // Fixed variable name
    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const package_name = searchParams.get('package');

    useEffect(() => {
        // Ensure window object is available before accessing dataLayer
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'form_submission',
                customer_name: name,
                customer_whatsapp: "+" + phone.split(' ').join(''),
                package_name: package_name,
            });
        }
    }, [name, phone, package_name]); // Added dependency array

    return (
        <div className="popup">
            <div className="popup-cont">
                <Image src={doneImage} alt="Mazar" className="img" />
                <h2>Welcome to Mazar</h2>
                <p>Our team will contact you shortly on WhatsApp to guide you through the next steps of your journey. We look forward to assisting you!</p>
            </div>
        </div>
    );
}
