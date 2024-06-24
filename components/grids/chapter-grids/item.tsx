import { Card, CardDescription } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ChapterItem: React.FC<{ chapterID: number, chapterNumber: number }> = ({ chapterID, chapterNumber }) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <Card 
        onClick={() => router.push(`${pathName}/edit?chapterID=${chapterID}`)}
        className="group cursor-pointer h-64 flex items-center justify-center rounded-md hover:-translate-y-2 duration-500 transition"
        >
            <CardDescription className="text-lg group-hover:text-base font-semibold duration-500 transition">Chương {chapterNumber}</CardDescription>
        </Card>
    )
}

export default ChapterItem;