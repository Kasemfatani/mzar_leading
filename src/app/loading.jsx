import React from 'react'
import footerimg from '../assets/images/home/logo.svg'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className='loading-page'>
            <Image src={footerimg} alt='logo' className='loading-logo' />
        </div>
        // <div id="page">
        //     <div id="container">
        //         <div id="ring"></div>
        //         <div id="ring"></div>
        //         <div id="ring"></div>
        //         <div id="ring"></div>
        //         <div id="h3">loading</div>
        //     </div>
        // </div>
    )
}
