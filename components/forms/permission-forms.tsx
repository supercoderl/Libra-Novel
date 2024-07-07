'use client';
import * as z from 'zod';
import React, { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Permission } from '@/types';

const formSchema = z.object({
    permissionCode: z
        .string(),
    title: z
        .string()
        .min(3, { message: 'Tiêu đề phải ít nhất 3 ký tự' }),
    parent: z
        .string()
});

type PermissionFormValue = z.infer<typeof formSchema>;

interface PermissionFormProps {
    initialData: any | null;
    permissions: Permission[];
}

export const PermissionForm: React.FC<PermissionFormProps> = ({ initialData, permissions }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin quyền.' : 'Thêm một quyền mới';
    const toastMessage = initialData ? 'Đã cập nhật quyền.' : 'Tạo quyền thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const axios = useAxios();

    const defaultValues = initialData || {
        title: '',
        permissionCode: '',
        parent: ''
    };

    const form = useForm<PermissionFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("permissionCode", String(initialData.permissionCode));
            form.setValue("parent", String(initialData.parent));
        }
    }, [initialData]);


    //Submit form
    const onSubmit = async (data: PermissionFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const body = {
                    permissionID: initialData.permissionID,
                    title: data.title,
                    permissionCode: Number(data.permissionCode),
                    parent: Number(data.parent),
                };

                await axios.put(`/update-permission/${body.permissionID}`, body).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            } else {
                const body = {
                    title: data.title,
                    permissionCode: Number(data.permissionCode),
                    parent: Number(data.parent),
                };

                await axios.post(`/create-permission`, body).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            }
            router.refresh();
            router.push(`/dashboard/permission`);
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
            await axios.delete(`/delete-permission/${initialData.permissionID}`).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: toastMessage
                    });
                }
            });
            router.refresh();
            router.push(`/dashboard/permission`);
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
                            className="bg-green-600 w-8 h-8 p-0"
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
                                name="permissionCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã quyền</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập mã quyền..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="parent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quyền phụ thuộc</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            {...field}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Chọn quyền"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* @ts-ignore  */}
                                                {
                                                    permissions && permissions.length > 0 &&
                                                    permissions.map((permission, index) => (
                                                        <SelectItem key={index} value={String(permission?.permissionID)}>
                                                            {permission?.title}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
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