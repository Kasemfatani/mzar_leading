'use client'
import React, { useState } from 'react';
import bg from '/public/bg.png';
import MazarInfo from '../../components/book/MazarInfo';
import FormPage from '../../components/book/FormPage';
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
