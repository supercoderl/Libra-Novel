'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { PermissionStates, Role } from '@/types';
import { Badge } from '@/components/ui/badge';

export const columns = (permissions: PermissionStates): ColumnDef<Role>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'name',
        header: 'Tên quyền'
    },
    {
        accessorKey: 'roleCode',
        header: 'Mã quyền'
    },
    {
        accessorKey: 'isActive',
        header: 'Trạng thái',
        cell: ({ row }) => row.original.isActive ?
            <Badge className='bg-orange-600 py-1'>Kích hoạt</Badge>
            :
            <Badge className='bg-blue-600 py-1'>Bị khóa</Badge>
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} permissions={permissions} />
    }
];