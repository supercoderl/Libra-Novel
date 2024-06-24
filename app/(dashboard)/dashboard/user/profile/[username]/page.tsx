'use client'

import { fetchProfile } from "@/app/actions/userActions";
import { ProfileForm } from "@/components/forms/profile-form";
import QuickInformation from "@/components/layout/user/quick-information";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types";
import { ImagePlay } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {
    const [user, setUser] = useState<User | null>(null);

    const onLoadData = async () => {
        await fetchProfile().then((value) => {
            console.log(value);
            if (value && value.succeeded && value.data) {
                setUser(value.data);
            }
        });
    }

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <ScrollArea>
            <div className="flex-1 p-4 pt-6 md:p-6">
                <div className="cover bg-red-500 px-2 py-4 h-48 flex flex-end rounded-md">
                    <Button className="ml-auto flex items-center gap-1 bg-transparent shadow-[1px_1px_4px_1px_#718096] hover:bg-main">
                        <ImagePlay className="w-5" />
                        <span>Đổi ảnh bìa</span>
                    </Button>
                </div>
                <div className="mx-5 -translate-y-[10%]">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="h-fit bg-white rounded-md py-5 border-2 border-border">
                            <QuickInformation 
                                fullname={user?.lastName + " " + user?.firstName}
                                roles={[100]}
                                url="https://libra-novel/profile/timcook"
                            />
                        </div>
                        <div className="col-span-2 bg-white border-2 border-border rounded-sm">
                            <div className="tabs">
                                <div className="border-b-2 border-border pt-5 px-6">
                                    <div className="flex gap-4">
                                        <a href="#" className='border-b-2 pb-3 border-blue-500'>
                                            Trang cá nhân
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ProfileForm initialData={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}