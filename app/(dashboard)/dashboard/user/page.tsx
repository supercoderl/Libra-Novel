'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { UserClient } from '@/components/tables/user-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates, User } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Người dùng', link: '/dashboard/user' }];
export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [isNext, setNext] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const { permissions } = useContext(PermissionsContext);
    const [permissionStates, setPermissionStates] = useState<PermissionStates>({
        canView: null,
        canEdit: false,
        canCreate: false,
        canDelete: false
    });
    const axios = useAxios();

    //Loading user list
    const onLoadData = async () => {
        await axios.get(`/get-all-users`, {
            params: { pageIndex }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setUsers(data.data.items);
                setNext(data.data.next);
                setPrevious(data.data.previous);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    };

    //Init
    useEffect(() => {
        onLoadData();
    }, [pageIndex]);

    //Second calling to check permission
    useEffect(() => {
        if (permissions) {
            setPermissionStates({
                canView: checkPermission(["ViewUserList"], permissions),
                canEdit: checkPermission(["UpdateUser"], permissions),
                canCreate: checkPermission(["CreateUser"], permissions),
                canDelete: checkPermission(["DeleteUser"], permissions)
            });
        };
    }, [permissions]);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                {
                    permissionStates.canView !== null ?
                        permissionStates.canView === true ?
                            <UserClient
                                data={users}
                                isNext={isNext}
                                isPrevious={isPrevious}
                                setPageIndex={setPageIndex}
                                loading={loading}
                                permissions={permissionStates}
                            />
                            :
                            <Forbidden />
                        :
                        null
                }
            </div>
        </>
    );
}