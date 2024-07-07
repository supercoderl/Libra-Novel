'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { RoleClient } from '@/components/tables/role-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Quyền', link: '/dashboard/role' }];
export default function Page() {
    const [roles, setRoles] = useState([]);
    const [isNext, setNext] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const { permissions } = useContext(PermissionsContext);
    const [permissionStates, setPermissionStates] = useState<PermissionStates>({
        canView: null,
        canEdit: false,
        canCreate: false,
        canDelete: false
    });
    const axios = useAxios();

    //Loading role list
    const onLoadData = async () => {
        await axios.get(`/get-all-roles`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setRoles(data.data.items);
                setNext(data.data.next);
                setPrevious(data.data.previous);
            }
        });
    };

    //Init
    useEffect(() => {
        onLoadData();
    }, [pageIndex]);

    //Second calling to check permission
    useEffect(() => {
        if (permissions) {
            setPermissionStates({
                canView: checkPermission(["ViewRoleList"], permissions),
                canEdit: checkPermission(["UpdateRole"], permissions),
                canCreate: checkPermission(["CreateRole"], permissions),
                canDelete: checkPermission(["DeleteRole"], permissions)
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
                        <RoleClient
                            data={roles}
                            isNext={isNext}
                            isPrevious={isPrevious}
                            setPageIndex={setPageIndex}
                            permissions={permissionStates}
                        />
                        :
                        <Forbidden />
                }
            </div>
        </>
    );
}