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
import { getSession, signIn } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SocialSignInButton } from '../auth-button';
import React from 'react';
import { RadioBox } from '../ui/radio';
import { genders } from '@/constants/gender';
import Spinner from '../ui/spinner';
import useAxios from '@/hooks/useAxios';
import { encodeEmailToNumber } from '@/utils/text';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

export const UserAuthForm = ({ state, setResult }: {
    state: string, setResult: Dispatch<SetStateAction<{
        success: boolean | null;
        message: string | null;
    }>>
}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
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
                redirect: false,
            }).then((result) => {
                if (result?.error && (result?.error !== null || result?.error !== "")) {
                    setResult({
                        success: false,
                        message: "Thông tin đăng nhập không đúng.",
                    });
                }
                else {
                    setResult({
                        success: true,
                        message: "Đăng nhập thành công.",
                    });
                    getSession().then(session => {
                        if (session?.user) {
                            if (session?.user?.roles?.includes(100)) {
                                router.push("/dashboard");
                            }
                            else {
                                router.push("/");
                            }
                        }
                    });
                }
            }).catch((error) => console.log(error)).finally(() => setTimeout(() => setLoading(false), 300));
        }
        else {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('passwordHash', data.password);
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('userCode', encodeEmailToNumber(data.email));
            formData.append('gender', data.gender);

            await axios.post(`/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(({ data }) => {
                if (data && data.succeeded) {
                    setResult({
                        success: true,
                        message: "Đăng ký thành công."
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