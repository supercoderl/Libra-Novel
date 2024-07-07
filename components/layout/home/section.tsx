import { HomeSectionProps } from "@/types";
import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
SwiperCore.use([Pagination]);

export default function Section(props: HomeSectionProps) {
    const { isCarousel = false, isCategory = false, overrideClass = null, isMore = true } = props;
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
                                                href="#"
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
                                    <Button
                                        onClick={() => swiper?.slidePrev()}
                                        className="flex items-center text-orange-300 gap-1 bg-transparent hover:bg-transparent font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        <MoveLeft className="w-[15px] h-[15px]" />
                                        Trước
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        onClick={() => swiper?.slideNext()}
                                        className="flex items-center text-orange-300 gap-1 bg-transparent hover:bg-transparent font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        Sau
                                        <MoveRight className="w-[15px] h-[15px]" />
                                    </Button>
                                </li>
                            </ul>
                        )
                            :
                            isMore ?
                                (
                                    <Link
                                        href={{ pathname: `/genre/-1`, query: { name: "Tất cả" } }}
                                        className="cursor-pointer text-orange-300 flex items-center gap-1 font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        Xem thêm
                                    </Link>
                                )
                                :
                                null
                }
            </div>

            {props.loading ?
                <div className="w-full py-10">
                    <Spinner className="w-12 h-12 m-auto" />
                </div>
                :
                props.novels && props.novels.length <= 0 && <p className="text-white text-center">Không có dữ liệu</p>
            }

            {
                isCarousel ?
                    (
                        <Swiper
                            spaceBetween={20}
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
                            onSwiper={(swiper) => setSwiper(swiper)}
                            enabled
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay]}
                            loop
                            className="rounded-lg"
                        >
                            {
                                props.novels && props.novels.length > 0 &&
                                props.novels.map((novel, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='w-full mt-[20px]' onClick={() => window.location.href = `/novel/${novel.novelID}`}>
                                            <div className='w-full'>
                                                <div className="h-[250px] md:h-[350px] w-full overflow-hidden">
                                                    <img
                                                        src={novel.coverImage || process.env.NEXT_PUBLIC_DUMMY_IMAGE}
                                                        alt={novel.img_des || ""}
                                                        className='w-full h-full object-cover bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                                                        loading='lazy'
                                                    />
                                                </div>
                                                <section className='flex items-start md:items-center justify-between mt-3'>
                                                    <div className='block'>
                                                        <h1 className='text-sm text-white font-semibold tracking-tight'>
                                                            {novel.title}
                                                        </h1>
                                                    </div>
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
                                    <div className='w-full mt-[10px] md:mt-[20px]' key={index} onClick={() => window.location.href = `/novel/${novel.novelID}`}>
                                        <div className='w-full'>
                                            <div className="h-[150px] md:h-[350px] w-full overflow-hidden">
                                                <img
                                                    src={novel?.coverImage || process.env.NEXT_PUBLIC_DUMMY_IMAGE}
                                                    alt={novel.img_des || ""}
                                                    className='h-full w-full bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50 object-cover'
                                                    loading='lazy'
                                                />
                                            </div>
                                            <section className='flex gap-0.5 md:gap-0 items-start md:items-center justify-between mt-3'>
                                                <div className='block overflow-hidden md:overflowauto'>
                                                    <h1 className='text-sm md:text-md text-white font-semibold truncate md:whitespace-normal md:text-clip'>
                                                        {novel.title}
                                                    </h1>
                                                </div>
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