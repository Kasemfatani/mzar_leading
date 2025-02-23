'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fancybox } from "@fancyapps/ui";
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import img1 from '/public/Thaw.jpg';
import img2 from '/public/conf/10.png';
import sar from '/public/sar.png';
import Offer from './Offer';
import Explore from '../home/Explore';
import { useSearchParams } from 'next/navigation';
export default function PathInfo(pathData) {

  const searchParams = useSearchParams()
  const [pathId, setPathId] = useState(searchParams.get('id'))
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });
  let [data, setData] = useState(pathData.data);
  // let [language, setLanguage] = useState(pathData.lang);
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('lang') || 'en');
    }
  }, []);

  return (
    <>
      <div className='container m-auto path'>
        <div className="pathHead">
          <div className="t-title">
            <div className="t">
              <h1>{pathData.data.name}</h1>

            </div>


            {/* <p className='desc'>{pathData.data.description}</p> */}
          </div>

        </div>
        <div className="pathdata">
          <div className="imgs w-full">
            <div className="imgs-grid">
              {
                data.package_images.map((img, index) =>
                  <div className="img-cont" key={index}>
                    {
                      index == 2 ?
                        <Image src={img.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                        :
                        <a href={img.image} data-fancybox="post">
                          <figure>
                            <Image src={img.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                          </figure>
                        </a>
                    }
                    {
                      index == 2 ?
                        <div className="rest"><a href={img.image} data-fancybox="post">+{data.package_images.length - 2}</a></div>
                        : null
                    }
                  </div>
                )
              }
            </div>

            <div className="faci-acti">
              <div className="facilities-duration">
                <div className="facilities w-full">
                  <h3>{language === 'en' ? 'Facilities' : 'تتضمن الرحلة'}</h3>
                  <div className="facilities-cont">
                    {
                      data.services.map((facility, index) =>
                        <div className="facility-cont" key={index}>
                          <Image src={facility.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                          <p>{facility.name}</p>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="duration w-full">
                  <div className="hh">
                    <p className='trip-duration-head'>{language === 'en' ? 'Trip duration:' : "مدة الرحلة:"}</p>
                    <p className='trip-duration-title'>{data.duration}</p>
                  </div>
                  <div className="trip-data ready-cont" style={{ backgroundImage: `url(${img1.src})` }}>
                    <h4>{language === 'en' ? 'Best time to visit' : 'وقت الزيارة المفضل'} </h4>
                    <p>{data.best_visit_time}</p>
                  </div>
                </div>
              </div>

            </div>


          </div>
          <div className="flex flex-col gap-2 ll-siide">
            <div className="free-auth">
              <Link href="https://book.nusuk.sa/sa-ar/organizer/shrk-mz-r-laol-llsfr-o-lsy-h" className="auth">
                <Image src={img2} alt={`${pathData.data.name} image`} width={200} height={200}></Image>
                <h4>{language === 'en' ? 'Verified by nusuk' : ' معتمد من نسك'} </h4>
                <i className="fa-solid fa-arrow-up"></i>
              </Link>
              <div className="free-col">
                <i class="fa-regular fa-calendar"></i>
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
                    {/* {language === 'en' ? 'Start from' : 'تبدأ من'} */}
                    <Image src={sar} alt={`${pathData.data.name} image`} width={40} height={40} /><span className="discounted-price">{pathData.data.starting_price.toFixed(2)}</span>
                    {/* {language === 'en' ? ' instead of' : 'بدلاً من '} */}
                    <Image src={sar} alt={`${pathData.data.name} image`} width={20} height={20} /><span className="original-price">{(pathData.data.starting_price * 1.2).toFixed(2)}</span>
                  </h5>
                  <span>{language === 'en' ? 'Per group up to 4 persons ' : 'لكل مجموعة حتى 4 شخص'}</span>
                </div>
                <Link href={`/book-path?id=${data.id}`} className="book-link">
                  {language === 'en' ? 'Book Now' : 'احجز الان'}
                </Link>
              </div>
            </div>

            <div className="places w-full">
              <h4>{language === 'en' ? 'During the trip' : 'خلال الرحلة'}</h4>
              <p>{language === 'en' ? 'See the trip content and places you will visit' : 'شاهد محتوى الرحلة والأماكن التي ستزورها'}</p>
              <div className="places-grid">
                {
                  data.locations.map((img, index) =>
                    <motion.div
                      initial={{ opacity: 0, y: -100 }} // Initial animation state (faded and shifted left)
                      whileInView={{ opacity: 1, y: 0 }} // Animation state when in view (fully visible and reset position)
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        delay: index * 0.2,
                        type: 'spring', // Using spring animation for smooth motion
                        bounce: 0.2, // Small bounce effect for the animation
                        duration: .3, // Duration of the animation
                      }}
                      key={index}
                      className="place-cont" >
                      <Image src={img.cover} alt={`${pathData.data.name} image`} width={200} height={200} />
                      <p>{img.name}</p>
                    </motion.div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="cont-desc">
          <h3>{language === 'en' ? 'Description' : 'وصف الرحلة'}</h3>
          <p className='desc'>{pathData.data.description}</p>
        </div>
        <div className="activities">
          <h5>{language === 'en' ? 'Activities' : 'الأنشطة'}</h5>
          <p>{language === 'en' ? 'See the activities and places you will visit' : 'شاهد النشاطات والأماكن التي ستزورها'}</p>
          <div className="activities-grid">
            {
              data.in_directions.map((activity, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -50 }} // Initial animation state (faded and shifted left)
                  whileInView={{ opacity: 1, y: 0 }} // Animation state when in view (fully visible and reset position)
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    delay: index * 0.2,
                    type: 'spring', // Using spring animation for smooth motion
                    bounce: 0.2, // Small bounce effect for the animation
                    duration: .3, // Duration of the animation

                  }}
                  className="activity-cont">
                  <Image src={activity.image} alt={`${pathData.data.name} image`} width={200} height={200} />
                  <p>{activity.name}</p>
                </motion.div>
              )
            }
          </div>
        </div>
      </div>
      {
        pathId == 47|| pathId == 49 || pathId == 45 ?
          < div className="mb-10">
            <Explore />
          </div >
          : null
      }

    </>
  );
}
