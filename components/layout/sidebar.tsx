'use client';
import React, { useContext, useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Spinner from '../ui/spinner';
import { MenuContext } from '@/contexts/AppProvider';
import { cn } from '@/lib/utils';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const { isMinimized, toggle } = useSidebar();
    const [status, setStatus] = useState(false);
    const { menus, loading } = useContext(MenuContext);

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };

    return (
        <nav
            className={cn(
                `relative hidden h-screen flex-none border-r pt-20 md:block`,
                status && 'duration-500',
                !isMinimized ? 'w-72' : 'w-[72px]',
                className
            )}
        >
            <ChevronLeft
                className={cn(
                    'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                    isMinimized && 'rotate-180'
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        {
                            loading ?
                                <Spinner className='w-12 h-12 m-auto' />
                                :
                                <DashboardNav items={menus} />
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}