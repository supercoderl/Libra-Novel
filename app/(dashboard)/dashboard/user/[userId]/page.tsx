"use client";

import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchUserByID } from '@/app/actions/userActions';

export default function Page() {
    const searchParams = useSearchParams()
    const userID = searchParams.get("userID");
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userID) {
            const response = fetchUserByID(userID);
            if (response) {
                response.then((value) => {
                    if(value && value.succeeded) setUser(value.data);
                }).finally(() => setLoading(false));
            }
        }
    }, []);

    const breadcrumbItems = [
        { title: 'User', link: '/dashboard/user' },
        { title: 'Create', link: '/dashboard/user/create' },
        { title: 'Edit', link: `/dashboard/user/edit?id=${userID}` }
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} />
                <UserForm
                    roles={null}
                    initialData={user}
                />
            </div>
        </ScrollArea>
    );
}