"use client"

import { fetchChapterByID } from "@/app/actions/chapterActions";
import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import CommentSection from "@/components/layout/novel/comment";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Spinner from "@/components/ui/spinner";
import { Chapter } from "@/types";
import { ArrowLeft, ArrowRight, DoorOpen } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chapter() {
    const { chapterId, novelId } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);

    const breadcrumbItems = [
        { title: 'Truyện', link: '/novel' },
        { title: String(novelId), link: `/novel/${novelId}` },
        { title: 'Chương', link: `/novel/${novelId}/chapter` },
        { title: String(chapterId), link: `/novel/${novelId}/chapter/${chapterId}` }
    ];

    //Load chapter list by novel
    const onLoadData = async (id: number) => {
        await fetchChapterByID(id).then((value) => {
            if (value && value.succeeded && value.data) {
                setChapter(value.data);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    useEffect(() => {
        if (chapterId) {
            onLoadData(Number(chapterId || 0));
        }
    }, []);

    return (
        <MainLayout>
            <BreadCrumb items={breadcrumbItems} isDashboard={false} className="text-white" />

            <div className="md:px-24">
                <div className="p-6 text-white text-center border border-dashed	flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">{chapter?.novelTitle || "Truyện ngắn"}</h3>
                    <p className="text-lg text-description">Chương {chapter?.chapterNumber}: {chapter?.title}</p>
                    <span className="text-sm font-light"><b>Tác giả:</b> Cập nhật sau</span>
                </div>

                <div className="flex items-center justify-center gap-3 py-8">
                    <Button className="bg-main flex items-center gap-1 text-brown hover:text-white w-24">
                        <ArrowLeft className="w-3" />
                        Trước
                    </Button>
                    <div className="text-white md:w-1/6">
                        <Select
                            onValueChange={(e) => console.log("selected: ")}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    defaultValue={"0"}
                                    placeholder="Chọn chương"
                                    className="text-white"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {/* @ts-ignore  */}
                                <SelectItem value={"1"}>
                                    Chương 1
                                </SelectItem>
                                <SelectItem value={"2"}>
                                    Chương 2
                                </SelectItem>
                                <SelectItem value={"3"}>
                                    Chương 3
                                </SelectItem>
                                <SelectItem value={"4"}>
                                    Chương 4
                                </SelectItem>
                                <SelectItem value={"5"}>
                                    Chương 5
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="bg-main text-brown flex items-center gap-1 hover:text-white w-24">
                        Sau
                        <ArrowRight className="w-3" />
                    </Button>
                </div>

                <div className="">
                    {
                        loading &&
                        <Spinner className="w-12 h-12 m-auto" />
                    }
                    {chapter && (
                        <div className="content" dangerouslySetInnerHTML={{ __html: chapter.content }} />
                    )}
                </div>

                <div className="flex items-center justify-center gap-3 py-8">
                    <Button className="bg-main flex items-center gap-1 text-brown hover:text-white w-24">
                        <ArrowLeft className="w-3" />
                        Trước
                    </Button>
                    <Button className="bg-main flex items-center gap-1 text-brown hover:text-white"
                        onClick={() => window.location.href = "/"}
                    >
                        <DoorOpen className="w-4" />
                        Trang chủ
                    </Button>
                    <Button className="bg-main text-brown flex items-center gap-1 hover:text-white w-24">
                        Sau
                        <ArrowRight className="w-3" />
                    </Button>
                </div>

                <CommentSection />
            </div>
        </MainLayout>
    )
}