"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchGenreByID } from '@/app/actions/genreActions';
import { GenreForm } from '@/components/forms/genre-form';

export default function Page() {
    const searchParams = useSearchParams()
    const genreID = searchParams.get("genreID");
    const [genre, setGenre] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (genreID) {
            const response = fetchGenreByID(Number(genreID));
            if (response) {
                response.then((value) => {
                    if (value && value.succeeded) {
                        setGenre(value.data);
                    }
                }).finally(() => setLoading(false));
            }
        }
    }, []);

    const breadcrumbItems = [
        { title: 'Thể loại', link: '/dashboard/genre' },
        { title: 'Tạo mới', link: '/dashboard/genre/create' },
        { title: 'Chỉnh sửa', link: `/dashboard/genre/edit?id=${genreID}` }
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