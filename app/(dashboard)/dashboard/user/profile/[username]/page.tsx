'use client'

import { PasswordForm } from "@/components/forms/password-form";
import { ProfileForm } from "@/components/forms/profile-form";
import QuickInformation from "@/components/layout/user/quick-information";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAxios from "@/hooks/useAxios";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { concatName, encodeEmailToNumber } from "@/utils/text";
import { ImagePlay } from "lucide-react";
import { useEffect, useState } from "react";

const states = [
    'Trang cá nhân',
    'Bảo mật'
]

export default function page() {
    const [user, setUser] = useState<User | null>(null);
    const [stateChoosen, setStateChoosen] = useState(states[0]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    //Load profile identified
    const onLoadData = async () => {
        await axios.get("/get-profile").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setUser(data.data);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    //Set state switch to information or password changing
    const handleChooseState = (value: string) => {
        setStateChoosen(value);
    }

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 p-4 pt-6 md:p-6">
                <div className="cover bg-red-500 px-2 py-4 h-48 flex flex-end rounded-md">
                    <Button
                        className="ml-auto flex items-center gap-1 bg-transparent shadow-[1px_1px_4px_1px_#718096] hover:bg-main"
                        disabled={loading}
                    >
                        <ImagePlay className="w-5" />
                        <span>Đổi ảnh bìa</span>
                    </Button>
                </div>
                <div className="mx-2 md:mx-5 -translate-y-[5%] md:-translate-y-[10%]">
                    <div className="md:grid md:grid-cols-3 gap-5">
                        <div className="mb-3 md:mb-0 h-fit bg-white rounded-md py-5 border-2 border-border">
                            <QuickInformation
                                userID={user?.userID!}
                                fullname={concatName(user?.firstName, user?.lastName)}
                                roles={[100]}
                                loading={loading}
                                setLoading={setLoading}
                                avatar={user?.avatar}
                                url={`libra-novel/profile/${encodeEmailToNumber(user?.email)}`}
                            />
                        </div>
                        <div className="md:col-span-2 bg-white border-2 border-border rounded-sm">
                            <div className="tabs">
                                <div className="border-b-2 border-border pt-5 px-6">
                                    <div className="flex gap-4">
                                        {
                                            states.map((state, index) => (
                                                <p
                                                    key={index}
                                                    className={
                                                        cn(
                                                            'pb-3 border-blue-500 cursor-pointer duration-500 transition',
                                                            stateChoosen === state && 'border-b-2'
                                                        )
                                                    }
                                                    onClick={() => handleChooseState(state)}
                                                >
                                                    {state}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="p-6">
                                    {
                                        stateChoosen === "Trang cá nhân" ?
                                            <ProfileForm
                                                loading={loading}
                                                setLoading={setLoading}
                                                initialData={user} />
                                            :
                                            <PasswordForm
                                                loading={loading}
                                                setLoading={setLoading}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}