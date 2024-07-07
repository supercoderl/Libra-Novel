import starNew from "@/public/assets/images/star-new.png";
import Image from 'next/image';
import { Eye, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { heros, heros_list } from "@/constants/hero";
import { Novel } from "@/types";

SwiperCore.use([Pagination]);

const Hero: React.FC<{ novels: Novel[] }> = ({ novels }) => {
    return (
        <div className="pt-10 md:grid md:auto-rows-fr md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
                <div className="flex gap-2 mb-5">
                    <Image className="w-6" src={starNew} alt="" />
                    <h5 className="text-white text-lg">Mới nhất</h5>
                </div>
                <div className="h-2/5 md:h-full rounded-lg shadow-[rgba(0,_0,_0,_0.8)_4px_4px_4px] shadow-[rgba(255,_255,_255,_0.4)]">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSwiper={(swiper) => console.log(swiper)}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-yellow-400',
                        }}
                        enabled
                        // autoplay={{
                        //     delay: 2000,
                        //     disableOnInteraction: false,
                        // }}
                        modules={[Autoplay, Pagination, Navigation]}
                        loop
                        className="rounded-lg h-full"
                    >
                        {
                            heros.map((hero, index) => (
                                <SwiperSlide key={index}>
                                    <div className="h-full relative rounded-lg">
                                        <Image className="h-full brightness-50 rounded-lg" src={hero.img} alt={hero.img_des} />
                                        <div className="absolute text-white bottom-0 left-0 p-4 md:p-12 w-max">
                                            <div className="w-full max-w-[250px] md:max-w-[450px] flex flex-col gap-1 md:gap-3">
                                                <h3 className="text-md md:text-4xl font-semibold">{hero.title}</h3>
                                                <p className="font-medium text-xs md:text-md">Chương {hero.chap_num} - {hero.chap_num}</p>
                                                <div className="flex font-semibold text-sm text-black uppercase gap-2">
                                                    {
                                                        hero.types.length > 0 && hero.types.map((type, index) => (
                                                            <span key={index} className="bg-violet-300 py-0 md:py-1 px-1 md:px-2 rounded-sm text-[10px] md:text-xs md:text-md">{type}</span>
                                                        ))
                                                    }
                                                </div>
                                                <p className="break-words text-xs md:text-sm line-clamp-2 md:line-clamp-3">{hero.des}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <div className="mt-10 md:mt-0">
                <div className="flex gap-2 mb-5">
                    <Image className="w-6" src={starNew} alt="" />
                    <h5 className="text-white text-lg">Đọc nhiều</h5>
                </div>
                <div className="bg-trending text-white rounded-lg px-4 py-6 flex flex-col justify-between h-full gap-2 md:gap-0 shadow-[rgba(0,_0,_0,_0.8)_4px_4px_4px] shadow-[rgba(255,_255,_255,_0.4)]">
                    {
                        novels && novels.length > 0 ?
                            novels.sort((a, b) => b.viewCount - a.viewCount).slice(0, 6).map((novel, index) => (
                                <div
                                    className="flex items-center jusity-center gap-4 cursor-pointer"
                                    key={index}
                                    onClick={() => window.location.href = `/novel/${novel.novelID}`}
                                >
                                    <h3 className="md:text-xl text-medium">0{index + 1}</h3>
                                    <img className="w-9" src={novel.coverImage || process.env.NEXT_PUBLIC_DUMMY_IMAGE} alt={novel.img_des || ""} />
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <p className="font-medium md:text-lg truncate">{novel.title}</p>
                                        <div className="flex gap-3">
                                            <span className="flex gap-2 text-xs md:text-sm items-center">
                                                <Eye className="w-4 md:w-5" />
                                                {novel.viewCount}.{novel.viewCount}
                                            </span>
                                            <span className="flex gap-2 text-xs md:text-sm items-center">
                                                <Heart className="w-4 md:w-5" />
                                                {novel.favoriteCount}.{novel.favoriteCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <p className="text-center">Dữ liệu rỗng</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Hero;