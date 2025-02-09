'use client'
import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Paths from '../components/home/Paths';
import About from '../components/home/About';
import GenSection from '../components/home/GenSection';
import AppExplore from '../components/home/AppExplore';
import Explore from '../components/home/Explore';
import Latest from '../components/home/Latest';

export default function Home() {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang')==='ar') {
        setLang('ar');
      }
      else if (localStorage.getItem('lang')==='en') {
        setLang('en');
      }
      else{
        localStorage.setItem('lang', 'en');
      }
    }
  }, []);
  return (
    <main>
      <Hero></Hero>
      <Paths></Paths>
      <Explore/>
      <About></About>
      <GenSection/>
      <AppExplore/>
      <Latest/>
    </main>
  );
}
