'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Example from '../../components/Path/Example';
import PathInfo from '../../components/Path/PathInfo';
import Destinations from '../../components/Path/Destinations';
import { useSearchParams } from 'next/navigation'
import Loading from '../loading';
export default function Home() {
  const searchParams = useSearchParams()
  const [pathId, setPathId] = useState(searchParams.get('id'))
  // const categoryId = searchParams.get('subId')
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');  // Default language is 'en'

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      // Define the headers with the selected language
      setLanguage(localStorage.getItem('lang'));
      const headers = {
        lang: localStorage.getItem('lang'), // Change language dynamically based on state
      };
      // Fetch data from the API with Axios
      axios.get(`https://mzarapp.com/api/landing/home/packages/details?package_id=${pathId}`
        , {
          headers: headers,
        })
        .then(response => {
          setData(response.data);  // Set the response data to state
          setLoading(false);  // Set loading to false
          console.log(data);

        })
        .catch(error => {
          setError(error);  // Handle any errors
          console.error('Error fetching data:', error);
          setLoading(false)
        });
    }
  }, []);  // Run this effect whenever the `language` changes
  console.log(data);

  return (
    <>
      {
        loading ? <Loading /> :
          <div className={language === 'en' ? 'ltr' : 'rtl'}>
            <PathInfo data={data} lang={language}></PathInfo>
            <Destinations data ={data} lang={language}></Destinations>
            {/* <Example></Example> */}
          </div>
      }
    </>

  );
}
