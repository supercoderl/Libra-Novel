'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import { createNewNovel, editNovel } from '@/app/actions/libraryActions';
import { Textarea } from '../ui/textarea';
import { Upload } from '../ui/upload';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Tiêu đề phải ít nhất 3 ký tự' }),
    description: z
        .string(),
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
    const [loading, setLoading] = useState(false);
    // const [imgLoading, setImgLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin truyện.' : 'Thêm một truyện mới';
    const toastMessage = initialData ? 'Đã cập nhật truyện.' : 'Tạo truyện thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';

    const defaultValues = initialData || {
        title: '',
        description: '',
        totalPages: "0",
        coverImage: ''
    };

    const form = useForm<NovelFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("description", initialData.description);
            form.setValue("totalPages", initialData.totalPages);
        }
    }, [initialData]);

    const onSubmit = async (data: NovelFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const formData = new FormData();
                formData.append('file', data.coverImage);
                formData.append('novelID', initialData.novelID);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('totalPages', data.totalPages);
                formData.append('status', initialData.status);

                await editNovel(initialData.novelID, formData).then((value) => {
                    if (value && value.succeeded) {
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
                formData.append('totalPages', data.totalPages);

                await createNewNovel(formData).then((value) => {
                    if (value && value.succeeded) {
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

    const onUploadImage = async (event: any, field: ControllerRenderProps<{
        title: string;
        description: string;
        totalPages: string;
        coverImage?: any;
    }, "coverImage">) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImgUrl(url);
            field.onChange(event.target.files[0]);
        }
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
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
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