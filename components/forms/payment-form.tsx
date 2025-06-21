'use client';
import * as z from 'zod';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HelpCircle } from 'lucide-react';
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
import { AxiosRequestConfig } from 'axios';

const formSchema = z.object({
    fullname: z
        .string(),
    cardNumber: z
        .string(),
    monthExpire: z
        .string()
        .max(2, "Không được vượt quá 2 ký tự"),
    yearExpire: z
        .string()
        .max(2, "Không được vượt quá 2 ký tự"),
    cvv: z
        .string()
        .min(3, "Ít nhất 3 ký tự")
        .max(4, "Không được vượt quá 4 ký tự")
});

type PaymentFormValue = z.infer<typeof formSchema>;

interface PaymentFormProps {
    onCreate: (data: AxiosRequestConfig) => Promise<void>;
    provider: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onCreate, provider }) => {
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        fullname: '',
        cardNumber: '',
        monthExpire: '',
        yearExpire: '',
        cvv: ''
    };

    const form = useForm<PaymentFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Submit form
    const onSubmit = async (data: PaymentFormValue) => { 
        const body = {
            paymentMethod: provider,
            cardHolderName: data.fullname,
            cardNumber: data.cardNumber,
            expirationDate: `${data.monthExpire}-${data.yearExpire}`,
            cvv: data.cvv
        };

        await onCreate(body as AxiosRequestConfig);
    };

    return (
        <>
            <div className='p-3 bg-main mb-1.5 rounded-sm text-sm'>
                Thẻ không hợp lệ
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="md:grid gap-1.5">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên người dùng trên thẻ</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nhập đầy đủ tên..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số thẻ</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            placeholder="Nhập số thẻ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-3'>
                                <FormField
                                    control={form.control}
                                    name="monthExpire"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Thời hạn</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    disabled={loading}
                                                    placeholder="MM"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="yearExpire"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>‎</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    disabled={loading}
                                                    placeholder="YY"
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
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex items-center gap-1'>
                                            <FormLabel>CVV</FormLabel>
                                            <HelpCircle className='w-4 cursor-pointer'/>
                                        </div>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                placeholder="Nhập CVV..."
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
                        Xác nhận tạo
                    </Button>
                </form>
            </Form>
        </>
    );
};