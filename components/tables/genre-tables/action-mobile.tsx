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
import { Genre, PermissionStates } from '@/types';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ActionProps {
    data: Genre;
    permissions: PermissionStates;
}

export const ActionMobile: React.FC<ActionProps> = ({ data, permissions }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onConfirm = async () => { };

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
                    <Button variant="ghost" className="h-5 w-5 p-0">
                        <span className="sr-only">Mở menu</span>
                        <EllipsisVertical className="h-4 w-4" />
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