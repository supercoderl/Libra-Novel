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
import { Comment, PermissionStates } from '@/types';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ActionProps {
    data: Comment;
    permissions: PermissionStates;
}

export const ActionMobile: React.FC<ActionProps> = ({ data, permissions }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const axios = useAxios();

    //Delete item
    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/delete-comment/${data.commentID}`);
            router.refresh();
            router.push(`/dashboard/comment`);
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
                    <Button variant="ghost" className="h-5 w-5 p-0">
                        <span className="sr-only">Mở menu</span>
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
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