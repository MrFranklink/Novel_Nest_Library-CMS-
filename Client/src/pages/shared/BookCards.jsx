import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './bannerCard.css';

const BookCards = ({ headline, books }) => {
    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-5xl my-5 font-bold text-center'>{headline}</h2>

            {/* cards */}
            <div className='mt-20'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="w-full h-full"
                >
                    {books.map((book) => (
                        <SwiperSlide className='text-center flex items-center justify-center' key={book._id}>
                            <Link to={`/shop`} className='book-card'>
                                <div className='bg-gray-100 p-8 rounded-lg relative book-card-inner'>
                                    <img src={book.imageURL} alt={book.bookTitle} className='w-full rounded-md' />
                                    <div className='cart-icon'>
                                        <FaCartShopping className='w-4 h-4 text-white' />
                                    </div>
                                </div>
                                <div className='mt-5 mb-8 text-left flex justify-between items-start book-info'>
                                    <div>
                                        <h3 className='text-black font-semibold'>{book.bookTitle}</h3>
                                        <p className='text-gray-600'>{book.authorName}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold text-blue-700'>$ Free</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BookCards;
