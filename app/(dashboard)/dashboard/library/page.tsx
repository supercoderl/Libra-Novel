'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { NovelClient } from '@/components/tables/library-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import { checkIsGuest } from '@/utils/logic';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Thư viện', link: '/dashboard/library' }];
export default function Page() {
    const [novels, setNovels] = useState([]);
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
    const { data: session } = useSession();
    const axios = useAxios();

    //Load novel list
    const onLoadData = async () => {
        await axios.get(`/get-novels`, {
            params: { pageIndex, isOwner: checkIsGuest(session) }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setNovels(data.data.items);
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
                canView: checkPermission(["ViewLibraryList"], permissions),
                canEdit: checkPermission(["UpdateLibrary"], permissions),
                canCreate: checkPermission(["CreateLibrary"], permissions),
                canDelete: checkPermission(["DeleteLibrary"], permissions)
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
                        <NovelClient
                            data={novels}
                            isNext={isNext}
                            loading={loading}
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