'use client';

import { fetchAllUser } from '@/app/actions/userActions';
import BreadCrumb from '@/components/breadcrumb';
import { UserClient } from '@/components/tables/user-tables/client';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'User', link: '/dashboard/user' }];
export default function page() {
    const [users, setUsers] = useState([]);

    const onLoadData = async () => {
        fetchAllUser().then((value) => {
            if (value && value.succeeded && value.data) {
                setUsers(value.data.items);
            }
        });
    };

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                <UserClient data={users} />
            </div>
        </>
    );
}