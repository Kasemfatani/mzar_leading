'use client'
import React, { use, useState } from 'react';
import bg from '/public/bg.png';
import doneImage from '/public/done.svg';
import MazarInfo from '../../components/book/MazarInfo';
import FormPage from '../../components/book/FormPage';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Book() {
    const router = useRouter()
    const seachParams = useSearchParams()
    const name = seachParams.get('name')
    const phone = seachParams.get('phone')
    const package_name = seachParams.get('package')
    useEffect(() => {
        // **Push data to GTM dataLayer**
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'form_submission',
            customer_name: name,
            customer_whatsapp: phone,
            package_name: package_name,
        });
    })

    return (
        <div className="popup" >
            <div className="popup-cont">
                <Image src={doneImage} alt="Mazar" className="img" />
                <h2>Welcome to Mzar </h2>
                <p>Our team will contact you shortly on WhatsApp to guide you through the next steps of your journey. We look forward to assisting you!</p>
            </div>
        </div>
    );
}
