'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function PathInfo(pathData) {
    let [more, setMore] = useState(false);
    let [data, setData] = useState(pathData.data);
//   let [language, setLanguage] = useState(data.lang);
  let [language, setLanguage] = useState('en');

    let destinations = data.locations
    let [destinationsCopy, setDestinationsCopy] = useState(destinations.slice(0, 4));
    // setDestinationsCopy(destinations.slice(0, 4));
    // if (destinations.length > 4) {
    // }
    // else {
    //     setDestinationsCopy([...destinations]);
    // }

    return (
        <div className="destinations container m-auto">
            <div className="destinations-drid">
                {
                    destinationsCopy.map((item) =>
                        <div className="destination" key={item.id}>
                            <div className="img-cont">
                                <Image src={item.cover} width={200} height={200} alt="Mazar"></Image>
                            </div>
                            <div className="text">
                                <h2>{item.name}</h2>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>

                            </div>
                        </div>
                    )
                }
                {/* <div className="destination">
                    <div className="img-cont">
                        <Image src={img1} alt="Mazar"></Image>
                    </div>
                    <div className="text">
                        <h2>Mount Thawr</h2>
                        <h3>Stay Duration: 20 minutes</h3>
                        <p>Mount Thawr is the mountain that shelters the cave where the Messenger of Allah, peace and blessings be upon him, and his companion took refuge on their migration journey to Medina. It stands as a witness to the great migration story in our Islamic history, along with other stories we share with you during the visit.</p>

                    </div>
                </div>
                <div className="destination">
                    <div className="img-cont">
                        <Image src={img1} alt="Mazar"></Image>
                    </div>
                    <div className="text">
                        <h2>Mount Thawr</h2>
                        <h3>Stay Duration: 20 minutes</h3>
                        <p>Mount Thawr is the mountain that shelters the cave where the Messenger of Allah, peace and blessings be upon him, and his companion took refuge on their migration journey to Medina. It stands as a witness to the great migration story in our Islamic history, along with other stories we share with you during the visit.</p>

                    </div>
                </div>
                <div className="destination">
                    <div className="img-cont">
                        <Image src={img1} alt="Mazar"></Image>
                    </div>
                    <div className="text">
                        <h2>Mount Thawr</h2>
                        <h3>Stay Duration: 20 minutes</h3>
                        <p>Mount Thawr is the mountain that shelters the cave where the Messenger of Allah, peace and blessings be upon him, and his companion took refuge on their migration journey to Medina. It stands as a witness to the great migration story in our Islamic history, along with other stories we share with you during the visit.</p>

                    </div>
                </div> */}
                <h2 className='show-more' style={{ display: destinations.length > destinationsCopy.length ? 'block' : 'none' }} onClick={() => setDestinationsCopy([...destinations])}>Show More</h2>
            </div>

            <div className="ready">
                <h2>{language === 'en' ? 'Ready to start your journey?' : 'مستعد لبدء رحلتك؟'} </h2>
                <p>{language === 'en' ? 'Please contact us and book your trip' :'يرجى الاتصال بنا وحجز رحلتك' }</p>
                <Link href={'/book'}>{language === 'en' ? 'Book Now' : 'حجز الان'}</Link>
            </div>
        </div>
    );
}
