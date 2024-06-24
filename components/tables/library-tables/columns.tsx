'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Novel } from '@/types';
import dateFormatter from '@/utils/date';
import Link from 'next/link';

export const columns: ColumnDef<Novel>[] = [
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
        header: () => <p className='text-center'>HÌNH ẢNH</p>,
        cell: ({ row }) => <div className='w-full flex justify-center'>
            <img className='w-8' src={row?.original?.coverImage || 'https://upload.wikimedia.org/wikipedia/vi/2/24/Chainsawman.jpg'} alt='' />
        </div>,
    },
    {
        accessorKey: 'title',
        header: 'TIÊU ĐỀ',
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
        header: "MÔ TẢ",
        cell: ({ row }) => <div className='whitespace-nowrap w-full max-w-[350px]'>
            <p className='overflow-hidden text-ellipsis' title={row.original.description || ""}>{row.original.description}</p>
        </div>,
    },
    {
        accessorKey: 'totalPages',
        header: () => <p className='text-center'>TỔNG SỐ CHƯƠNG</p>,
        cell: ({ row }) => <p className='text-center'>{row.original.totalPages}</p>,
    },
    {
        accessorKey: 'publishedDate',
        header: 'NGÀY ĐĂNG',
        cell: ({ row }) => dateFormatter(row.original.publishedDate)
    },
    {
        accessorKey: 'status',
        header: 'TRẠNG THÁI',
        cell: ({ row }) => Number(row.original.status) === 1 ? "Đang tiến hành" : "Đã hoàn thành"
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];