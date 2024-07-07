'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { PermissionClient } from '@/components/tables/permission-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Quyền', link: '/dashboard/permission' }];
export default function page() {
    const [pers, setPers] = useState([]);
    const { permissions } = useContext(PermissionsContext);
    const [permissionStates, setPermissionStates] = useState<PermissionStates>({
        canView: null,
        canEdit: false,
        canCreate: false,
        canDelete: false
    });
    const axios = useAxios();

    //Loading permission list
    const onLoadData = async () => {
        await axios.get(`/get-all-permissions`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setPers(data.data.items);
            }
        });
    };

    //Init
    useEffect(() => {
        onLoadData();
    }, []);

    //Second calling to check permission
    useEffect(() => {
        if (permissions) {
            setPermissionStates({
                canView: checkPermission(["ViewPermissionList"], permissions),
                canEdit: checkPermission(["UpdatePermission"], permissions),
                canCreate: checkPermission(["CreatePermission"], permissions),
                canDelete: checkPermission(["DeletePermission"], permissions)
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
                        <PermissionClient
                            data={pers}
                            permissions={permissionStates}
                        />
                        :
                        <Forbidden />
                }
            </div>
        </>
    );
}