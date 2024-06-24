"use client"

import jujutsu from "@/public/assets/images/manga/jujutsu.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Hero from "@/components/layout/home/hero";
import Section from "@/components/layout/home/section";
import MainLayout from "@/components/layout/main-layout";
import { useEffect, useState } from "react";
import { fetchAllNovels } from "./actions/libraryActions";

export default function page() {

    const [novels, setNovels] = useState([]);

    const onLoadData = async () => {
        await fetchAllNovels().then((value) => {
            if (value && value.succeeded && value.data) {
                setNovels(value.data.items);
            }
        });
    }

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <MainLayout>
            <Hero />

            <Section
                isCategory
                title="Top 5 hằng tuần"
                categories={["Today", "Yesterday", "Sun", "Sat", "Fri", "Thur", "Wed"]}
                novels={novels}
                overrideClass="mt-10 md:mt-28 mb-8 md:mb-16"
            />

            <Section
                isCarousel={true}
                title="Được yêu thích"
                novels={[
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    }
                ]}
                overrideClass="my-8 md:my-16"
            />

            <Section
                title="Phát hành gần nhất"
                novels={[
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    },
                    {
                        novelID: 1,
                        img: jujutsu,
                        img_des: "",
                        title: "Jujutsu Kaisen",
                        review_score: 7.9,
                        description: "",
                        published_year: 2024
                    }
                ]}
                overrideClass="my-8 md:my-16"
            />
        </MainLayout>
    );
}