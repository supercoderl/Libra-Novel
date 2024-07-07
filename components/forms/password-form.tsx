'use client';
import * as z from 'zod';
import { Dispatch, SetStateAction } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useToast } from '../ui/use-toast';
import useAxios from '@/hooks/useAxios';

const formSchema = z.object({
    oldPassword: z
        .string()
        .min(3, { message: 'Mật khẩu cũ phải ít nhất 3 ký tự' }),
    newPassword: z
        .string()
        .min(3, { message: 'Mật khẩu mới phải ít nhất 3 ký tự' }),
    confirmPassword: z
        .string()
        .min(3, { message: 'Xác nhận mật khẩu mới phải ít nhất 3 ký tự' }),
});

type PasswordFormValue = z.infer<typeof formSchema>;

interface PasswordFormProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
    loading,
    setLoading
}) => {
    const { toast } = useToast();
    const toastMessage = 'Đổi mật khẩu thành công';
    const axios = useAxios();

    const defaultValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const form = useForm<PasswordFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Submit form
    const onSubmit = async (data: PasswordFormValue) => {
        try {
            setLoading(true);
            const body = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            };

            await axios.put(`/change-password`, body).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: toastMessage
                    });
                }
            });
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
            >
                <div className="gap-8 md:grid md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu cũ</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Nhập mật khẩu cũ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Nhập mật khẩu mới"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Nhập lại mật khẩu mới"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto mt-auto" type="submit">
                    Cập nhật
                </Button>
            </form>
        </Form>
    );
};