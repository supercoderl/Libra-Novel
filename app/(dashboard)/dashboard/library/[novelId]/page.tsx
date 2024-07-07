"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { NovelForm } from '@/components/forms/library-form';
import useAxios from '@/hooks/useAxios';

export default function Page() {
    const searchParams = useSearchParams()
    const novelID = searchParams.get("novelID");
    const [novel, setNovel] = useState(null);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (novelID) {
            onLoadData();
        }
    }, []);

    //Load single novel
    const onLoadData = async () => {
        await axios.get(`/get-novel-by-id/${novelID}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                const newData = {
                    ...data.data,
                    totalPages: String(data.data.totalPages)
                };
                setNovel(newData);
            }
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Thư viện', link: '/dashboard/library' },
        { title: novelID ? 'Chỉnh sửa' : 'Tạo mới', link: novelID ? `/dashboard/library/edit?id=${novelID}` : '/dashboard/library/create' },
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <NovelForm initialData={novel} />
            </div>
        </ScrollArea>
    );
}