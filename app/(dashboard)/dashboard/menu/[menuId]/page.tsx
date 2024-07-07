"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { MenuForm } from '@/components/forms/menu-form';

export default function Page() {
    const searchParams = useSearchParams()
    const menuID = searchParams.get("menuID");
    const [menu, setMenu] = useState(null);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (menuID) {
            onLoadData();
        }
    }, []);

    //Loading single menu
    const onLoadData = async () => {
        await axios.get(`/get-menu-by-id/${menuID}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setMenu(data.data);
            }
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Menu', link: '/dashboard/menu' },
        { title: menuID ? 'Chỉnh sửa' : 'Tạo mới', link: menuID ? `/dashboard/menu/edit?menuID=${menu}` : '/dashboard/menu/create' },
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <MenuForm initialData={menu} />
            </div>
        </ScrollArea>
    );
}