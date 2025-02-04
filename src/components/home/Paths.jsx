'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { API_BASE_URL } from '@/lib/apiConfig';

import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';

export default function Paths() {
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            // Define the headers with the selected language
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/packages`
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
    const ReviewCard = ({
        cover, name
    }) => {
        return (
            <figure
                className={cn(

                )}
            >
                <div className="small-swiper-img-name">
                    <div className="samll-img-cont">
                        <Image src={cover} alt="Mazar" width={100} height={100} />
                    </div>
                    <h6> {name}  </h6>
                </div>
            </figure>
        );
    };
    return (
        <div className="paths container m-auto" id='paths' style={{ direction: `${language === 'ar' ? 'rtl' : 'ltr'}` }}>
            <div className="title">
                <h2>{data?.data.title}</h2>
                <p>{data?.data.description}</p>
            </div>
            <div className="path-swiper w-full" style={{ direction: `ltr` }}>
                <Swiper
                    dir={'rtl'}
                    // cssMode={language === 'ar'} // Important for RTL support
                    spaceBetween={32}
                    slidesPerView={7.5}
                    autoplay={true}
                    loop={true}
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
                    {data?.data.packages.map((path) =>
                        <SwiperSlide key={path.id}>
                            <div className="path-card">
                                <div className="img-cont">
                                    <Image
                                        src={path.cover}
                                        alt="Mazar"
                                        className="path-img"
                                        width={300}
                                        height={300}
                                    />
                                    <div className="duration">{path.duration}</div>
                                </div>
                                <h3 className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>{path.name}</h3>
                                <p className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>{path.short_description}</p>
                                <div className="small-imgs-slider w-full" dir='ltr'>
                                    {/* <Swiper
                                        // navigation
                                        // pagination={{ type: "bullets", clickable: true }}
                                        dir='ltr'
                                        spaceBetween={14}
                                        slidesPerView={4}
                                        autoplay={true}
                                        loop={true}
                                        modules={[Autoplay, Navigation, Pagination]}

                                        breakpoints={{

                                            640: {
                                                slidesPerView: 4,
                                                autoplay: false,
                                            },
                                            100: {
                                                slidesPerView: 3,
                                                autoplay: false,
                                            }
                                        }}
                                    >
                                        {path.locations.map((location, index) =>
                                            <SwiperSlide key={index}>
                                                <div className="small-swiper-img-name">
                                                    <div className="samll-img-cont">
                                                        <Image src={location.cover} alt="Mazar" width={100} height={100} />
                                                    </div>
                                                    <h6> {location.name}  </h6>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper> */}
                                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                                        {path.locations.map((review, index) => (
                                            <ReviewCard key={index} {...review} />
                                        ))}
                                    </Marquee>
                                </div>
                                <Link href={`/path?id=${path.id}`} className='view-detials'>{language === 'en' ? 'View Details' : 'عرض التفاصيل'} </Link>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}
