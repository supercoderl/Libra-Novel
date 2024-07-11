'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useAxios from '@/hooks/useAxios';
import { Genre, PermissionStates } from '@/types';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
    data: Genre;
    permissions: PermissionStates;
}

export const CellAction: React.FC<CellActionProps> = ({ data, permissions }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const axios = useAxios();

    //Delete item
    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/delete-genre/${data.genreID}`);
            router.refresh();
            router.push(`/dashboard/genre`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => router.push(`/dashboard/genre/edit?genreID=${data.genreID}`)}
                        disabled={!permissions.canEdit}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Cập nhật
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        disabled={!permissions.canDelete}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};