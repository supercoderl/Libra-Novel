import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Spinner from "@/components/ui/spinner";
import useAxios from "@/hooks/useAxios";
import { Genre } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GenreNav: React.FC<{ children: any }> = ({ children }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    //Load genre list
    const onLoadData = async () => {
        await axios.get(`/get-genres`).then(({ data }) => {
            if (data && data.succeeded) {
                setGenres(data.data.items);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    useEffect(() => {
        onLoadData();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className="cursor-pointer text-white hover:text-main block px-3 py-2 text-base font-medium transition-all duration-500">{children}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px] flex flex-wrap" align="center" forceMount>
                {
                    genres && genres.length > 0 ?
                        genres.map((genre, index) => (
                            <DropdownMenuItem key={index} className='cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                                <Link
                                    href={{ pathname: `/genre/${genre.genreID}`, query: { name: genre.name } }}
                                >
                                    {genre.name}
                                </Link>
                            </DropdownMenuItem>
                        ))
                        :
                        <Spinner className="w-12 h-12 m-auto" />
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GenreNav;