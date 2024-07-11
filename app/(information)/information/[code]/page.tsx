"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import useAxios from "@/hooks/useAxios";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { dateFormatter } from "@/utils/date";
import { concatName } from "@/utils/text";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { code } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const axios = useAxios();

    useEffect(() => {
        if (!code || code === "error") {
            router.replace("/error/not-found");
        }
        else {
            onLoadUserProfile();
        }
    }, []);

    const onLoadUserProfile = async () => {
        await axios.get("/get-user-by-id-or-code", {
            params: { code }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setUser(data.data);
            }
        })
    }

    return (
        <div className='flex flex-col justify-center items-center p-7 h-screen'>
            <Link
                href="/"
                className="self-start"
            >
                <h1 className="font-bold text-xl cursor-pointer">
                    Libra<span className="text-main">Novel</span>
                </h1>
            </Link>
            <div className='text-center flex flex-col mt-10 md:mt-0'>
                <h1 className='color-[#242d3c] text-3xl mb-2 font-bold'>Thông tin cá nhân</h1>
                <p className='color-[#89919c]'><i>Các thông tin này đều được public khi được truy cập từ bất kỳ nguồn nào.</i></p>
            </div>
            <section
                className={cn(
                    "hidden md:block mx-auto my-[50px] w-[500px] h-[500px] rounded-full opacity-80 relative"
                )}>
                <img className="w-full h-full rounded-full brightness-50" src={user?.avatar || "https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg"} alt="avt" />
                <div className="absolute top-[45%] mt-[-30px] w-[80%] left-2/4 -translate-y-2/4	-translate-x-2/4">
                    <h2 className="font-bold text-3xl text-white text-center mt-[100px]">{concatName(user?.firstName, user?.lastName)}</h2>
                </div>

                <div className="flex">
                    <div className="absolute flex flex-row-reverse transition duration-1000 cursor pointer w-full select-none hover:scale-110 left-[-78%] top-[2%] items-center">
                        <div className="relative flex bg-red-300 border-4 border-white w-[80px] h-[80px] rounded-full">
                            <img className="w-12 m-auto" src="https://cdn-icons-png.flaticon.com/512/547/547590.png" alt="highquality" />
                        </div>

                        <div className="mr-4 direct-right">
                            <h3>Thông tin người dùng</h3>
                            <p className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Email: {user?.email}</span>
                                <span>Giới tính: {user?.gender}</span>
                                <span>Ngày tham gia: {dateFormatter(user?.registrationDate)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="absolute flex transition duration-1000 cursor pointer w-full select-none hover:scale-110 left-[78%] top-[2%] items-center">
                        <div className="relative flex bg-blue-300 border-4 border-white w-[80px] h-[80px] rounded-full">
                            <img className="w-12 m-auto" src="https://cdn-icons-png.flaticon.com/512/4052/4052389.png" alt="backup" />
                        </div>

                        <div className="ml-4">
                            <h3 className="text-left">Thông tin truyện</h3>
                            <p className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Truyện đã đọc: 300 truyện</span>
                                <span>Truyện yêu thích: 297 truyện</span>
                                <span>Truyện đánh dấu: 190 truyện</span>
                            </p>
                        </div>
                    </div>

                    <div className="absolute flex transition duration-1000 cursor pointer w-full select-none hover:scale-110 left-[78%] top-[75%] items-center">
                        <div className="relative flex bg-gray-300 border-4 border-white w-[80px] h-[80px] rounded-full">
                            <img className="w-12 m-auto" src="https://cdn-icons-png.flaticon.com/512/2190/2190510.png" alt="smart" />
                        </div>

                        <div className="ml-4">
                            <h3 className="text-left">Thông tin bình luận</h3>
                            <p className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Số truyện bình luận: 300 truyện</span>
                                <span>Được yêu thích: 297 bình luận</span>
                                <span>Không được yêu thích: 190 bình luận</span>
                            </p>
                        </div>
                    </div>

                    <div className="absolute flex flex-row-reverse transition duration-1000 cursor pointer w-full select-none hover:scale-110 left-[-78%]  top-[75%] items-center">
                        <div className="relative flex bg-pink-300 border-4 border-white w-[80px] h-[80px] rounded-full">
                            <img className="w-12 m-auto" src="https://cdn-icons-png.flaticon.com/128/4023/4023190.png" alt="customer" />
                        </div>

                        <div className="mr-4 direct-right">
                            <h3>Thông tin...</h3>
                            <p className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Số truyện bình luận: 300 truyện</span>
                                <span>Được yêu thích: 297 bình luận</span>
                                <span>Không được yêu thích: 190 bình luận</span>
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            <section className="md:hidden scrollbar-hidden mx-auto my-[50px] w-full overflow-auto">
                <img className="w-48 h-48 rounded-full mx-auto" src={user?.avatar || "https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg"} alt="avt" />
                <div>
                    <h2 className="font-bold text-3xl text-center mt-8">{concatName(user?.firstName, user?.lastName)}</h2>
                </div>

                <div className="flex flex-col gap-8 mt-12">
                    <div className="flex flex-start transition duration-1000 cursor pointer w-full select-none hover:scale-110 items-center">
                        <div className="direct-left w-full">
                            <div className="flex items-center gap-1 border-b-2 pb-1 w-full">
                                <img className="w-5 h-5 bg-red-300 p-1 rounded-full" src="https://cdn-icons-png.flaticon.com/512/547/547590.png" alt="highquality" />
                                <h3 className="font-semibold">Thông tin người dùng</h3>
                            </div>
                            <div className="mt-2 flex flex-col text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Email: {user?.email}</span>
                                <span>Giới tính: {user?.gender}</span>
                                <span>Ngày tham gia: {dateFormatter(user?.registrationDate)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-start transition duration-1000 cursor pointer w-full select-none hover:scale-110 items-center">
                        <div className="direct-right w-full">
                            <div className="flex items-center gap-1 border-b-2 pb-1 w-full">
                                <img className="w-5 h-5 bg-blue-300 p-1 rounded-full" src="https://cdn-icons-png.flaticon.com/512/4052/4052389.png" alt="highquality" />
                                <h3 className="font-semibold">Thông tin truyện</h3>
                            </div>
                            <div className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Truyện đã đọc: 300 truyện</span>
                                <span>Truyện yêu thích: 297 truyện</span>
                                <span>Truyện đánh dấu: 190 truyện</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-start transition duration-1000 cursor pointer w-full select-none hover:scale-110 items-center">
                        <div className="direct-left w-full">
                            <div className="flex items-center gap-1 border-b-2 pb-1 w-full">
                                <img className="w-5 h-5 bg-gray-300 p-1 rounded-full" src="https://cdn-icons-png.flaticon.com/512/2190/2190510.png" alt="highquality" />
                                <h3 className="font-semibold">Thông tin bình luận</h3>
                            </div>
                            <div className="mt-2 flex flex-col text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Số truyện bình luận: 300 truyện</span>
                                <span>Được yêu thích: 297 bình luận</span>
                                <span>Không được yêu thích: 190 bình luận</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-start transition duration-1000 cursor pointer w-full select-none hover:scale-110 items-center">
                        <div className="direct-right w-full">
                            <div className="flex items-center gap-1 border-b-2 pb-1 w-full">
                                <img className="w-5 h-5 bg-pink-300 p-1 rounded-full" src="https://cdn-icons-png.flaticon.com/128/4023/4023190.png" alt="highquality" />
                                <h3 className="font-semibold">Thông tin...</h3>
                            </div>
                            <div className="mt-2 flex flex-col max-w-[300px] text-[#979dac] font-bold leading-[1.6] text-justify text-[16px]">
                                <span>Số truyện bình luận: 300 truyện</span>
                                <span>Được yêu thích: 297 bình luận</span>
                                <span>Không được yêu thích: 190 bình luận</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}