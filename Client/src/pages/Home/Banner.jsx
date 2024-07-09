import React from 'react';
import BannerCard from '../shared/BannerCard';

export const Banner = () => {
    return (
        <div className='bg-gradient-to-r from-lime-400 to-lime-600 px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-20'>
                {/* right side */}
                <div className='md:w-1/2 h-full'>
                    <BannerCard />
                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8'>
                    <h1 className='lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug'>
                        Buy and sell your books 
                        <span className='text-white'> for the best prices</span>
                    </h1>
                    <p className='text-lg text-gray-800'>
                        Find and read more books you'll love, and keep track of the books you want to read. 
                        Be part of the world's largest community of book lovers on Goodreads.
                    </p>
                    {/* <div className='flex'>
                        <input 
                            type="search" 
                            placeholder='Search a book here' 
                            className='py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                            aria-label="Search a book"
                        />
                        <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-blue-800 transition-all ease-in duration-200 rounded-r-md'>
                            Search
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
