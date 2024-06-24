'use client';

import { fetchAllGenres } from '@/app/actions/genreActions';
import BreadCrumb from '@/components/breadcrumb';
import { GenreClient } from '@/components/tables/genre-tables/client';
import { NovelClient } from '@/components/tables/library-tables/client';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Thể loại', link: '/dashboard/genre' }];
export default function page() {
    const [genres, setGenres] = useState([]);

    const onLoadData = async () => {
        fetchAllGenres().then((value) => {
            if (value && value.succeeded && value.data) {
                setGenres(value.data.items);
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
                <GenreClient data={genres} />
            </div>
        </>
    );
}