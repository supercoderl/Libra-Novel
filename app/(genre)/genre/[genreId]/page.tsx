"use client"

import { fetchAllNovels } from "@/app/actions/libraryActions";
import BreadCrumb from "@/components/breadcrumb";
import Section from "@/components/layout/home/section";
import MainLayout from "@/components/layout/main-layout";
import { Pagination } from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { calculateTotalPages, randomBanner } from "@/utils/array";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GenrePage = () => {
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNext, setNext] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const { genreId } = useParams();
    const param = useSearchParams();
    const [pos, setPos] = useState(1);

    const breadcrumbItems = [
        { title: String(param.get("name") || ""), link: `/genre/${genreId}` }
    ];

    //Load novel list
    const onLoadData = async () => {
        await fetchAllNovels(pos, 20, Number(genreId)).then((value) => {
            if (value && value.succeeded) {
                setNovels(value.data.items);
                setNext(value.data.next);
                setPrevious(value.data.previous);
                setTotalPage(value.data.totalPagesCount);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    useEffect(() => {
        if (genreId) onLoadData();
    }, [pos]);

    return (
        <MainLayout>
            <BreadCrumb items={breadcrumbItems} isDashboard={false} className="text-white" />
            <div className="relative h-96 overflow-hidden rounded-sm">
                <Image className="w-full object-cover blur-[1px] brightness-50" src={randomBanner()} alt="" />
                <h1 className="absolute text-white z-10 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-3xl">{param.get("name")}</h1>
            </div>
            {
                loading ?
                    <Spinner className="w-12 h-12 m-auto my-8" />
                    :
                    <>
                        <Section
                            isMore={false}
                            title=""
                            novels={novels}
                            overrideClass="my-8 md:my-16"
                        />
                        <Pagination 
                            pos={pos}
                            setPos={setPos}
                            isNext={isNext}
                            isPrevious={isPrevious}
                            pagesShow={totalPage}
                        />
                    </>
            }
        </MainLayout>
    )
}

export default GenrePage;