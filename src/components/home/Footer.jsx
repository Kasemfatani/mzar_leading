'use client'
import React, { useEffect, useState } from 'react'; // Importing React to use JSX syntax and create components.
import c from '/public/c.svg'
import { Facebook, Instagram, Linkedin, Twitter, X, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export default function Footer() { // Defining the main functional component named 'Footer'.
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
        }
    }, []);
    return (
        <footer className={`${language === 'en' ? 'ltr' : 'rtl'}`}> {/* Main footer container with padding and background color */}
            <a href="https://wa.me/+966580121025?text=Good%20Morning%20Mzar" className="fixed-what">
                <i className="fa-brands fa-whatsapp"></i>
            </a>
            <div className="container m-auto"> {/* Container for the footer content */}
                <div className="footer-cont">
                    <div className="copyRight">
                        <Image src={c} alt="Mazar" className="img" />
                        <p>{language === 'en' ? 'Licensed by the Ministry of Tourism ,license number 73104705' : 'مرخصة من وزارة السياحة رقم الترخيص 73104705'}</p>
                    </div>
                    <div className="social">
                        <Link href={'https://x.com/mzarapp'}><i className="fa-brands fa-x-twitter"></i></Link>
                        <Link href={'https://www.instagram.com/mzarapp/'}><i className="fa-brands fa-instagram"></i></Link>
                        <Link href={'https://www.facebook.com/mzarapp'}><i className="fa-brands fa-facebook"></i></Link>
                        <Link href={'https://www.youtube.com/@mzarapp'}><i className="fa-brands fa-youtube"></i></Link>
                        <Link href={'https://www.tiktok.com/@mzarapp'}><i className="fa-brands fa-tiktok"></i></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
