'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [lang, setLang] = useState('en');
  const [gclid, setGclid] = useState(null); // Store GCLID

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get language from localStorage or set default
      const storedLang = localStorage.getItem('lang');
      if (storedLang === 'ar' || storedLang === 'en') {
        setLang(storedLang);
      } else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }

      // Extract GCLID from the URL
      const gclidValue = searchParams.get('gclid');
      if (gclidValue) {
        setGclid(gclidValue);
      }
    }
  }, [searchParams]);

  // Function to append GCLID to a given path
  const getGclidLink = (path) => {
    return gclid ? `${path}?gclid=${gclid}` : path;
  };

  return (
    <header className="header">
      <div className="container m-auto flex items-center gap-2 justify-between">
        <Link href="/"> <Image src={logo} alt="logo" className="logo-img" /></Link>
        <div className="links">
          <Link href="/" className={pathname === '/' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
          <Link href="/#paths" className={pathname === '/#paths' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
          <Link href="/#about" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'About' : 'من نحن'}</Link>
          <Link href="/all-news" className={pathname === '/all-news' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'News' : 'الاخبار'}</Link>
          
          {/* Book Now link with GCLID */}
          <Link href={getGclidLink('/book')} className='book-link'>{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
        </div>

        <Menu className='menu-bars' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active');
          document.querySelector('.menu-bars').classList.toggle('hidden');
          document.querySelector('.menu-bars-X').classList.toggle('hidden');
        }} />
        <X className='menu-bars-X hidden' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active');
          document.querySelector('.menu-bars').classList.toggle('hidden');
          document.querySelector('.menu-bars-X').classList.toggle('hidden');
        }} />
        <div className="side-menu" onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active');
          document.querySelector('.menu-bars').classList.toggle('hidden');
          document.querySelector('.menu-bars-X').classList.toggle('hidden');
        }}>
          <div className="links">
            <Link href="/" className={pathname === '/' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
            <Link href="/#paths">{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
            <Link href="/#about">{lang === 'en' ? 'About' : 'من نحن'}</Link>
            <Link href="/all-news" className={pathname === '/all-news' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'News' : 'الاخبار'}</Link>
            
            {/* Book Now link with GCLID in Side Menu */}
            <Link href={getGclidLink('/book')} className='book-link'>{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
