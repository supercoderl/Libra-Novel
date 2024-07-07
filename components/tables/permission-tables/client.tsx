'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Permission, PermissionStates } from '@/types';
import PermissionTable from './table-mobile';

interface PermissionsClientProps {
    data: Permission[];
    permissions: PermissionStates;
}

export const PermissionClient: React.FC<PermissionsClientProps> = ({ data, permissions }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Quyền (${data.length})`}
                    description="Quản lý quyền hạn"
                />
                <Button
                    className="hidden md:flex text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/permission/create`)}
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
                        onClick={() => router.push(`/dashboard/permission/create`)}
                        disabled={!permissions.canCreate}
                    >
                        <Plus className="m-auto" />
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable
                className='hidden md:block'
                searchKey="title"
                columns={columns(permissions)}
                data={data}
                setPageIndex={() => { }}
                permissions={permissions}
            />
            <PermissionTable
                className='md:hidden'
                data={data}
                permissions={permissions}
            />
        </>
    );
};