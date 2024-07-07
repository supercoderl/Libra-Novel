"use client"

import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { MenuProvider, PermissionProvider } from '@/contexts/AppProvider';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <PermissionProvider>
            <MenuProvider>
                <Header />
                <div className="flex h-screen md:overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 md:overflow-hidden pt-16">{children}</main>
                </div>
            </MenuProvider>
        </PermissionProvider>
    );
}