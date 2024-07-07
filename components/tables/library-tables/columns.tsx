'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Novel, PermissionStates } from '@/types';
import Link from 'next/link';
import { dateFormatter } from '@/utils/date';
import { Badge } from '@/components/ui/badge';

export const columns = (permissions: PermissionStates):ColumnDef<Novel>[] => [
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
        accessorKey: 'coverImage',
        header: () => <p className='text-center'>Hình ảnh</p>,
        cell: ({ row }) => <div className='w-full flex justify-center'>
            <img className='w-8' src={row?.original?.coverImage || 'https://upload.wikimedia.org/wikipedia/vi/2/24/Chainsawman.jpg'} alt='' />
        </div>,
    },
    {
        accessorKey: 'title',
        header: 'Tiêu đề',
        cell: ({ row }) =>
            <div className=' whitespace-nowrap w-full max-w-[150px] overflow-hidden text-ellipsis'>
                <Link
                    href={{
                        pathname: `/dashboard/library/[novelID]/chapter`,
                        query: { novelID: row.original.novelID }
                    }}
                    as={`/dashboard/library/${row.original.novelID}/chapter`}
                    className='text-blue-500 hover:text-red-500'
                    title={row.original.title}
                >
                    {row.original.title}
                </Link>
            </div>
    },
    {
        accessorKey: 'description',
        header: "Mô tả",
        cell: ({ row }) => <div className='whitespace-nowrap w-full max-w-[350px]'>
            <p className='overflow-hidden text-ellipsis' title={row.original.description || ""}>{row.original.description}</p>
        </div>,
    },
    {
        accessorKey: 'totalPages',
        header: () => <p className='text-center'>Tổng số chương</p>,
        cell: ({ row }) => <p className='text-center'>{row.original.totalPages}</p>,
    },
    {
        accessorKey: 'publishedDate',
        header: 'Ngày đăng',
        cell: ({ row }) => dateFormatter(row.original.publishedDate)
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => Number(row.original.status) === 1 ?
            <Badge className='bg-red-500 py-1'>Đang tiến hành</Badge> : <Badge className='bg-violet-500 py-1'>Đã hoàn thành</Badge>
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} permissions={permissions} />
    }
];