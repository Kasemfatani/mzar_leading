'use client'
import React, { useState } from 'react';
import bg from '/public/bg.png';
import doneImage from '/public/done.svg';
import MazarInfo from '../../components/book/MazarInfo';
import FormPage from '../../components/book/FormPage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Book() {
  const router = useRouter()
  const [done, setDone] = useState(false);
  function handleDone() {
    setDone(false);
    document.querySelector('html').style.overflow = 'auto';
    router.push('/');
    
  }
  return (
    <div className='book-main-page' style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="overlay">
        <div className="popup" style={{ display: done ? 'flex' : 'none' ,opacity: done ? 1 : 0}} onClick={handleDone}>
        <div className="popup-cont">
          <Image src={doneImage} alt="Mazar" className="img" />
          <h2>Welcome to Mzar </h2>
          <p>Our team will contact you shortly on WhatsApp to guide you through the next steps of your journey. We look forward to assisting you!</p>
        </div>
      </div>
      
      <div className="container m-auto">
        <div className="book-cont">
          <MazarInfo></MazarInfo>
          <FormPage done={done} setDone={setDone}></FormPage>
          {/* <Form></Form> */}
        </div>
      </div>
      </div>
    </div>
  );
}
