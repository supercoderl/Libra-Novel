"use client";

import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import useAxios from '@/hooks/useAxios';
import { Role } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const searchParams = useSearchParams()
    const userID = searchParams.get("userID");
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const axios = useAxios();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userID) {
            onLoadData();
        }
        onLoadRoles();
    }, []);

    //Load single user
    const onLoadData = async () => {
        await axios.get(`/get-user-by-id-or-code`, {
            params: { userID }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) setUser(data.data);
        }).finally(() => setLoading(false));
    }

    //Load role list
    const onLoadRoles = async () => {
        await axios.get(`/get-all-roles`).then(({ data }) => {
            if (data && data.succeeded && data.data) setRoles(data.data.items);
        }).finally(() => setLoading(false));
    }

    const breadcrumbItems = [
        { title: 'Người dùng', link: '/dashboard/user' },
        { title: userID ? 'Chỉnh sửa' : 'Tạo mới', link: userID ? `/dashboard/user/edit?id=${userID}` : '/dashboard/user/create' },
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <UserForm
                    roles={roles.length > 0 ? roles.map((role) => ({ value: String(role.roleID), label: role.name })) : []}
                    initialData={user}
                />
            </div>
        </ScrollArea>
    );
}