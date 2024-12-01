'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function Header() {
  const router = useRouter()
  let [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang')==='ar'||localStorage.getItem('lang')==='en') {
        setLang(localStorage.getItem('lang'));
      }
      else{
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, []);
  return (
    <header className="header">
      <div className="container m-auto flex items-center gap-2 justify-between">
        <Link href="/"> <Image src={logo} alt="logo" className="logo-img" /></Link>
        <div className="links">
          <Link href="/">{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
          <Link href="/#paths">{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
          <Link href="/#about">{lang === 'en' ? 'About' : 'من نحن'}</Link>
          {/* <div className="lang-btn" onClick={
            () => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'ar');
                setLang('ar');
                router.refresh();
                router.refresh();

              }
              else {
                localStorage.setItem('lang', 'en');
                setLang('en');
                router.refresh(); 
              }
            }
          }>{lang==='ar'?'En':'ع'}</div> */}
          <Link href="/book" className='book-link' >{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
        </div>
        {/* <div className="menu-bars">
          <DropdownMenu>
            <DropdownMenuTrigger><Menu ></Menu></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel> 
              <DropdownMenuSeparator /> 
              <DropdownMenuItem><Link href="/" className='w-full min-w-48 text-center p-2'>Home</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/#paths" className='w-full min-w-48 text-center p-2'>Paths</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/#about" className='w-full min-w-48 text-center p-2'>About</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/paths" className='w-full min-w-48 bg-primaryColor text-white px-1 py-1 rounded-sm text-center hover:bg-secColor' >Book now</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div> */}

        <Menu className='menu-bars' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} />
        <X className='menu-bars-X hidden' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} />
        <div className="side-menu" onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }}>
          <div className="links">
            <Link href="/">{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
            <Link href="/#paths">{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
            <Link href="/#about">{lang === 'en' ? 'About' : 'من نحن'}</Link>
            {/* <div className="lang-btn" onClick={
            () => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'ar');
                setLang('ar');
                router.refresh();
                router.refresh();

              }
              else {
                localStorage.setItem('lang', 'en');
                setLang('en');
                router.refresh(); 
              }
            }
          }>{lang==='ar'?'En':'ع'}</div> */}
            <Link href="/book" className='book-link' >{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}