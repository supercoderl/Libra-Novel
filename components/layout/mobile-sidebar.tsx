'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuContext } from '@/contexts/AppProvider';
import { MenuIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import Spinner from '../ui/spinner';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
    const [open, setOpen] = useState(false);
    const { menus, loading } = useContext(MenuContext);

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Tổng quan
                            </h2>
                            <div className="space-y-1">
                                {
                                    loading ?
                                        <Spinner className='w-12 h-12 m-auto' />
                                        :
                                        <DashboardNav
                                            items={menus}
                                            isMobileNav={true}
                                            setOpen={setOpen}
                                        />
                                }

                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}