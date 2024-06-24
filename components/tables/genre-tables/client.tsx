'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Genre } from '@/types';

interface GenresClientProps {
    data: Genre[];
}

export const GenreClient: React.FC<GenresClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Thể loại (${data.length})`}
                    description="Quản lý thể loại truyện"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/genre/create`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm mới
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="email" columns={columns} data={data} />
        </>
    );
};