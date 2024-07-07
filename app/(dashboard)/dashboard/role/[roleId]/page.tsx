"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { RoleForm } from '@/components/forms/role-form';

export default function Page() {
    const searchParams = useSearchParams()
    const roleID = searchParams.get("roleID");
    const [role, setRole] = useState(null);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (roleID) {
            onLoadData();
        }
    }, []);

    //Load single role
    const onLoadData = async () => {
        await axios.get(`/get-role-by-id/${roleID}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setRole(data.data);
            }
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Quyền', link: '/dashboard/role' },
        { title: roleID ? 'Chỉnh sửa' : 'Tạo mới', link: roleID ? `/dashboard/role/edit?roleID=${roleID}` : '/dashboard/role/create' },
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <RoleForm initialData={role} />
            </div>
        </ScrollArea>
    );
}