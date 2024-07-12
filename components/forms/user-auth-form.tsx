'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SocialSignInButton } from '../auth-button';
import { useToast } from '../ui/use-toast';
import React from 'react';
import { RadioBox } from '../ui/radio';
import { genders } from '@/constants/gender';
import Spinner from '../ui/spinner';
import useAxios from '@/hooks/useAxios';
import { encodeEmailToNumber } from '@/utils/text';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

export const UserAuthForm = ({ state }: { state: string }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        email: 'admin@gmail.com',
        password: 'string',
        firstName: 'Nam',
        lastName: 'Nguyễn Văn',
        gender: 'Male'
    };
    const axios = useAxios();

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Submit form
    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        if (state.includes("login")) {
            signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: `/dashboard`,
                redirect: true
            }).then(() => {
                // if (session && session.user && session.user.roles && session.user.roles.length > 0) {
                //     if (session.user.roles.some((r: number) => r === 300) || session.user.roles.some((r: number) => r === 200)) {
                //         router.push("http://localhost:3000/dashboard");
                //     }
                //     else {
                //         router.push("http://localhost:3000/");
                //     }
                // }
                // else {
                //     router.push("http://localhost:3000/");
                // }
            }).finally(() => setTimeout(() => setLoading(false), 300));
        }
        else {
            await axios.post(`/register`, {
                email: data.email,
                passwordHash: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                userCode: encodeEmailToNumber(data.email),
                gender: data.gender,
            }).then(({ data }) => {
                if (data && data.succeeded) {
                    toast({
                        variant: 'default',
                        title: 'Chúc mừng.',
                        description: 'Tạo thành công người dùng mới.'
                    });
                }
            }).finally(() => setLoading(false));
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        !state.includes("login") && (
                            <>
                                <div className='flex gap-2'>
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Họ</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Nhập họ..."
                                                        disabled={loading}
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
                                                        type="text"
                                                        placeholder="Nhập tên..."
                                                        disabled={loading}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Giới tính</FormLabel>
                                            <FormControl>
                                                <RadioBox
                                                    type="radio"
                                                    values={genders}
                                                    field={field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }

                    <Button disabled={loading} className="ml-auto w-full bg-main text-white hover:bg-blue-500" type="submit">
                        {
                            loading ?
                                <Spinner className='w-5 h-5 m-auto' />
                                :
                                state.includes("login") ? "Đăng nhập" : "Đăng ký"
                        }
                    </Button>
                </form >
            </Form >
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Hoặc tiếp tục với
                    </span>
                </div>
            </div>
            <SocialSignInButton type='github' />
            <SocialSignInButton type='google' />
            <SocialSignInButton type='discord' />
        </>
    );
}