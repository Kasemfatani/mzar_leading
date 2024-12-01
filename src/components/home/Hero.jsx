'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import hero from '/public/hero.jpg'
import iPhones from '/public/iphones.webp'
import { motion } from 'framer-motion';
import Loading from '@/app/loading';
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
        setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get('https://mzarapp.com/api/landing/home/features'
                , {
                    headers: headers,
                }).then(response => {
                    setData(response.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false

                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    return (
        <div className="hero" style={{ backgroundImage: `url(${hero.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' ,direction: language === 'ar' ? 'rtl' : 'ltr'}}>
            {
                loading ? <Loading /> :
                    <div className="relative">
                        <div className=" bg-black/50 overlay" >
                            <div className="welcome container m-auto">
                                <div className="hero-text">
                                    {language === 'en' ? <h1>Explore <span>Makkah</span> with us !</h1> : <h1>استكشف <span>مكة</span> معنا</h1>}
                                    <p>{language==='en'?' let us make your Umrah unforgettable':'استمتع معنا بعمرة لا تنسى'} </p>
                                    <Link href="/#paths" className='hero-book-btn'>{language === 'en' ? 'Book Now' :'احجز الان'}</Link>
                                </div>
                                <div className="iPhones">
                                    <Image src={iPhones} alt="Mazar" className="iphones-img" />
                                </div>
                            </div>
                            <div className="features container m-auto">
                                {data?.data.map((feature, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: -100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.2,
                                            duration: index + 1 * .3,
                                        }}
                                        key={index}
                                        viewport={{ once: true }}
                                        className="feature">
                                        <Image src={feature.icon} alt="Mazar" width={32} height={32} className=" h-8 w-auto " />
                                        <p>{feature.title}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}
