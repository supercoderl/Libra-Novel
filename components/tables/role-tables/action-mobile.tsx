'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { PermissionStates, Role } from '@/types';
import { convertArrayToTreeNodes } from '@/utils/array';
import { ChevronDown, ChevronRight, Edit, EllipsisVertical, Link, Menu, Square, SquareCheck, SquareDot, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { MenuDialog } from './menu-dialog';
import { PermissionDialog } from './permission-dialog';

interface ActionProps {
    data: Role;
    permissions: PermissionStates;
}

export const ActionMobile: React.FC<ActionProps> = ({ data, permissions }) => {
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [permissionsTree, setPermissionsTree] = useState([]);
    const [menuTree, setMenuTree] = useState([]);
    const [checked, setChecked] = useState<string[]>([]);
    const { toast } = useToast();
    const router = useRouter();
    const axios = useAxios();

    //Delete item
    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/delete-role/${data.roleID}`);
            router.refresh();
            router.push(`/dashboard/role`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onLoadPermissionsTree = async () => {
        await axios.get("get-permissions-tree").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setPermissionsTree(convertArrayToTreeNodes(data.data));
            }
        });
    }

    const onLoadMenusTree = async () => {
        await axios.get("get-menus-tree").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setMenuTree(convertArrayToTreeNodes(data.data));
            }
        });
    }

    useEffect(() => {
        onLoadPermissionsTree();
        onLoadMenusTree();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        if (openDialog === "permission") {
            await axios.post("create-mapping-role-with-permissions", {
                roleID: data.roleID,
                permissions: checked
            }).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: data.data
                    });
                };
            }).finally(() => setTimeout(() => {
                setLoading(false);
                setOpenDialog(null);
            }, 300));
        }
        else {
            await axios.post("create-mapping-role-with-menus", {
                roleID: data.roleID,
                menus: checked
            }).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: data.data
                    });
                };
            }).finally(() => setTimeout(() => {
                setLoading(false);
                setOpenDialog(null);
            }, 300));
        }
        window.location.reload();
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />

            <MenuDialog
                open={openDialog === "menu"}
                setOpenDialog={setOpenDialog}
                data={menuTree}
                checkedList={checked}
                setCheckedList={setChecked}
                handleSave={handleSave}
                loading={loading}
            />
            <PermissionDialog
                open={openDialog === "permission"}
                setOpenDialog={setOpenDialog}
                data={permissionsTree}
                checkedList={checked}
                setCheckedList={setChecked}
                handleSave={handleSave}
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
                        onClick={() => {
                            setOpenDialog("permission");
                            setChecked(data.permissions || []);
                        }}
                    >
                        <Link className="mr-2 h-4 w-4" /> Xem quyền
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpenDialog("menu");
                            setChecked(data.menus || []);
                        }}
                    >
                        <Menu className="mr-2 h-4 w-4" /> Xem menu
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/dashboard/role/edit?roleID=${data.roleID}`)}
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