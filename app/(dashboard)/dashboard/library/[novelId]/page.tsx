"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchNovelByID } from '@/app/actions/libraryActions';
import { NovelForm } from '@/components/forms/library-form';

export default function Page() {
    const searchParams = useSearchParams()
    const novelID = searchParams.get("novelID");
    const [novel, setNovel] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (novelID) {
            const response = fetchNovelByID(Number(novelID));
            if (response) {
                response.then((value) => {
                    if (value && value.succeeded) {
                        const newData = {
                            ...value.data,
                            totalPages: String(value.data.totalPages)
                        };
                        setNovel(newData);
                    }
                }).finally(() => setLoading(false));
            }
        }
    }, []);

    const breadcrumbItems = [
        { title: 'Thư viện', link: '/dashboard/library' },
        { title: 'Tạo mới', link: '/dashboard/library/create' },
        { title: 'Chỉnh sửa', link: `/dashboard/library/edit?id=${novelID}` }
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