"use client"

import BreadCrumb from "@/components/breadcrumb";
import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CirclePlus, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import useAxios from "@/hooks/useAxios";
import { OnApproveData } from "@paypal/paypal-js";
import { useToast } from "@/components/ui/use-toast";
import { provider } from "@/constants/data";
import { PaymentForm } from "@/components/forms/payment-form";
import { AxiosRequestConfig } from "axios";
import { CardType } from "@/types";
import { getIcon, maskCardNumber } from "@/utils/payment";
import Spinner from "@/components/ui/spinner";

const breadcrumbItems = [{ title: 'Thanh toán', link: '/dashboard/payment' }];

export default function Page() {
    const [activeCard, setActiveCard] = useState(1);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    const [type, setType] = useState<string>('');
    const axios = useAxios();
    const { toast } = useToast();

    const handleCardClick = (id: number) => {
        setActiveCard(id);
    };

    // const showTransactions = (id: number) => {
    //     return cards.find(c => c.cardID === id)?.map((transaction: any, index: number) => (
    //         <Transaction key={index} transaction={transaction} />
    //     ));
    // };

    const createOrder = async () => {
        return await axios.post("/create-order").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                return data?.data?.id;
            }
            return "";
        });
    }
    const onApprove = async (data: OnApproveData) => {
        return await axios.get(`/capture-order/${data.orderID}`).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                const lastname = data?.data?.payer?.name?.given_name;
                const firstname = data?.data?.payer?.name?.surname;
                toast({
                    variant: 'default',
                    title: 'Chúc mừng.',
                    description: `Thanh toán thành công từ khách hàng ${lastname} ${firstname}`
                });
            }
        });
    }

    const onCreate = async (data: AxiosRequestConfig) => {
        await axios.post("/create-card", data).then(({ data }) => {
            if (data && data.succeeded) {
                toast({
                    variant: 'default',
                    title: 'Chúc mừng.',
                    description: "Tạo thẻ thành công"
                });
                setOpenForm(false);
                setOpen(false);
            }
        });
    }

    const onLoadCards = async () => {
        await axios.get("get-cards").then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setCards(data.data);
                onLoadCards();
            }
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        onLoadCards();
    }, [])

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} isDashboard />

                <div className="w-full py-5">
                    <div className="w-full mx-auto my-0 rounded-sm flex shadow-wallet">
                        <aside className="w-[30%] bg-[#f2f2f2] p-[20px]">
                            <div className="flex gap-1 items-center justify-between">
                                <h2 className="inline-block text-2xl">Cài đặt ví</h2>
                                <Wallet />
                            </div>
                            <div className="mt-[40px] flex flex-col gap-5">
                                {loading && <Spinner className="w-20 h-20 m-auto" />}
                                {cards.map((card, index) => (
                                    <Card key={index} card={card} onClick={handleCardClick} isActive={card.cardID === activeCard} />
                                ))}
                                <div
                                    className="flex items-center gap-1.5 flex-col border-2 border-dashed border-[#7b2cbf] rounded-sm py-[30px] px-[10px] hover:scale-105 transition duration-300 cursor-pointer"
                                    onClick={() => setOpen(true)}
                                >
                                    <CirclePlus className="w-8 h-8" />
                                    <h3 className="dynamic-message"> Thêm phương thức thanh toán </h3>
                                </div>
                            </div>
                        </aside>

                        <div className="w-[70%] p-[20px]">
                            <h2 className="text-2xl">
                                Giao dịch gần đây
                                <span className="inline-block float-right font-semibold text-[32px] text-[#444750] before:content-['$']">0</span>
                            </h2>
                            <div className="mt-[40px] h-[550px] flex flex-col gap-8 overflow-hidden">
                                {/* <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                /> */}
                                {/* {showTransactions(activeCard)} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Thêm phương thức thanh toán" description={""} isOpen={open} onClose={() => setOpen(false)}>
                <div className="flex items-center justify-center gap-5 py-5">
                    {
                        provider.map((item) => (
                            <div
                                key={item.id}
                                className="w-28 bg-no-repeat bg-cover rounded-sm cursor-pointer hover:scale-105 transition duration-300"
                                onClick={() => {
                                    setOpenForm(true);
                                    setType(item.label);
                                }}
                            >
                                <img className="w-full h-full" src={item.img} alt="" />
                            </div>
                        ))
                    }
                </div>
            </Modal>

            <Modal title="Thêm phương thức thanh toán" description={""} isOpen={openForm} onClose={() => setOpenForm(false)}>
                <PaymentForm onCreate={onCreate} provider={type} />
            </Modal>
        </ScrollArea>
    )
}

const Card: React.FC<{ card: CardType, onClick: any, isActive: boolean }> = ({ card, onClick, isActive }) => (
    <div className={cn(
        `p-[15px] bg-white rounded-sm border-2 hover:scale-105 transition duration-300 cursor-pointer`,
        isActive && 'active border-4 border-[#8393ca]'
    )} onClick={() => onClick(card.cardID)}>
        <div className="inline-block h-[40px] w-[58px] bg-no-repeat	bg-cover rounded-sm mb-[10px]">
            <img src={getIcon(card.paymentMethod)} alt="" />
        </div>
        <div className="text-[#666666]">{maskCardNumber(card.cardNumber)}</div>
        <div className="text-[#b3b3b3]">Valid Thru: {card.expirationDate}</div>
    </div>
);

const Transaction: React.FC<{ transaction: any }> = ({ transaction }) => (
    <div className={`border-2 rounded-sm p-3 relative flex justify-between items-center ${transaction.type}`}>
        <div className="transaction-item_details">
            <h3 className="text-xl">{transaction.name}</h3>
            <span className="text-sm text-[#999]">
                {transaction.category} {transaction.ID} - {transaction.date}
            </span>
        </div>
        <div className="flex items-center gap-1 text-xl">
            <span className="text-[#66cc33]">$</span>
            <p className="text-[#66cc33]">{transaction.amount}</p>
        </div>
    </div>
);