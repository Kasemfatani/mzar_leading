'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
export default function Latest() {

    const [language, setLanguage] = useState('en');  // Default language is 'en'
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        // setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/news`
                , {
                    headers: headers,
                }).then(response => {
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
    return (
        <>
            {
                data?.length > 0 ?
                    <div className="content latest" style={{ direction: `${language === 'ar' ? 'rtl' : 'ltr'}` }}>
                        <div className="container m-auto">
                            <div className="flex items-center justify-between">
                                <h3>{language === 'en' ? 'Latest news' : 'أحدث الأخبار'} </h3>
                            </div>
                            <div className="ltr">
                                {
                                    loading ? <Loading /> :
                                        <div className="path-swiper w-full">
                                            <Swiper
                                                // navigation
                                                // pagination={{ type: "bullets", clickable: true }}
                                                spaceBetween={24}
                                                slidesPerView={7.5}
                                                autoplay={false}
                                                dir={`${language === 'ar' ? 'rtl' : 'ltr'}`}
                                                loop={true}
                                                modules={[Autoplay, Navigation, Pagination]}
                                                breakpoints={{
                                                    1400: {
                                                        slidesPerView: 3.2,
                                                    },
                                                    1100: {
                                                        slidesPerView: 3.1,
                                                    },
                                                    767: {
                                                        slidesPerView: 2.5,
                                                    },
                                                    768: {
                                                        slidesPerView: 2.5,
                                                        autoplay: false,
                                                    },
                                                    640: {
                                                        slidesPerView: 2.1,
                                                        autoplay: false,
                                                        spaceBetween: 16
                                                    },
                                                    100: {
                                                        slidesPerView: 1.1,
                                                        autoplay: false,
                                                        spaceBetween: 16

                                                    }
                                                }}
                                            >
                                                {data.map((path) =>
                                                    <SwiperSlide key={path.id}>
                                                        <Link href={`/news?id=${path.id}`} className="content-card">
                                                            <div className="img-cont">
                                                                <Image src={path.image} width={200} height={200} alt="Mazar" />
                                                                {/* <div className="overlay">
                                                                    <div className="padge">
                                                                        <span>{language === 'en' ? 'New' : 'جديد'}</span>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                            <h4>{path.title}</h4>
                                                            <p>{path.description}</p>



                                                        </Link>
                                                    </SwiperSlide>
                                                )}
                                            </Swiper>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    );
}
