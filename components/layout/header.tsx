import ThemeToggle from '@/components/layout/theme-toggle/theme-toggle';
import Link from 'next/link';
import { MobileSidebar } from './mobile-sidebar';
import UserNav from './user-nav';
import { cn } from '@/lib/utils';

export default function Header() {
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        href={'/dashboard'}
                    >
                        <h1 className="font-bold text-xl cursor-pointer">
                            Libra<span className="text-main">Novel</span>
                        </h1>
                    </Link>
                </div>
                <div className={cn('block lg:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <UserNav />
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}