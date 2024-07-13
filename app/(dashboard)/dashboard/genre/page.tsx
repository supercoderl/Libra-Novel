'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { GenreClient } from '@/components/tables/genre-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Thể loại', link: '/dashboard/genre' }];
export default function Page() {
    const [genres, setGenres] = useState([]);
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

    //Load genre list
    const onLoadData = async () => {
        await axios.get("/get-genres").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setGenres(data.data.items);
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
                canView: checkPermission(["ViewGenreList"], permissions),
                canEdit: checkPermission(["UpdateGenre"], permissions),
                canCreate: checkPermission(["CreateGenre"], permissions),
                canDelete: checkPermission(["DeleteGenre"], permissions)
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
                        <GenreClient
                            data={genres}
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