'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img1 from '/public/Thaw.jpg';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PathInfo(pathData) {
    const searchParams = useSearchParams();
    const [gclid, setGclid] = useState(null); // Store GCLID
    let [data, setData] = useState(pathData.data);
    let [language, setLanguage] = useState('en');
    let destinations = data.locations;
    let [destinationsCopy, setDestinationsCopy] = useState(destinations.slice(0, 4));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang') || 'en');

            // Extract GCLID from the URL
            const gclidValue = searchParams.get('gclid');
            if (gclidValue) {
                setGclid(gclidValue);
            }
        }
    }, [searchParams]);

    // Function to append GCLID to the /book link
    const getGclidLink = (path) => {
        return gclid ? `${path}?gclid=${gclid}` : path;
    };

    return (
        <div className="destinations container m-auto">
            <div className="destinations-drid">
                {destinationsCopy.map((item) => (
                    <div className="destination" key={item.id}>
                        <div className="img-cont">
                            <Image src={item.cover} width={200} height={200} alt={`${pathData.data.name} image`} />
                        </div>
                        <div className="text">
                            <h2>{item.name}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.short_description}</p>
                        </div>
                    </div>
                ))}
                <h2
                    className="show-more"
                    style={{ display: destinations.length > destinationsCopy.length ? 'block' : 'none' }}
                    onClick={() => setDestinationsCopy([...destinations])}
                >
                    {language === 'en' ? 'Show More' : 'اظهار المزيد'}
                </h2>
            </div>

            <div className="ready-cont" style={{ backgroundImage: `url(${img1.src})` }}>
                <div className="ready">
                    <h2>{language === 'en' ? 'Ready to start your journey?' : 'مستعد لبدء رحلتك؟'}</h2>
                    <p>{language === 'en' ? 'Please contact us and book your trip' : 'يرجى الاتصال بنا وحجز رحلتك'}</p>

                    {/* Book Now link with GCLID */}
                    <Link href={gclid?`/book?id=${data.id}&gclid=${gclid}`:`/book?id=${data.id}`} className="book-link">
                        {language === 'en' ? 'Book Now' : 'حجز الان'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
