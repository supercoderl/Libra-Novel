'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from './ui/tooltip';

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
    isMobileNav?: boolean;
}

export function DashboardNav({
    items,
    setOpen,
    isMobileNav = false
}: DashboardNavProps) {
    const path = usePathname();
    const { isMinimized } = useSidebar();

    if (!items?.length) {
        return null;
    }



    return (
        <nav className="grid items-start gap-2">
            <TooltipProvider>
                {items.map((menu, index) => {
                    const Icon = Icons[menu.icon || 'arrowRight'];
                    return (
                        menu.path && (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={menu.disabled ? '/' : menu.path}
                                        className={cn(
                                            'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                            path === menu.path ? 'bg-accent' : 'transparent',
                                            menu.disabled && 'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                    >
                                        <Icon className={`ml-3 size-5`} />

                                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                            <span className="mr-2 truncate">{menu.title}</span>
                                        ) : (
                                            ''
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    align="center"
                                    side="right"
                                    sideOffset={8}
                                    className={!isMinimized ? 'hidden' : 'inline-block'}
                                >
                                    {menu.title}
                                </TooltipContent>
                            </Tooltip>
                        )
                    );
                })}
            </TooltipProvider>
        </nav>
    );
}