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
            className="w-full flex justify-start px-20 items-center !mt-4"
            variant="outline"
            type="button"
            onClick={() =>
                signIn(type, { callbackUrl: callbackUrl ?? '/dashboard' })
            }
        >
            {
                type === "facebook"
                    ?
                    <Icons.facebook className="mr-2 h-4 w-4" />
                    :
                    type === "google"
                        ?
                        <Icons.google className="mr-2 h-4 w-4" />
                        :
                        <Icons.apple className="mr-2 h-4 w-4" />
            }
            Continue with {capitalizeFirstLetter(type)}
        </Button>
    );
}