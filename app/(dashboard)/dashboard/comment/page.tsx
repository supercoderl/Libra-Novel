'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Forbidden } from '@/components/errors/forbidden';
import { CommentClient } from '@/components/tables/comment-tables/client';
import { PermissionsContext } from '@/contexts/AppProvider';
import useAxios from '@/hooks/useAxios';
import { checkPermission } from '@/hooks/usePermissions';
import { PermissionStates } from '@/types';
import { useContext, useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Bình luận', link: '/dashboard/comment' }];
export default function Page() {
    const [comments, setComments] = useState([]);
    const [isNext, setNext] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const { permissions } = useContext(PermissionsContext);
    const [permissionStates, setPermissionStates] = useState<PermissionStates>({
        canView: null,
        canEdit: false,
        canDelete: false
    });
    const axios = useAxios();

    //Get comment list with default: PageIndex = 1, PageSize = 10
    const onLoadData = async () => {
        await axios.get("/get-all-comments", {
            params: { pageIndex, pageSize: 10 }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setComments(data.data.items);
                setNext(data.data.next);
                setPrevious(data.data.previous);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    };

    //Init calling
    useEffect(() => {
        onLoadData();
    }, [pageIndex]);


    //Second calling to check permissions
    useEffect(() => {
        if (permissions) {
            setPermissionStates({
                canView: checkPermission(["ViewCommentList"], permissions),
                canEdit: checkPermission(["UpdateComment"], permissions),
                canDelete: checkPermission(["DeleteComment"], permissions)
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
                        <CommentClient
                            data={comments}
                            isNext={isNext}
                            isPrevious={isPrevious}
                            loading={loading}
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