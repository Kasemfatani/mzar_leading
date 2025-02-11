'use client'
import React, { useEffect, useState } from 'react';
import Flag from "react-world-flags";
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Riviews({ id }) {

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState([]);
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
            axios.get(`${API_BASE_URL}/landing/home/packages/reviews?package_id=${id}`
                , {
                    headers: headers,
                })
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false

                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    console.log(data);

    return (
        <>
            {
                data.length > 0 ?
                    <div className="container m-auto" style={{ direction: `${language === 'ar' ? 'rtl' : 'ltr'}` }}>
                        <h4 className='t-title-review'>{language === 'en' ? 'Reviews' : 'التقييمات'}</h4>
                        {
                            loading ? <Loading /> :
                                <div className="reviews-swiper w-full" style={{ direction: `ltr` }}>
                                    <Swiper
                                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                                        // cssMode={language === 'ar'} // Important for RTL support
                                        spaceBetween={32}
                                        slidesPerView={7.5}
                                        autoplay={true}
                                        loop={true}
                                        navigation={true}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        breakpoints={{
                                            1400: {
                                                slidesPerView: 3,
                                            },
                                            1100: {
                                                slidesPerView: 3,
                                            },
                                            767: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                                autoplay: false,
                                                Navigation: false
                                            },
                                            640: {
                                                slidesPerView: 1.2,
                                                autoplay: false,
                                                spaceBetween: 16
                                            },
                                            100: {
                                                slidesPerView: 1.2,
                                                autoplay: false,
                                                spaceBetween: 16
                                            }
                                        }}
                                    >
                                        {data?.map((review) =>
                                            <SwiperSlide key={review.id}>
                                                <div className="review-cont">
                                                    <div className="title">
                                                        <h4>{review.title}</h4>
                                                        <Flag code={review.country_code.toUpperCase()} />
                                                    </div>
                                                    <div className="stars">
                                                        {[...Array(5)].map((star, index) => (
                                                            <i class={`${review.rating > index ? 'fa-solid' : 'fa-regular'} fa-star ${review.rating > index ? 'active' : ''}`}></i>
                                                        ))}
                                                    </div>
                                                    <p>{review.description}</p>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                        }
                    </div>
                    : null
            }
        </>
    );
}
