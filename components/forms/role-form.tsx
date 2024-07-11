'use client';
import * as z from 'zod';
import React, { useEffect, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Tên phải ít nhất 3 ký tự' }),
    roleCode: z
        .string(),
    isActive: z
        .string(),
});

type RoleFormValue = z.infer<typeof formSchema>;

interface RoleFormProps {
    initialData: any | null;
}

export const RoleForm: React.FC<RoleFormProps> = ({ initialData }) => {
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
        name: '',
        roleCode: '',
        isActive: '',
    };

    const form = useForm<RoleFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("name", initialData.name);
            form.setValue("roleCode", String(initialData.roleCode));
            form.setValue("isActive", String(initialData.isActive));
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: RoleFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const body = {
                    roleID: initialData.roleID,
                    name: data.name,
                    roleCode: Number(data.roleCode),
                    isActive: data.isActive === "true" ? true : false,
                };

                await axios.put(`/update-role/${body.roleID}`, body).then(({ data }) => {
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
                    name: data.name,
                    roleCode: Number(data.roleCode),
                    isActive: data.isActive === "true" ? true : false,
                };

                await axios.post(`/create-role`, body).then(({ data }) => {
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
            router.push(`/dashboard/role`);
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
            await axios.delete(`/delete-role/${initialData.roleID}`);
            router.refresh();
            router.push(`/dashboard/role`);
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên quyền</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập tên quyền..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="roleCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã quyền</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
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
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trạng thái</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                {...field}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Chọn trạng thái"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {/* @ts-ignore  */}
                                                    <SelectItem value={"true"}>
                                                        Kích hoạt
                                                    </SelectItem>
                                                    <SelectItem value={"false"}>
                                                        Bị khóa
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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