'use client'

import BreadCrumb from "@/components/breadcrumb";
import { ChapterForm } from "@/components/forms/chapter-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAxios from "@/hooks/useAxios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chapter() {
    const searchParams = useSearchParams();
    const chapterID = searchParams.get("chapterID");
    const { novelId } = useParams();
    const axios = useAxios();

    const [chapter, setChapter] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chapterID) {
            onLoadData();
        }
    }, []);

    //Load single chapter
    const onLoadData = async () => {
        await axios.get(`/get-chapter-by-id/${Number(chapterID)}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                const newData = {
                    ...data.data,
                    chapterNumber: String(data.data.chapterNumber)
                };
                setChapter(newData);
            }
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Thư viện', link: '/dashboard/library' },
        { title: String(novelId || ""), link: `/dashboard/library/edit?id=${novelId}` },
        { title: 'Chương', link: '/dashboard/library/1/chapter' },
        { title: chapterID ? 'Chỉnh sửa' : 'Tạo mới', link: chapterID ? `/dashboard/library/1/chapter/edit?id=${chapterID}` : '/dashboard/library/1/chapter' },
    ];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <ChapterForm initialData={chapter} novelID={Number(novelId || 0)} />
            </div>
        </ScrollArea>
    )
}