'use client'
import React, {  useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fancybox } from "@fancyapps/ui";
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Cable, Milk, Wifi } from 'lucide-react';
export default function PathInfo(pathData) {
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });
  let [data,setData] = useState(pathData.data);
  // let [language, setLanguage] = useState(pathData.lang);
  let [language, setLanguage] = useState('en');
  console.log(language);
  
  
  console.log(data);
  
  return (
    <div className='container m-auto path'>
      <div className="pathHead">
        <h1>{data.name} </h1>
        <Link href="/book" className='book-link' >{language === 'en' ? 'Book Now' : 'حجز الان'}</Link>
      </div>
      <div className="pathdata">
        <div className="imgs w-full">
          <div className="imgs-grid">
            {
              data.package_images.map((img, index) =>
                <div className="img-cont" key={index}>
                  {
                    index == 2 ?
                      <Image src={img.image} alt="Mazar"  width={200} height={200}/>
                      :
                      <a href={img.image} data-fancybox="post">
                        <figure>
                          <Image src={img.image} alt="Mazar"  width={200} height={200}/>
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
        </div>
        <div className="places w-full">
          <h4>{language === 'en' ? 'During the trip' : 'خلال الرحلة'}</h4>
          <p>{language === 'en' ?'See the trip content and places you will visit' : 'شاهد محتوى الرحلة والأماكن التي ستزورها'}</p>
          <div className="places-grid">
            {
              data.locations.map((img, index) =>
                <motion.div
                  initial={{ opacity: 0, y: -100 }} // Initial animation state (faded and shifted left)
                  whileInView={{ opacity: 1, y: 0 }} // Animation state when in view (fully visible and reset position)
                  viewport={{ once: true ,amount: 0.8}}
                  transition={{
                    delay: index * 0.2,
                    type: 'spring', // Using spring animation for smooth motion
                    bounce: 0.2, // Small bounce effect for the animation
                    duration: .3, // Duration of the animation

                  }}
                  className="place-cont" key={index}>
                  <Image src={img.cover} alt="Mazar" width={200} height={200}/>
                  <p>{img.name}</p>
                </motion.div>
              )
            }
          </div>
        </div>
      </div>
      <div className="facilities-duration">
        <div className="facilities w-full">
          <h3>Facilities</h3>
          <div className="facilities-cont">
            {
              data.services.map((facility, index) =>
                <div className="facility-cont" key={index}>
                  <Image src={facility.image} alt="Mazar" width={200} height={200}/>
                  <p>{facility.name}</p>
                </div>
              )
            }
          </div>
        </div>
        <div className="duration w-full">
          <div className="hh">
            <p className='trip-duration-head'>{language === 'en' ? 'Trip duration:' :"مدة الرحلة:"}</p>
            <p className='trip-duration-title'>{data.duration}</p>
          </div>
          <div className="trip-data">
            <h4>{language === 'en' ? 'Best time to visit' : 'وقت الزيارة المفضل'} </h4>
            <p>{data.best_visit_time}</p>
          </div>
        </div>
      </div>
      <div className="activities">
        <h5>{language==='en' ? 'Activities' :'الأنشطة'}</h5>
        <p>{language === 'en' ? 'See the activities and places you will visit' : 'شاهد النشاطات والأماكن التي ستزورها'}</p>
        <div className="activities-grid">
          {
            data.in_directions.map((activity, index) =>
              <motion.div
                  initial={{ opacity: 0, y: -50 }} // Initial animation state (faded and shifted left)
                  whileInView={{ opacity: 1, y: 0 }} // Animation state when in view (fully visible and reset position)
                  viewport={{ once: true ,amount: 0.8}}
                  transition={{
                    delay: index * 0.2,
                    type: 'spring', // Using spring animation for smooth motion
                    bounce: 0.2, // Small bounce effect for the animation
                    duration: .3, // Duration of the animation

                  }}
                   className="activity-cont" key={index}>
                <Image src={activity.image} alt="Mazar" width={200} height={200}/>
                <p>{activity.name}</p>
              </motion.div>
            )
          }
        </div>
      </div>
    </div>
  );
}
