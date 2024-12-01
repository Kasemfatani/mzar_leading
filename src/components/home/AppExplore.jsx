'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import img from '/public/iPhone.webp';
import bg from '/public/mecca.jpg';
import apple from '/public/apple.png';
import google from '/public/google.png';
import Image from 'next/image';
export default function AppExplore() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    }, []); 
    return (
        <div style={{ backgroundImage: `url(${bg.src})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div className="AppExplore">
                <div className="container m-auto  genSection ">
                    <div className="img-cont">
                        <Image src={img} alt="Mazar" className="img" />
                    </div>
                    <div className={`l-side ${language === 'en' ? 'ltr' : 'rtl'}`} >
                        <h2 className='font-bold text-[#141414]'>{ language === 'en' ? 'Enjoy full experience with our app' : 'استمتع بالتجربة الكاملة مع تطبيقنا'}</h2>
                        <p className="text-2xl font-medium mb-4 text-[#5A5A5A]">{language === 'en' ? 'Unlock the full potential of our app today! Book trips seamlessly, access engaging content, and enjoy even more features designed to make your experience smooth and enjoyable' : 'استخدم إمكانات تطبيقنا الكاملة اليوم! احجز رحلاتك بسلاسة، واحصل على محتوى جذاب، واستمتع بمزيد من الميزات المصممة لجعل تجربتك سلسة وممتعة'}</p>
                        <Link href="https://onelink.to/yb2xky"><Image src={google} alt="Mazar" className="img" /></Link>
                        <Link href="https://onelink.to/yb2xky"><Image src={apple} alt="Mazar" className="img" /></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
