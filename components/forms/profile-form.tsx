'use client';
import * as z from 'zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useToast } from '../ui/use-toast';
import useAxios from '@/hooks/useAxios';

const formSchema = z.object({
    email: z
        .string()
        .email({ message: 'Hãy nhập đúng định dạng email' })
        .min(3, { message: 'Email phải ít nhất 3 ký tự' }),
    firstName: z
        .string()
        .min(3, { message: 'Tên người dùng phải ít nhất 3 ký tự' }),
    lastName: z
        .string()
        .min(3, { message: 'Họ người dùng phải ít nhất 3 ký tự' }),
    gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }),
});

type ProfileFormValue = z.infer<typeof formSchema>;

interface ProfileFormProps {
    initialData: any | null;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
    initialData,
    loading,
    setLoading
}) => {
    const { toast } = useToast();
    const toastMessage = 'Cập nhật thành công';
    const axios = useAxios();

    const defaultValues = initialData || {
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
    };

    const form = useForm<ProfileFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("email", initialData.email);
            form.setValue("firstName", initialData.firstName);
            form.setValue("lastName", initialData.lastName);
            form.setValue("gender", initialData.gender);
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: ProfileFormValue) => {
        try {
            setLoading(true);
            if (initialData) {
                const body = {
                    userID: initialData.userID,
                    avatar: initialData.avatar,
                    isActive: initialData.isActive === 1 ? true : false,
                    ...data
                };

                await axios.put(`/update-information`, body).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            }
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Tên người dùng"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Họ người dùng"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    {...field}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Chọn giới tính"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* @ts-ignore  */}
                                        <SelectItem value={"Male"}>
                                            Nam
                                        </SelectItem>
                                        <SelectItem value={"Female"}>
                                            Nữ
                                        </SelectItem>
                                        <SelectItem value={"Orther"}>
                                            Khác
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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