'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<User>[] = [
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
        header: 'EMAIL'
    },
    {
        accessorKey: 'firstName',
        header: 'TÊN'
    },
    {
        accessorKey: 'lastName',
        header: 'HỌ'
    },
    {
        accessorKey: 'gender',
        header: 'GIỚI TÍNH',
        cell: ({ row }) => row.original.gender === "Male" ? "Nam" : row.original.gender === "Female" ? "Nữ" : "Khác"
    },
    {
        accessorKey: 'isActive',
        header: 'TRẠNG THÁI',
        cell: ({ row }) => row.original.isActive === 1 ? "Kích hoạt" : "Bị khóa"
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];