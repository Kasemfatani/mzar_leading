'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberTicker from '../ui/number-ticker';
import Loading from '@/app/loading'
// import vid from '../../assets/images/home/vid.mp4'
export default function About() {
    const [loading, setLoading] = useState(true); // State for loading indicator
    let [play, setPlay] = useState(false);  // State to control video playback
    const [data, setData] = useState(null);
    const [numbers, setNumbers] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            // Define the headers with the selected language
            // Define the headers with the selected language
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get('https://mzarapp.com/api/landing/home/about'
                , {
                    headers: headers,
                }).then(response => {
                    setData(response.data);  // Set the response data to state

                }).catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                });

            axios.get('https://mzarapp.com/api/landing/home/counter'
                , {
                    headers: headers,
                }).then(response => {
                    setNumbers(response.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                }).catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    // Example: Toggle between 'en' and 'ar'

    const toggleLanguage = () => {
        setLanguage(prevLanguage => (prevLanguage === 'en' ? 'ar' : 'en'));
    };
    return (
        <section className="about-section" id="about" style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <div className="container m-auto">
                {
                    loading ? <Loading />
                        :
                        <div className="about-cont">
                            <div className="media">
                                <div className="vid w-full">
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data?.data.video.slice(32)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                <div className="text w-full">
                                    <h2>{data?.data.title}</h2>
                                    <p>{data?.data.description}</p>
                                </div>
                            </div>
                            <div className="analysis">
                                <h3>{language === 'en' ? "Our numbers" :'أرقامنا' }</h3>
                                <div className="counters">
                                    {
                                        numbers?.data.map((num, index) =>
                                            <div className="counter">
                                                <h4>{num.title}</h4>
                                                <p className="whitespace-pre-wrap text-6xl font-semibold tracking-tighter text-secColor dark:text-white">
                                                    + <NumberTicker value={(num.counter.split(',').join(''))} />
                                                </p>
                                                <h5>{num.description}</h5>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                }
            </div>
        </section>
    );
}
