import React from 'react'
// react icons
import { FaStar } from 'react-icons/fa6'
import { Avatar } from 'flowbite-react';
import profile from "../../assets/profile.jpg"

const ReviewCard = () => {
    return (
        <div className='space-y-6'>
            <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>

            {/* texts */}
            <div className='mt-7'>
                <p className='mb-5'>I really love their Services..</p>
                <Avatar
                    alt="avatar of Jese"
                    img={profile}
                    rounded
                    className='w-10 mb-4'
                />
                <h5 className='text-lg font-medium'>Geetansh Saini</h5>
                <p className='text-sm'> Intern, Wissen Technology</p>
            </div>
        </div>
    )
}

export default ReviewCard