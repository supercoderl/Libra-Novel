'use client'

import Link from 'next/link';
import { UserAuthForm } from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import libra from '../../../public/assets/images/logo/libra.png';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const pathName = usePathname();

    //Init checking the pathname contains login or register to navigate to right state
    useEffect(() => {
        if (!pathName.includes("login") && !pathName.includes("register")) window.history.back();
    }, []);

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/examples/authentication"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute right-4 top-4 hidden md:right-8 md:top-8'
                )}
            >
                {pathName.includes("login") ? 'Đăng nhập' : 'Đăng ký'}
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {/* <div className="absolute inset-0 bg-zinc-900" /> */}
                <img
                    src='https://i.ebayimg.com/images/g/aAsAAOSwM5Bht7dH/s-l1200.jpg'
                    alt=''
                    className='absolute w-full top-0 left-0 blur-[1px] brightness-50'
                />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <h1 className="font-bold text-xl cursor-pointer text-white">
                        Libra<span className="text-main">Novel</span>
                    </h1>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;A group of young adventurers journeys through a realm of mystery and magic, confronting shadows to preserve the essence of their world.&rdquo;
                        </p>
                        <footer className="text-sm">Super Coderle</footer>
                    </blockquote>
                </div>
            </div>
            <div className={cn(
                'flex h-full items-center p-4 lg:p-8 overflow-auto',
            )}>
                <div className='flex flex-col items-center w-full'>
                    <Link className='md:hidden mb-16 inline-flex gap-2 justify-center' href='/'>
                        <Image className='w-[10%] h-auto' src={libra} alt='' />
                        <h1 className="font-bold text-3xl cursor-pointer">
                            Libra<span className="text-main">Novel</span>
                        </h1>
                    </Link>
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {pathName.includes("login") ? 'Đăng nhập' : 'Đăng ký'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Chào mừng đến với trang tiểu thuyết Libra Novel
                            </p>
                        </div>
                        <UserAuthForm state={pathName} />
                        <p className="px-6 text-center text-sm text-muted-foreground">
                            Bằng cách nhấn tiếp tục, bạn đồng ý với{' '}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Điều khoản
                            </Link>{' '}
                            và{' '}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Chính sách bảo mật
                            </Link>
                            {' '}của chúng tôi
                            .
                        </p>
                        <p className='text-sm text-center'>
                            {pathName.includes("login") ?
                                'Bạn chưa có tài khoản?'
                                :
                                'Bạn đã có tài khoản?'}
                            <a className='text-red-600' href={pathName.includes("login") ? '/register' : '/login'}>
                                {pathName.includes("login") ? ' Đăng ký ngay!' : ' Đăng nhập ngay!'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}