'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import img1 from '/public/Thaw.jpg';
import img2 from '/public/conf/10.png';
import sar from '/public/sar.png';
import Offer from './Offer';
import Explore from '../home/Explore';
import { useSearchParams } from 'next/navigation';

export default function PathInfo(pathData) {
  const searchParams = useSearchParams();
  const pathId = searchParams.get('id');
  const [gclid, setGclid] = useState(null); // Store GCLID
  const data=pathData.data;
  const [language, setLanguage] = useState('en');

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

  // Function to append GCLID to a given path
  const getGclidLink = (path) => {
    return gclid ? `${path}?gclid=${gclid}` : path;
  };

  return (
    <>
      <div className='container m-auto path'>
        <div className="pathHead">
          <div className="t-title">
            <div className="t">
              <h1>{pathData.data.name}</h1>
            </div>
          </div>
        </div>

        <div className="pathdata">
          <div className="imgs w-full">
            <div className="imgs-grid">
              {data.package_images.map((img, index) => (
                <div className="img-cont" key={index}>
                  {index === 2 ? (
                    <Image src={img.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                  ) : (
                    <a href={img.image} data-fancybox="post">
                      <figure>
                        <Image src={img.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                      </figure>
                    </a>
                  )}
                  {index === 2 && (
                    <div className="rest">
                      <a href={img.image} data-fancybox="post">+{data.package_images.length - 2}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 ll-siide">
            <div className="free-auth">
              <Link href="https://book.nusuk.sa/sa-ar/organizer/shrk-mz-r-laol-llsfr-o-lsy-h" className="auth">
                <Image src={img2} alt={`${pathData.data.name} image`} width={200} height={200} />
                <h4>{language === 'en' ? 'Verified by nusuk' : ' معتمد من نسك'}</h4>
                <i className="fa-solid fa-arrow-up"></i>
              </Link>
              <div className="free-col">
                <i className="fa-regular fa-calendar"></i>
                <h4>{language === 'en' ? 'Free cancellation' : 'الغاء الحجز مجانا'}</h4>
              </div>
            </div>

            <div className="btn-offer-cont">
              <div className="cont-offeree">
                <Offer />
              </div>
              <div className="btn-free">
                <div className="price-offer">
                  <span className="from">{language === 'en' ? 'From' : 'من'}</span>
                  <h5>
                    <Image src={sar} alt="SAR" width={40} height={40} />
                    <span className="discounted-price">{pathData.data.starting_price.toFixed(2)}</span>
                    <Image src={sar} alt="SAR" width={20} height={20} />
                    <span className="original-price">{(pathData.data.starting_price * 1.2).toFixed(2)}</span>
                  </h5>
                  <span>{language === 'en' ? 'Per group up to 4 persons ' : 'لكل مجموعة حتى 4 شخص'}</span>
                </div>

                {/* Book Now link with GCLID */}
                <Link href={gclid?`/book?id=${data.id}&gclid=${gclid}`:`/book?id=${data.id}`} className="book-link">
                  {language === 'en' ? 'Book Now' : 'احجز الان'}
                </Link>
              </div>
            </div>

            <div className="places w-full">
              <h4>{language === 'en' ? 'During the trip' : 'خلال الرحلة'}</h4>
              <p>{language === 'en' ? 'See the trip content and places you will visit' : 'شاهد محتوى الرحلة والأماكن التي ستزورها'}</p>
              <div className="places-grid">
                {data.locations.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: index * 0.2, type: 'spring', bounce: 0.2, duration: 0.3 }}
                    className="place-cont">
                    <Image src={img.cover} alt={`${pathData.data.name} image`} width={200} height={200} />
                    <p>{img.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cont-desc">
          <h3>{language === 'en' ? 'Description' : 'وصف الرحلة'}</h3>
          <p className='desc'>{pathData.data.description}</p>
        </div>

        {pathId == 47 || pathId == 49 || pathId == 45 ? (
          <div className="mb-10">
            <Explore />
          </div>
        ) : null}
      </div>
    </>
  );
}
