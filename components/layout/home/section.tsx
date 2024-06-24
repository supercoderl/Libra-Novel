import { HomeSectionProps } from "@/types";
import { Link } from "react-scroll";
import Image from 'next/image';
import { Bookmark, MoveLeft, MoveRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { useState } from "react";
SwiperCore.use([Pagination]);

export default function Section(props: HomeSectionProps) {
    const { isCarousel = false, isCategory = false, overrideClass = null } = props;
    const [swiper, setSwiper] = useState<SwiperCore | null>(null);

    return (
        <div className={`md:px-8 ${overrideClass}`}>
            <div className="flex section justify-between items-baseline text-white">
                <h3 className="text-lg md:text-3xl">{props.title}</h3>
                {
                    isCategory ? (
                        <>
                            <ul className="hidden md:flex">
                                {
                                    props.categories && props.categories.length > 0 &&
                                    props.categories.map((category, index) => (
                                        <li key={index}>
                                            <Link
                                                activeClass="Home"
                                                to="today"
                                                smooth={true}
                                                offset={50}
                                                duration={500}
                                                className="cursor-pointer text-white font-normal text-md px-3 hover:text-main transition-all duration-500"
                                            >
                                                {category}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <ul className="mb:flex md:hidden">
                                <button>
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </ul>
                        </>
                    )
                        :
                        isCarousel ? (
                            <ul className="flex text-orange-300">
                                <li>
                                    <Link
                                        activeClass="Home"
                                        to="today"
                                        smooth={true}
                                        offset={50}
                                        duration={500}
                                        onClick={() => swiper?.slidePrev()}
                                        className="cursor-pointer flex items-center gap-1 font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        <MoveLeft className="w-[15px] h-[15px]" />
                                        Trước
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        activeClass="Home"
                                        to="today"
                                        smooth={true}
                                        offset={50}
                                        duration={500}
                                        onClick={() => swiper?.slideNext()}
                                        className="cursor-pointer flex items-center gap-1 font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        Sau
                                        <MoveRight className="w-[15px] h-[15px]" />
                                    </Link>
                                </li>
                            </ul>
                        )
                            :
                            (
                                <Link
                                    activeClass="SeeMore"
                                    to="today"
                                    smooth={true}
                                    offset={50}
                                    duration={500}
                                    onClick={() => swiper?.slideNext()}
                                    className="cursor-pointer text-orange-300 flex items-center gap-1 font-normal text-md px-3 hover:text-main transition-all duration-500"
                                >
                                    Xem thêm
                                </Link>
                            )
                }
            </div>

            {
                isCarousel ?
                    (
                        <Swiper
                            spaceBetween={30}
                            grabCursor={true}
                            breakpoints={{
                                960: {
                                    slidesPerView: 5,
                                    spaceBetween: 8
                                },
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 16
                                },
                            }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => setSwiper(swiper)}
                            enabled
                            modules={[Navigation]}
                            loop
                            className="rounded-lg"
                            
                        >
                            {
                                props.novels && props.novels.length > 0 &&
                                props.novels.map((novel, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='md:w-fit mt-[20px]' onClick={() => window.location.href = "/novel/1"}>
                                            <div className='w-full md:w-[250px]'>
                                                <Image
                                                    src={novel.img}
                                                    alt={novel.img_des || ""}
                                                    className='h-auto md:h-[350px] w-[180px] md:w-[250px] md:max-sm:w-[350px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                                                    loading='lazy'
                                                />
                                                <section className='flex items-start md:items-center justify-between mt-3'>
                                                    <div className='block'>
                                                        <h1 className='text-sm text-white font-semibold tracking-tight'>
                                                            {novel.title}
                                                        </h1>
                                                        <p className='text-sm flex items-center gap-3 text-slate-400 font-normal mt-1'>
                                                            <span className="flex items-center gap-1">
                                                                <Star
                                                                    className='text-orange-600 w-[15px]'
                                                                />
                                                                {novel.review_score}
                                                            </span>
                                                            <span>|</span>
                                                            <span> {novel.published_year}</span>
                                                        </p>
                                                    </div>
                                                    <button className='md:px-3 md:py-2 text-blue-500 rounded-full hover:text-blue-400'>
                                                        <Bookmark className='hidden md:block md:w-8 text-blue-300 cursor-pointer' />
                                                    </button>
                                                </section>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
                    :
                    (
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5 pt-4 md:pt-8">
                            {
                                props.novels && props.novels.length > 0 &&
                                props.novels.map((novel, index) => (
                                    <div className='w-full md:w-fit mt-[10px] md:mt-[20px]' key={index} onClick={() => window.location.href = `/novel/${novel.novelID}`}>
                                        <div className='w-full md:w-[250px]'>
                                            <img
                                                src={novel?.coverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                                alt={novel.img_des || ""}
                                                className='h-auto md:h-[350px] w-[80px] md:w-[250px] max-sm:w-[350px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                                                loading='lazy'
                                            />
                                            <section className='flex gap-0.5 md:gap-0 items-start md:items-center justify-between mt-3'>
                                                <div className='block overflow-hidden md:overflowauto'>
                                                    <h1 className='text-sm md:text-md text-white font-semibold truncate md:whitespace-normal md:text-clip'>
                                                        {novel.title}
                                                    </h1>
                                                    <p className='text-sm flex items-center gap-3 text-slate-400 font-normal mt-1'>
                                                        <span className="flex items-center gap-1">
                                                            <Star
                                                                className='text-orange-600 w-[15px]'
                                                            />
                                                            {novel.review_score}
                                                        </span>
                                                        <span>|</span>
                                                        <span> {novel.published_year}</span>
                                                    </p>
                                                </div>
                                                <button className='md:px-3 md:py-2 text-blue-500 rounded-full hover:text-blue-400'>
                                                    <Bookmark
                                                        className='hidden md:block md:w-8 text-blue-300 cursor-pointer'
                                                    />
                                                </button>
                                            </section>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}