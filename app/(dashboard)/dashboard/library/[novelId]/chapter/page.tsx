'use client'

import BreadCrumb from "@/components/breadcrumb";
import ChapterGrid from "@/components/grids/chapter-grids/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAxios from "@/hooks/useAxios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterList() {
    const { novelId } = useParams();
    const [chapters, setChapters] = useState([]);
    const axios = useAxios();


    //Load chapter list
    const onLoadData = async () => {
        await axios.get(`/get-chapters/${Number(novelId)}`, {
            params: {
                pageIndex: 1,
                pageSize: 10
            }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setChapters(data.data.items);
            }
        });
    };

    useEffect(() => {
        if (novelId) {
            onLoadData();
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
                <ChapterGrid novelID={Number(novelId || 0)} chapters={chapters} />
            </div>
        </ScrollArea>
    )
}