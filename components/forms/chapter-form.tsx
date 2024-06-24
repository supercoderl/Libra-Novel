'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Textarea } from '../ui/textarea';
import { createNewChapter, editChapter } from '@/app/actions/chapterActions';
import { richTextOptions } from '@/constants/data';

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

    const defaultValues = initialData || {
        title: '',
        description: '',
        totalPages: "0",
    };

    const form = useForm<ChapterFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    useEffect(() => {
        if (initialData) {
            form.setValue("title", initialData.title);
            form.setValue("content", initialData.content);
            form.setValue("chapterNumber", initialData.chapterNumber);
        }
    }, [initialData]);

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

                await editChapter(body).then((value) => {
                    if (value && value.succeeded) {
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

                await createNewChapter(body).then((value) => {
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

    // const triggerImgUrlValidation = () => form.trigger('imgUrl');

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