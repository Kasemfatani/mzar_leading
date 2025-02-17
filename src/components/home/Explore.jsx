'use client'
import Link from 'next/link';
import exp from '/public/exp.png'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Explore() {
    const [language, setLanguage] = useState('en');
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setLanguage(localStorage.getItem('lang') || 'en');
      }
    }, []);
    return (
        <div className="explore" style={{ backgroundImage: `url(${exp.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' , direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <div className="overll">
                <div className="container m-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration:  .5,
                        }}
                        viewport={{ once: true }} className="text">
                        <div className="padg">
                            <h3>{language === 'en' ? 'Reach the peak of Spiritulity' : 'الوصول إلى قمة الروحانية'}</h3>
                        </div>
                        <h2>{language=== 'en'?"Explore Hira Cave Comfortably by car transfer to the peak of Al noor mountain":"استكشف كهف حراء بسهولة بواسطة السيارة ثم انتقل إلى قمة جبل النور"}</h2>
                        <Link href="/book" className='px-8 py-2 text-white rounded-lg bg-primaryColor inline-block w-fit'>{language === 'en' ? 'Book Now' : 'حجز الان'}</Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
