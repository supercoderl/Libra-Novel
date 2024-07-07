'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PermissionStates } from '@/types';

export const columns = (permissions: PermissionStates):ColumnDef<User>[] => [
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
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'firstName',
        header: 'Tên'
    },
    {
        accessorKey: 'lastName',
        header: 'Họ'
    },
    {
        accessorKey: 'gender',
        header: 'Giới tính',
        cell: ({ row }) => row.original.gender === "Male" ? "Nam" : row.original.gender === "Female" ? "Nữ" : "Khác"
    },
    {
        accessorKey: 'isActive',
        header: 'Trạng thái',
        cell: ({ row }) => row.original.isActive === 1 ?
            <Badge className='bg-orange-500 py-1'>Kích hoạt</Badge> : <Badge className='bg-blue-500 py-1'>Bị khóa</Badge>
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} permissions={permissions} />
    }
];