'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useAxios from '@/hooks/useAxios';
import { cn } from '@/lib/utils';
import { encodeEmailToNumber } from '@/utils/text';
import { LogOut, SquareArrowOutUpRight } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const UserNav: React.FC<{ btnCls?: string, isHome?: boolean }> = ({ btnCls, isHome = false }) => {
    const { data: session } = useSession();
    const axios = useAxios();

    //Sign out
    const handleSignOut = async () => {
        if (session) {
            await axios.post(`/logout`, null, {
                params: { token: session.refreshToken?.token }
            }).then(() => {
                signOut({
                    redirect: true,
                    callbackUrl: "/login"
                });
                window.localStorage.removeItem("menus");
            });
        }
    }

    if (session) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={
                        cn(
                            "relative",
                            isHome ? 'rounded-sm p-3 w-fit hover:bg-description hover:text-white duration-500 transition' : 'rounded-full w-8 h-8' 
                        )
                    }>
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={session.user?.avatar ?? ''}
                                alt={session.user?.name ?? ''}
                            />
                            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        {isHome && <p className="text-sm font-medium leading-none ml-2">
                            {session.user?.name}
                        </p>}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user?.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/user/profile/${encodeEmailToNumber(session.user?.email)}`}>
                            Trang cá nhân
                            <DropdownMenuShortcut>
                                <SquareArrowOutUpRight className='w-4' />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                            Thanh toán
                            <DropdownMenuShortcut>
                                <SquareArrowOutUpRight className='w-4' />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
                        Đăng xuất
                        <DropdownMenuShortcut>
                            <LogOut className='w-4' />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}

export default UserNav;