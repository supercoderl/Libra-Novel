'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Comment, PermissionStates } from '@/types';
import Link from 'next/link';
import { dateFormatter } from '@/utils/date';

export const columns = (permissions: PermissionStates): ColumnDef<Comment>[] => [
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
        accessorKey: 'content',
        header: 'Nội dung'
    },
    {
        accessorKey: 'userID',
        header: 'Khách hàng',
        cell: ({ row }) => row.original.name || "N/A"
    },
    {
        accessorKey: 'novelID',
        header: 'Truyện',
        cell: ({ row }) =>
            <div className=' whitespace-nowrap w-full max-w-[200px] overflow-hidden text-ellipsis'>
                <Link
                    href={{
                        pathname: `/dashboard/library/[novelID]/chapter`,
                        query: { novelID: row.original.novelID }
                    }}
                    as={`/dashboard/library/${row.original.novelID}/chapter`}
                    className='text-blue-500 hover:text-red-500'
                    title={row.original.novel}
                >
                    {row.original.novel}
                </Link>
            </div>
    },
    {
        accessorKey: 'chapterID',
        header: 'Chương',
        cell: ({ row }) => row.original.chapter || "N/A"
    },
    {
        accessorKey: 'createdDate',
        header: 'Ngày đăng',
        cell: ({ row }) => dateFormatter(row.original.createdDate)
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} permissions={permissions} />
    }
];