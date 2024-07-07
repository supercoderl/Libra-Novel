"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GenreForm } from '@/components/forms/genre-form';
import useAxios from '@/hooks/useAxios';

export default function Page() {
    const searchParams = useSearchParams()
    const genreID = searchParams.get("genreID");
    const [genre, setGenre] = useState(null);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (genreID) {
            onLoadData();
        }
    }, []);

    //Load single genre
    const onLoadData = async () => {
        await axios.get(`/get-genre-by-id/${Number(genreID)}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setGenre(data.data);
            }
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Thể loại', link: '/dashboard/genre' },
        { title: genreID ? 'Chỉnh sửa' : 'Tạo mới', link: genreID ? `/dashboard/genre/edit?id=${genreID}` : '/dashboard/genre/create' },
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <GenreForm initialData={genre} />
            </div>
        </ScrollArea>
    );
}