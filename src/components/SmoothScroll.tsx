"use client";

type Props = {
    children: React.ReactNode
}

import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/locomotive-scroll.css";
import React from 'react';


function SmoothScroll({ children }: Props) {

    const ref = React.useRef<HTMLElement | null>(null)

    React.useLayoutEffect(() => {
        const locomotiveScroll = new LocomotiveScroll({
            el: ref.current as HTMLElement,
            smooth: true,
        })

        return () => {
            locomotiveScroll?.destroy()
        }
    }, [])

    return (
        <main
            ref={ref}
            className='bg-ivory min-h-screen'>
            {children}
        </main>
    )
}

export default SmoothScroll