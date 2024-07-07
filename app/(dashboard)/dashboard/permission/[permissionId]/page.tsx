"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { PermissionForm } from '@/components/forms/permission-forms';
import { Permission } from '@/types';

export default function Page() {
    const searchParams = useSearchParams()
    const permissionID = searchParams.get("permissionID");
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (permissionID) {
            onLoadPermissions();
        }
    }, []);

    //Loading permission list
    const onLoadPermissions = async () => {
        await axios.get("get-all-permissions", {
            params: {
                pageSize: 100
            }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setPermissions(data.data.items);
            }
        });
    }

    const breadcrumbItems = [
        { title: 'Quyền', link: '/dashboard/permission' },
        { title: permissionID ? 'Chỉnh sửa' : 'Tạo mới', link: permissionID ? `/dashboard/permission/edit?permissionID=${permissionID}` : '/dashboard/permission/create' },
    ];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <PermissionForm
                    initialData={permissions.find(p => p.permissionID === Number(permissionID))}
                    permissions={permissions}
                />
            </div>
        </ScrollArea>
    );
}