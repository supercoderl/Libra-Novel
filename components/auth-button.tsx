'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Icons } from './icons';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/text';

export const SocialSignInButton: React.FC<{ type: string }> = ({ type }) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    return (
        <Button
            className="w-full !mt-4"
            variant="outline"
            type="button"
            onClick={() =>
                signIn(type, { callbackUrl: callbackUrl ?? '/dashboard' })
            }
        >
            <span className='m-auto flex items-center'>
                {
                    type === "github"
                        ?
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                        :
                        type === "google"
                            ?
                            <Icons.google className="mr-2 h-4 w-4" />
                            :
                            <Icons.discord className="mr-2 h-4 w-4" />
                }
                Đăng nhập bằng {capitalizeFirstLetter(type)}
            </span>
        </Button>
    );
}