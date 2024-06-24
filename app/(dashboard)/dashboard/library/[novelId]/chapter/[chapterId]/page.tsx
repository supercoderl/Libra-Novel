'use client'

import { fetchChapterByID } from "@/app/actions/chapterActions";
import BreadCrumb from "@/components/breadcrumb";
import { ChapterForm } from "@/components/forms/chapter-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chapter() {
    const searchParams = useSearchParams();
    const chapterID = searchParams.get("chapterID");
    const { novelId } = useParams();

    const [chapter, setChapter] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chapterID) {
            const response = fetchChapterByID(Number(chapterID));
            if (response) {
                response.then((value) => {
                   
                    if (value && value.succeeded) {
                        const newData = {
                            ...value.data,
                            chapterNumber: String(value.data.chapterNumber)
                        };
                        setChapter(newData);
                    }
                }).finally(() => setLoading(false));
            }
        }
    }, []);

    const breadcrumbItems = [
        { title: 'Thư viện', link: '/dashboard/library' },
        // { title: 'Chỉnh sửa', link: `/dashboard/library/edit?id=${novelID}` },
        { title: 'Chương', link: '/dashboard/library/1/chapter' },
        { title: 'Tạo mới', link: '/dashboard/library/1/chapter' },
        { title: 'Chỉnh sửa', link: `/dashboard/library/1/chapter/edit?id=${chapterID}` }
    ];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <ChapterForm initialData={chapter} novelID={Number(novelId || 0)}/>
            </div>
        </ScrollArea>
    )
}