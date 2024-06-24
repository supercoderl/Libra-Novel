import { Button } from "@/components/ui/button";
import { Camera, Clipboard } from "lucide-react";
import React from "react";

export interface QuickInfo {
    avatar?: string,
    fullname?: string,
    roles?: number[] | null,
    url?: string | null,
    read?: number,
    bookmarked?: number,
    favorites?: number
}

const QuickInformation: React.FC<QuickInfo> = ({
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fYLiizEidYt6bCvSqYFVjwWouiooyxb_Kg&s",
    fullname,
    roles,
    url,
    read = 0,
    bookmarked = 0,
    favorites = 0
}) => {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="rounded-full relative w-28 h-28">
                    <img className="absolute object-cover h-full w-full rounded-full overflow-hidden" src={avatar} alt="avatar" />
                    <div className="absolute border-4 border-white bottom-0 right-0 bg-blue-500 w-fit p-1 rounded-full">
                        <Camera className="text-white w-4 h-4 cursor-pointer" />
                    </div>
                </div>
                <div className="text-center w-full">
                    <h3 className="text-2xl font-semibold">{fullname}</h3>
                    <p className="text-sm text-trending">
                        {roles && roles.length > 0 && roles.map((item) => (
                            item === 100 ? "Administrator" : item === 200 ? "Manager" : "Guest"
                        ))}
                    </p>
                </div>
            </div>

            <div className="my-5">
                <div className="flex justify-between items-center border-t-2 w-full py-3 px-4">
                    <p>Truyện đã xem</p>
                    <span>{read}</span>
                </div>
                <div className="flex justify-between items-center border-y-2 w-full py-3 px-4">
                    <p>Truyện đã lưu</p>
                    <span>{bookmarked}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 w-full py-3 px-4">
                    <p>Truyện yêu thích</p>
                    <span>{favorites}</span>
                </div>
            </div>

            <div className="px-5">
                <Button className="mb-3 w-full">Xem chi tiết</Button>
                <div className="border-2 rounded-sm flex items-center justify-between">
                    <p className="text-blue-500 text-sm p-1.5 px-5">{url}</p>
                    <Clipboard className="w-8 p-1 m-l-2 border-l-2" />
                </div>
            </div>
        </>
    )
}

export default QuickInformation;