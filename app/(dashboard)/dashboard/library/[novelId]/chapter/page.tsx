'use client'

import { fetchAllChapters } from "@/app/actions/chapterActions";
import BreadCrumb from "@/components/breadcrumb";
import ChapterGrid from "@/components/grids/chapter-grids/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterList() {
    const { novelId } = useParams();
    const [chapters, setChapters] = useState([]);

    const onLoadData = async (id: number) => {
        await fetchAllChapters(1, 10, id).then((value) => {
            if (value && value.succeeded && value.data) {
                setChapters(value.data.items);
            }
        });
    };

    useEffect(() => {
        if (novelId) {
            onLoadData(Number(novelId));
        }
    }, []);

    const breadcrumbItems = [
        { title: 'Thư viện', link: '/dashboard/library' },
        { title: String(novelId || ""), link: `/dashboard/library/edit?novelID=${novelId}` },
        { title: 'Chương', link: `/dashboard/library/${novelId}/chapter` },
    ];

    return (
        <ScrollArea>
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <ChapterGrid novelID={Number(novelId || 0)} chapters={chapters}/>
            </div>
        </ScrollArea>
    )
}