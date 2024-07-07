"use client"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Hero from "@/components/layout/home/hero";
import Section from "@/components/layout/home/section";
import MainLayout from "@/components/layout/main-layout";
import { useEffect, useState } from "react";
import { fetchAllNovels } from "./actions/libraryActions";
import { Novel } from "@/types";
import { shuffleArray, weeks } from "@/utils/array";

export default function Page() {

    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);

    //Load novel list
    const onLoadData = async () => {
        await fetchAllNovels(1, 20).then((value) => {
            if (value && value.succeeded && value.data) {
                setNovels(value.data.items);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <MainLayout>
            <Hero novels={novels} loading={loading} />

            <Section
                isCategory
                title="Top 5 hằng tuần"
                categories={weeks()}
                loading={loading}
                novels={shuffleArray(novels).slice(0, 5)}
                overrideClass="mt-10 md:mt-28 mb-8 md:mb-16"
            />

            <Section
                isCarousel={true}
                title="Được yêu thích"
                loading={loading}
                novels={novels.sort((a: Novel, b: Novel) => b.favoriteCount - a.favoriteCount).slice(0, 8)}
                overrideClass="my-8 md:my-16"
            />

            <Section
                title="Phát hành gần nhất"
                loading={loading}
                novels={shuffleArray(novels).slice(0, 15)}
                overrideClass="my-8 md:my-16"
            />
        </MainLayout>
    );
}