'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import hero from '/public/hero.jpg'
import iPhones from '/public/iphones.webp'
import { motion } from 'framer-motion';
import Loading from '@/app/loading';
import { API_BASE_URL } from '@/lib/apiConfig';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
export default function Hero() {

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        // setLoading(true);

        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/features`
                , {
                    headers: headers,
                }).then(response => {
                    setData(response.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                    console.log(language);
                    
                    document.title = localStorage.getItem('lang') == 'en' ? 'Mzar: Your Journey into the Depths of History and Spirituality' : 'مزار: رحلتك إلى أعماق التاريخ والروحانية';
                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    return (
        <div className="hero">
            {
                loading ? <Loading /> :
                    <div className="hero" style={{ backgroundImage: `url(${hero.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                        <div className="relative">
                            <div className=" bg-black/50 overlay" >
                                <div className="welcome container m-auto">
                                    <div className="hero-text">
                                        {language === 'en' ? <h1>Explore <span>Makkah</span> with us !</h1> : <h1>استكشف <span>مكة</span> معنا</h1>}
                                        <p>{language === 'en' ? ' Your Makkah tour starts from here' : ' رحلتك بمكة بداية من هنا'} </p>
                                        <Link href="/#paths" className='hero-book-btn'>{language === 'en' ? 'Book Now' : 'احجز الان'}</Link>
                                    </div>
                                    <div className="iPhones">
                                        <Image src={iPhones} alt="Mazar" className="iphones-img" />
                                    </div>
                                </div>
                                <div className="features container m-auto">
                                    {data?.data.map((feature, index) => (
                                        <div key={index} className="feature">
                                            <Image src={feature.icon} alt="Mazar" width={32} height={32} className=" h-8 w-auto " />
                                            <p>{feature.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            }
            {/* <Link href='https://hajjconfex.com/visitor-registration' target='_blank'>
                <Image src={language === 'en' ? hero2 : hero3} alt="Mazar" className="img-banner" />
            </Link> */}
        </div>
    );
}
