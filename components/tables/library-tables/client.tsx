'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Novel } from '@/types';

interface NovelsClientProps {
    data: Novel[];
}

export const NovelClient: React.FC<NovelsClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Thư viện (${data.length})`}
                    description="Quản lý thư viện truyện"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/library/create`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm mới
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />
        </>
    );
};