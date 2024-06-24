import { Heading } from "@/components/ui/heading";
import ChapterItem from "./item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Chapter } from "@/types";

const ChapterGrid: React.FC<{ novelID: Number, chapters: Chapter[] }> = ({ novelID, chapters }) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Chương (${chapters?.length || 0})`}
                    description="Quản lý chương"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/library/${novelID}/chapter/create`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm mới
                </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-6 gap-5">
                {
                    chapters && chapters.length > 0 &&
                    chapters.map((chapter, index) => (
                        <ChapterItem key={index} chapterID={chapter.chapterID} chapterNumber={chapter.chapterNumber}/>
                    ))
                }
            </div>  
        </>
    )
}

export default ChapterGrid;