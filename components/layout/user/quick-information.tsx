import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useAxios from "@/hooks/useAxios";
import { Camera, Clipboard, ClipboardCheck } from "lucide-react";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface QuickInfo {
    userID: string,
    avatar?: string,
    fullname?: string,
    roles?: number[] | null,
    url?: string | null,
    read?: number,
    bookmarked?: number,
    favorites?: number,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const QuickInformation: React.FC<QuickInfo> = ({
    userID,
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fYLiizEidYt6bCvSqYFVjwWouiooyxb_Kg&s",
    fullname,
    roles,
    url,
    read = 0,
    bookmarked = 0,
    favorites = 0,
    loading,
    setLoading
}) => {
    const avatarRef = useRef<HTMLInputElement>(null);
    const [avatarURL, setAvatarURL] = useState("");
    const [isInClipboard, setTextToClipboard] = useState(false);
    const axios = useAxios();

    const handleDivClick = () => {
        if (avatarRef.current) {
            avatarRef?.current?.click();
        }
    };

    //Copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setTextToClipboard(true);
        }).catch(err => {
            console.log('Failed to copy text: ', err);
        });
    };

    //Upload avatar
    const onUploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            await axios.post(`/change-avatar/${userID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(({ data }) => {
                if (data && data.succeeded) {
                    setAvatarURL(data.data);
                }
            }).finally(() => setTimeout(() => setLoading(false), 300));
        }
        else {
            setLoading(false);
        }
    }

    useEffect(() => {
        setAvatarURL(avatar);
    }, [avatar]);

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="rounded-full relative w-28 h-28 border-2 flex items-center jusitfy-center">
                    {
                        loading ?
                            <Spinner className="w-8 h-8 m-auto" />
                            :
                            <img className="absolute object-cover h-full w-full rounded-full overflow-hidden" src={avatarURL} alt="avatar" />
                    }
                    <div className="absolute border-4 border-white bottom-0 right-0 bg-blue-500 w-fit p-1 rounded-full">
                        <Camera className="text-white w-4 h-4 cursor-pointer" onClick={handleDivClick} />
                        <input
                            type="file"
                            ref={avatarRef}
                            id="avatarFileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={onUploadAvatar}
                        />
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
                <Button className="mb-3 w-full" disabled={loading}>Xem chi tiết</Button>
                <div className="border-2 rounded-sm flex items-center justify-between">
                    <p className="text-blue-500 text-sm p-1.5 px-5">{url}</p>
                    {
                        isInClipboard
                            ?
                            <ClipboardCheck
                                className="cursor-pointer w-8 p-1 m-l-2 border-l-2"
                                onClick={() => copyToClipboard(`https://${url}`)}
                            />
                            :
                            <Clipboard
                                className="cursor-pointer w-8 p-1 m-l-2 border-l-2"
                                onClick={() => copyToClipboard(`https://${url}`)}
                            />
                    }
                </div>
            </div>
        </>
    )
}

export default QuickInformation;