"use client"

import { fetchNovelByID } from "@/app/actions/libraryActions";
import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import CommentSection from "@/components/layout/novel/comment";
import NovelInfo from "@/components/layout/novel/novel-info";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const breadcrumbItems = [
    { title: 'Truyện', link: '/novel' },
    { title: '1', link: '/novel/1' }
];

export default function NovelPlayGround() {
    const { novelId } = useParams();
    const [novel, setNovel] = useState(null);

    const onLoadData = async (id: number) => {
        await fetchNovelByID(id).then((value) => {
            if (value && value.succeeded && value.data) {
                setNovel(value.data);
            }
        });
    }

    useEffect(() => {
        if (novelId) {
            onLoadData(Number(novelId || 0));
        }
    }, []);

    return (
        <MainLayout>
            <BreadCrumb items={breadcrumbItems} isDashboard={false} className="text-white" />

            <NovelInfo novel={novel} />

            <img className="mt-10" src="https://4kwallpapers.com/images/wallpapers/anime-girl-3840x1080-10022.jpg" alt="" />

            <CommentSection />

        </MainLayout>
    )
}