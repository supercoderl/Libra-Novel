'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { PermissionStates, Role } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import RoleTable from './table-mobile';

interface RolesClientProps {
    data: Role[];
    isNext: boolean;
    isPrevious: boolean;
    setPageIndex: Dispatch<SetStateAction<number>>;
    permissions: PermissionStates;
}

export const RoleClient: React.FC<RolesClientProps> = ({ data, isNext, isPrevious, setPageIndex, permissions }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Quyền (${data.length})`}
                    description="Quản lý quyền"
                />
                <Button
                    className="hidden md:flex text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/role/create`)}
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
                        onClick={() => router.push(`/dashboard/role/create`)}
                        disabled={!permissions.canCreate}
                    >
                        <Plus className="m-auto" />
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable
                className='hidden md:block'
                searchKey="name"
                columns={columns(permissions)}
                data={data}
                isNext={isNext}
                isPrevious={isPrevious}
                setPageIndex={setPageIndex}
                permissions={permissions}
            />
            <RoleTable
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