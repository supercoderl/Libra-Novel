'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import UserTable from './table-mobile';
import { PermissionStates, User } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import Spinner from '@/components/ui/spinner';

interface UsersClientProps {
    data: User[];
    isNext: boolean;
    isPrevious: boolean;
    setPageIndex: Dispatch<SetStateAction<number>>;
    permissions: PermissionStates;
    loading: boolean;
}

export const UserClient: React.FC<UsersClientProps> = ({ data, isNext, isPrevious, setPageIndex, permissions, loading }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Người dùng (${data.length})`}
                    description="Quản lý tác vụ người dùng"
                />
                <Button
                    className="hidden md:flex text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/user/create`)}
                    disabled={!permissions.canCreate}
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm mới
                </Button>
                <div className='flex md:hidden gap-3'>
                    <Button
                        className="md:hidden bg-green-600 w-8 h-8 p-0"
                        onClick={() => router.back()}
                    >
                        <Undo2 className="m-auto" />
                    </Button>
                    <Button
                        className="md:hidden w-8 h-8 p-0"
                        onClick={() => router.push(`/dashboard/user/create`)}
                        disabled={!permissions.canCreate}
                    >
                        <Plus className="m-auto" />
                    </Button>
                </div>
            </div>
            <Separator />
            {
                loading ?
                    <Spinner className='w-12 h-12 m-auto' />
                    :
                    <>
                        <DataTable
                            className='hidden md:block'
                            searchKey="email"
                            columns={columns(permissions)}
                            data={data}
                            isNext={isNext}
                            isPrevious={isPrevious}
                            setPageIndex={setPageIndex}
                            permissions={permissions}
                        />
                        <UserTable
                            className='md:hidden'
                            data={data}
                            isNext={isNext}
                            isPrevious={isPrevious}
                            setPageIndex={setPageIndex}
                            permissions={permissions}
                        />
                    </>
            }
        </>
    );
};