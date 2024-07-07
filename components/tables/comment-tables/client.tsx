'use client';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Comment, PermissionStates } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import CommentTable from './table-mobile';

interface CommentsClientProps {
    data: Comment[];
    isNext: boolean;
    isPrevious: boolean;
    setPageIndex: Dispatch<SetStateAction<number>>;
    permissions: PermissionStates;
}

export const CommentClient: React.FC<CommentsClientProps> = ({ data, isNext, isPrevious, setPageIndex, permissions }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Bình luận (${data.length})`}
                    description="Quản lý bình luận"
                />
            </div>
            <Separator />
            <DataTable
                className='hidden md:block'
                searchKey="content"
                columns={columns(permissions)}
                data={data}
                isNext={isNext}
                isPrevious={isPrevious}
                setPageIndex={setPageIndex}
                permissions={permissions}
            />
            <CommentTable
                className='md:hidden'
                data={data}
                isNext={isNext}
                isPrevious={isPrevious}
                setPageIndex={setPageIndex}
                permissions={permissions}
            />
        </>
    );
};