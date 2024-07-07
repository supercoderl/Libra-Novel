import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type BreadCrumbType = {
    title: string;
    link: string;
};

type BreadCrumbPropsType = {
    isDashboard: boolean;
    items: BreadCrumbType[];
    className?: string;
};

export default function BreadCrumb({ items, isDashboard, className }: BreadCrumbPropsType) {
    return (
        <div className={`mb-4 flex items-center space-x-1 text-sm text-muted-foreground ${className}`}>
            <Link
                href={isDashboard ? '/dashboard' : '/'}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
                { isDashboard ? "Bảng điều khiển" : "Trang chủ"}
            </Link>
            {items?.map((item: BreadCrumbType, index: number) => (
                <React.Fragment key={item.title}>
                    <ChevronRightIcon className="h-4 w-4" />
                    <Link
                        href={item.link}
                        className={cn(
                            'font-medium',
                            index === items.length - 1
                                ? 'pointer-events-none text-foreground'
                                : 'text-muted-foreground',
                            className?.includes("text-white") && 'text-white'
                        )}
                    >
                        {item.title}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
}