"use client"

import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { MenuProvider, PermissionProvider } from '@/contexts/AppProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const initialOptions = {
        clientId: "AS8IL852A4spxHy8zycpPOmcwhJRr05FS08dz7UiKQhWnb-y7euglA471OBG4cFG71TbS1tDs0yOYwQI",
        currency: "USD",
        intent: "capture",
    };


    return (
        <PermissionProvider>
            <MenuProvider>
                <PayPalScriptProvider options={initialOptions}>
                    <Header />
                    <div className="flex h-screen md:overflow-hidden">
                        <Sidebar />
                        <main className="flex-1 md:overflow-hidden pt-16">{children}</main>
                    </div>
                </PayPalScriptProvider>
            </MenuProvider>
        </PermissionProvider>
    );
}