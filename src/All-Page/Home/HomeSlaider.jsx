import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeSlaider = () => {
    return (
        <div className='w-full max-w-7xl mx-auto mt-5 p-4 rounded-2xl bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-xl border border-gray-700'>
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={true}
                interval={6000}
                transitionTime={1000}
            >
                {[
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 1",
                        legend: "Get Paid for Your Skills"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 2",
                        legend: "Task, Earn, Repeat"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 3",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 4",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 5",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 6",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 7",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 8",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 9",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 10",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 11",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 12",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co.com/R4YYdgtn/4.png",
                        alt: "Banner 13",
                        legend: "Be a TaskNinja Today"
                    },
                ].map(({ src, alt, legend }, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden">
                        {/* Image */}
                        <img
                            className="h-100 object-cover rounded-xl"
                            src={src}
                            alt={alt}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent rounded-xl"></div>
                        {/* Legend text */}
                        <p className="legend relative z-10 text-gray-100 font-semibold">{legend}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HomeSlaider;