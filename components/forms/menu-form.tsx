'use client';
import * as z from 'zod';
import React, { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash, Undo2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import useAxios from '@/hooks/useAxios';
import { MenuContext } from '@/contexts/AppProvider';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Tiêu đề phải ít nhất 3 ký tự' }),
    icon: z
        .string(),
    path: z
        .string(),
    orderBy: z
        .string().default("0"),
});

type MenuFormValue = z.infer<typeof formSchema>;

interface MenuFormProps {
    initialData: any | null;
}

export const MenuForm: React.FC<MenuFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin menu.' : 'Thêm một menu mới';
    const toastMessage = initialData ? 'Đã cập nhật menu.' : 'Tạo menu thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const { update } = useContext(MenuContext);
    const axios = useAxios();

    const defaultValues = initialData || {
        title: '',
        icon: '',
        path: '',
        orderBy: '0'
    };

    const form = useForm<MenuFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("icon", initialData.icon);
            form.setValue("path", initialData.path);
            form.setValue("orderBy", String(initialData.orderBy));
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: MenuFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const body = {
                    menuID: initialData.menuID,
                    title: data.title,
                    icon: data.icon,
                    path: data.path,
                    orderBy: Number(data.orderBy)
                };

                await axios.put(`/update-menu/${body.menuID}`, body).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                        update();
                    }
                });
            } else {
                const body = {
                    title: data.title,
                    icon: data.icon,
                    path: data.path,
                    orderBy: Number(data.orderBy)
                };

                await axios.post(`/create-menu`, body).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                        update();
                    }
                });
            }
            router.refresh();
            router.push(`/dashboard/menu`);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.'
            });
        } finally {
            setLoading(false);
        }
    };

    //Delete item
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/delete-menu/${initialData.menuID}`).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: toastMessage
                    });
                }
            });
            router.refresh();
            router.push(`/dashboard/menu`);
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
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <div className='flex gap-1.5 items-center'>
                        <Button
                            className=" bg-green-600 w-8 h-8 p-0"
                            onClick={() => router.back()}
                        >
                            <Undo2 className="m-auto" />
                        </Button>
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="m-auto" />
                        </Button>
                    </div>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className='md:grid md:grid-cols-4 gap-5'>
                        <div className="gap-8 md:grid col-span-3 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tiêu đề</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập tiêu đề..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Biểu tượng</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập biểu tượng..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="path"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Đường dẫn</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập đường dẫn..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="orderBy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thứ tự</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập thứ tự..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};