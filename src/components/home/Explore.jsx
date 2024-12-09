'use client'
import Link from 'next/link';
import exp from '/public/exp.png'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Explore() {

    return (
        <div className="explore" style={{ backgroundImage: `url(${exp.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="overll">
                <div className="container m-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration:  .5,
                        }}
                        viewport={{ once: true }} className="text">
                        <div className="padg">
                            <h3>Reach the peak of Spiritulity</h3>
                        </div>
                        <h2>Explore Hira Cave Comfortably by car transfer to the peak of Al noor mountain</h2>
                        <Link href="/book" className='px-8 py-2 text-white rounded-lg bg-primaryColor inline-block w-fit'>Book now</Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
