'use client';

import { fetchAllNovels } from '@/app/actions/libraryActions';
import BreadCrumb from '@/components/breadcrumb';
import { NovelClient } from '@/components/tables/library-tables/client';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Thư viện', link: '/dashboard/library' }];
export default function page() {
    const [novels, setNovels] = useState([]);

    const onLoadData = async () => {
        fetchAllNovels().then((value) => {
            if (value && value.succeeded && value.data) {
                setNovels(value.data.items);
            }
        });
    };

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} isDashboard/>
                <NovelClient data={novels} />
            </div>
        </>
    );
}