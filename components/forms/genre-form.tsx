'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
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

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Tên thể loại' }),
    parentID: z
        .string(),
});

type GenreFormValue = z.infer<typeof formSchema>;

interface GenreFormProps {
    initialData: any | null;
}

export const GenreForm: React.FC<GenreFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin thể loại.' : 'Thêm một thể loại mới';
    const toastMessage = initialData ? 'Đã cập nhật thể loại.' : 'Tạo thể loại thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const axios = useAxios();

    const defaultValues = initialData || {
        name: '',
        parentID: '0'
    };

    const form = useForm<GenreFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("name", initialData.name);
            form.setValue("parentID", String(initialData.parentID));
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: GenreFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const body = {
                    genreID: initialData.genreID,
                    name: data.name,
                    parentID: data.parentID !== "0" ? Number(data.parentID) : null
                }

                await axios.put(`/update-genre/${body.genreID}`, body).then(({ data }) => {
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
                    parentID: data.parentID !== "0" ? Number(data.parentID) : null
                }

                await axios.post(`/create-genre`, body).then(({ data }) => {
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
            router.push(`/dashboard/genre`);
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
            //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/library`);
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
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="h-4 w-4" />
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
                    <div className='grid grid-cols-4 gap-5'>
                        <div className="gap-8 md:grid col-span-3 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thể loại</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Nhập thể loại..."
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