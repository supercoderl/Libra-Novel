'use client';
import * as z from 'zod';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
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
import { Textarea } from '../ui/textarea';
import { Upload } from '../ui/upload';
import { Genre } from '@/types';
import { Checkbox } from '../ui/checkbox';
import useAxios from '@/hooks/useAxios';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Tiêu đề phải ít nhất 3 ký tự' }),
    description: z
        .string(),
    otherName: z
        .any(),
    totalPages: z
        .string().default("0"),
    coverImage: z.any()
});

type NovelFormValue = z.infer<typeof formSchema>;

interface NovelFormProps {
    initialData: any | null;
}

export const NovelForm: React.FC<NovelFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin truyện.' : 'Thêm một truyện mới';
    const toastMessage = initialData ? 'Đã cập nhật truyện.' : 'Tạo truyện thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const axios = useAxios();

    const defaultValues = initialData || {
        title: '',
        description: '',
        otherName: '',
        totalPages: "0",
        coverImage: ''
    };

    const form = useForm<NovelFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("otherName", initialData.otherName);
            form.setValue("description", initialData.description);
            form.setValue("totalPages", initialData.totalPages);
            setImgUrl(initialData.coverImage);
        }
        onLoadGenres();
    }, [initialData]);

    //Load genre list
    const onLoadGenres = async () => {
        await axios.get(`/get-genres`, {
            params: {
                pageIndex: 1,
                pageSize: 10
            }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setGenres(data.data.items);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    //Submit form
    const onSubmit = async (data: NovelFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const formData = new FormData();
                formData.append('file', data.coverImage);
                formData.append('novelID', initialData.novelID);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('otherName', data.otherName);
                formData.append('totalPages', data.totalPages);
                formData.append('status', initialData.status);

                await axios.put(`/update-novel/${initialData.novelID}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            } else {
                const formData = new FormData();
                formData.append('file', data.coverImage);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('otherName', data.otherName);
                formData.append('totalPages', data.totalPages);

                await axios.post(`/create-novel`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(({ data }) => {
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
            router.push(`/dashboard/library`);
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
            await axios.delete(`/delete-novel/${initialData.novelID}`);
            router.refresh();
            router.push(`/dashboard/library`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    //Upload image to cloud
    const onUploadImage = async (event: any, field: ControllerRenderProps<{
        title: string;
        description: string;
        totalPages: string;
        coverImage?: any;
        otherName?: any;
    }, "coverImage">) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImgUrl(url);
            field.onChange(event.target.files[0]);
        }
    }

    //Add or remove genre for novel
    const onGenreChecked = async (genreID: number, novelID: number, state: any) => {
        setLoading(true);
        const body = {
            genreID,
            novelID
        };

        if (state) {
            await axios.post(`/create-mapping-genre-with-novel`, null, { params: body }).finally(() => setTimeout(() => setLoading(false), 300));
        }
        else {
            await axios.delete(`/drop-mapping-genre-with-novel`, { params: body }).finally(() => setTimeout(() => setLoading(false), 300));
        }
        router.refresh();
    }

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
                            className="w-8 h-8 p-0"
                            size="sm"
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
                                name="totalPages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tổng số chương</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={loading}
                                                placeholder="Nhập tổng số chương..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="otherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên khác</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập tên khác..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='col-span-3'>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mô tả</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    placeholder="Nhập mô tả..."
                                                    rows={6}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {
                                initialData &&
                                <div className='col-span-3'>
                                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Thể loại</p>
                                    <div className='border-2 border-input mt-2 p-3 rounded-sm flex gap-3 flex-wrap'>
                                        {
                                            genres && genres.length > 0 &&
                                            genres.map((genre, index) => (
                                                <div key={index} className='flex gap-1 items-center'>
                                                    <Checkbox
                                                        checked={initialData?.mappings?.some((x: any) => x.genreID === genre.genreID)}
                                                        value={genre.genreID}
                                                        onCheckedChange={(value) => onGenreChecked(genre.genreID, initialData.novelID, value)}
                                                    />
                                                    <p className='text-sm'>{genre.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hình ảnh</FormLabel>
                                    <FormControl>
                                        <Upload
                                            url={imgUrl || ""}
                                            onChange={(e) => onUploadImage(e, field)}
                                            accept="image/*"
                                            type='file'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};