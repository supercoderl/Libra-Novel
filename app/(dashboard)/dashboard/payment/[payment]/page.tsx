"use client";

import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useSearchParams } from 'next/navigation';
import { AxiosRequestConfig } from 'axios';
import { CheckCircle, CircleX } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

export default function Page() {
    const axios = useAxios();
    const params = useSearchParams();
    const [status, setStatus] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const breadcrumbItems = [
        { title: 'Thanh toán', link: '/dashboard/payment' },
        { title: 'Kết quả', link: '/dashboard/payment/callback' },
    ];

    const saveTransaction = async () => {
        // const callBackData = {
        //     transactionID: params.get("vnp_TransactionNo"),
        //     cardID: 1,
        //     amount: params.get("vnp_Amount"),
        //     transactionDate: params.get("vnp_PayDate"),
        //     description: params.get("vnp_OrderInfo"),
        //     bankCode: params.get("vnp_BankCode"),
        //     bankTranNo: params.get("vnp_BankTranNo"),
        //     cardType: params.get("vnp_CardType"),
        //     responseCode: params.get("vnp_ResponseCode"),
        //     tnxRef: params.get("vnp_TxnRef"),
        //     transactionStatus: params.get("vnp_TransactionStatus") === "00" ? "success" : "fail"
        // };

        // await axios.post("/store-transaction-vnpay", callBackData).then(({ data }) => {
        //     if (data && data.succeeded) setStatus("success");
        //     else setStatus("fail");
        // }).catch(() => setStatus("fail")).finally(() => setLoading(false));
    }

    useEffect(() => {
        saveTransaction();
    }, []);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} isDashboard />

                <div className="flex justify-center items-center">
                    <div className="w-[500px]">
                        <div className="shadow-success border-b-4 border-[#28a745] p-[45px] w-full text-center my-[40px] mx-auto">
                            {
                                loading && <Spinner className="w-16 h-16 m-auto" />
                            }
                            {
                                status && (status === "success" ?
                                    <CheckCircle className='w-16 h-16 m-auto' />
                                    :
                                    <CircleX className='w-16 h-16 m-auto' />)
                            }
                            <h2 className='mb-4 text-2xl mt-5'> {status && (status === "success" ? 'Thanh toán thành công' : 'Thanh toán thất bại')} </h2>
                            <p className='mb-0 text-[#495057] font-semibold'>
                                {
                                    status && (status === "success" ?
                                        `Cảm ơn đã thanh toán. Chúng tôi thực sự
                                        biết ơn vì đã chọn chúng tôi làm
                                        nhà cung cấp dịch vụ.`
                                        :
                                        `Xin lỗi vì điều này. Bạn cần thực hiện 
                                        thanh toán lại hoặc liên hệ với 
                                        chúng tôi qua hotline 18000000`)
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}