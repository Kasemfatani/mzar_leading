'use client'
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.svg';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
export default function MazarInfo() {
  const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
        }
    }, []); 
  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
      whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
      viewport={{ once: true }}
      transition={{
        delay: 0.2,
        // type: 'spring', // Using spring animation for smooth motion
        bounce: 0.2, // Small bounce effect for the animation
      }}
      className={`w-full MazarInfo ${language === 'en' ? 'ltr' : 'rtl'}`}>
      <Image src={logo} alt="Mazar" className="img-logo" />
      <h2>{language === 'en' ? 'Join Us on Your Journey' : 'انضم لنا في رحلتك' }</h2>
      <p> {language === 'en'?`Please fill out the form below to begin your trip planning. Our team is here to make your experience as smooth and enjoyable as possible. Simply provide the details, and we'll handle the rest!`:"يرجى ملء النموذج أدناه لبدء التخطيط لرحلتك. فريقنا هنا لجعل تجربتك سلسة وممتعة قدر الإمكان. ما عليك سوى تقديم التفاصيل، وسنتولى الباقي!"}</p>
    </motion.div>
  );
}
