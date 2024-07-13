'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { MenuClient } from '@/components/tables/menu-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Vai trò', link: '/dashboard/menu' }];
export default function Page() {
    const [menus, setMenus] = useState([]);
    const { permissions } = useContext(PermissionsContext);
    const [loading, setLoading] = useState(true);
    const [permissionStates, setPermissionStates] = useState<PermissionStates>({
        canView: null,
        canEdit: false,
        canCreate: false,
        canDelete: false
    });
    const axios = useAxios();

    //Loading menu list
    const onLoadData = async () => {
        await axios.get(`/get-all-menus`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setMenus(data.data);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    };

    //Init
    useEffect(() => {
        onLoadData();
    }, []);

    //Second calling to check permission
    useEffect(() => {
        if (permissions) {
            setPermissionStates({
                canView: checkPermission(["ViewMenuList"], permissions),
                canEdit: checkPermission(["UpdateMenu"], permissions),
                canCreate: checkPermission(["CreateMenu"], permissions),
                canDelete: checkPermission(["DeleteMenu"], permissions)
            });
        };
    }, [permissions]);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} isDashboard />
                {
                    permissionStates.canView !== null &&
                        permissionStates.canView === true ?
                        <MenuClient
                            data={menus}
                            loading={loading}
                            permissions={permissionStates}
                        />
                        :
                        <Forbidden />
                }
            </div>
        </>
    );
}