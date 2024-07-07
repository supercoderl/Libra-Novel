import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import React, { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type Pagination = {
    pos: number;
    setPos: Dispatch<SetStateAction<number>>;
    isNext: boolean;
    isPrevious: boolean;
    pagesShow: number;
}

export const Pagination: React.FC<Pagination> = ({ pos, setPos, isNext, isPrevious, pagesShow }) => {
    return (
        <ul className="list-none flex justify-center items-center h-5 m-3 rounded-sm gap-2">
            <li className="page__btn">
                <Button
                    className="w-10 h-10 p-0"
                    disabled={!isPrevious}
                    onClick={() => setPos((prevPos) => prevPos - 1)}
                >
                    <ChevronLeft />
                </Button>
            </li>
            {
                pagesShow > 1 ?
                    Array.from({ length: pagesShow }, (_, index) => index + 1).map((page, index) => (
                        <li
                            key={index}
                            className={cn(
                                "text-white text-md w-10 h-10 flex justify-center items-center rounded-sm cursor-pointer",
                                pos === page && "bg-main"
                            )}
                            onClick={() => setPos(page)}
                        >
                            {page}
                        </li>
                    ))
                    :
                    <li className="text-white bg-main text-md w-10 h-10 flex justify-center items-center rounded-sm cursor-pointer">1</li>
            }
            <li className="page__btn">
                <Button
                    className="w-10 h-10 p-0"
                    disabled={!isNext}
                    onClick={() => setPos((prevPos) => prevPos + 1)}
                >
                    <ChevronRight />
                </Button>
            </li>
        </ul>
    )
}