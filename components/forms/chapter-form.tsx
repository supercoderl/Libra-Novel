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
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { richTextOptions } from '@/constants/data';
import useAxios from '@/hooks/useAxios';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Tiêu đề phải ít nhất 3 ký tự' }),
    content: z
        .string(),
    chapterNumber: z
        .string().default("0"),
});

type ChapterFormValue = z.infer<typeof formSchema>;

interface ChapterFormProps {
    initialData: any | null;
    novelID: Number;
}

export const ChapterForm: React.FC<ChapterFormProps> = ({ initialData, novelID }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Cập nhật' : 'Thêm mới';
    const description = initialData ? 'Chỉnh sửa thông tin chương.' : 'Thêm một chương mới';
    const toastMessage = initialData ? 'Đã cập nhật chương.' : 'Tạo chương thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const axios = useAxios();

    const defaultValues = initialData || {
        title: '',
        description: '',
        totalPages: "0",
    };

    const form = useForm<ChapterFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("content", initialData.content);
            form.setValue("chapterNumber", initialData.chapterNumber);
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: ChapterFormValue) => {
        setLoading(true);
        try {
            if (initialData) {
                const body = {
                    chapterID: initialData.chapterID,
                    title: data.title,
                    content: data.content,
                    chapterNumber: Number(data.chapterNumber),
                    novelID: Number(initialData.novelID)
                }

                await axios.put(`/update-chapter/${body.chapterID}`, body).then(({ data }) => {
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
                    content: data.content,
                    chapterNumber: Number(data.chapterNumber),
                    novelID
                }

                await axios.post(`/create-chapter`, body).then(({ data }) => {
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
            router.push(`/dashboard/library/${novelID}/chapter`);
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
            await axios.delete(`/delete-chapter/${initialData.chapterID}`);
            router.refresh();
            router.push(`/dashboard/library/${novelID}/chapter`);
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
                            className="w-8 h-8 p-0"
                            disabled={loading}
                            variant="destructive"
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
                    <div className="gap-8 md:grid md:grid-cols-3">
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
                            name="chapterNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chương số</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            disabled={loading}
                                            placeholder="Nhập chương số..."
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
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nội dung</FormLabel>
                                        <FormControl>
                                            <FroalaEditorComponent
                                                tag="textarea"
                                                model={field.value}
                                                onModelChange={field.onChange}
                                                config={richTextOptions}
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