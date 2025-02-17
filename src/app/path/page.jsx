'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Example from '../../components/Path/Example';
import PathInfo from '../../components/Path/PathInfo';
import Destinations from '../../components/Path/Destinations';
import Riviews from '../../components/Path/Riviews';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Loading from '../loading';
import { API_BASE_URL } from '@/lib/apiConfig';
export default function Home() {
  const searchParams = useSearchParams()
  const [pathId, setPathId] = useState(searchParams.get('id'))
  // const categoryId = searchParams.get('subId')
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');  // Default language is 'en'
  const pathname = usePathname()
  
  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      // Define the headers with the selected language
      setLanguage(localStorage.getItem('lang'));
      const headers = {
        lang: localStorage.getItem('lang'), // Change language dynamically based on state
      };
      // Fetch data from the API with Axios
      axios.get(`${API_BASE_URL}/landing/home/packages/details?package_id=${pathId}`
        , {
          headers: headers,
        })
        .then(response => {
          setData(response.data);  // Set the response data to state
          setLoading(false);  // Set loading to false
          document.title = response.data.name;

        })
        .catch(error => {
          setError(error);  // Handle any errors
          console.error('Error fetching data:', error);
          setLoading(false)
        });
    }
  }, []);  // Run this effect whenever the `language` changes
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]); // Runs when pathname changes

  return (
    <>
      {
        loading ? <Loading /> :
          <div className={language === 'en' ? 'ltr' : 'rtl'}>
            {
              pathname == '/path' ?

                <a href={`https://wa.me/+966580121025?text=hello! I am interested in ${data.name} , i would like to know more about it`} className="fixed-what">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                : null
            }
            <PathInfo data={data} lang={language}></PathInfo>
            <Destinations data={data} lang={language}></Destinations>
            <Riviews id={pathId} lang={language}></Riviews>
            {/* <Example></Example> */}
          </div>
      }
    </>

  );
}
