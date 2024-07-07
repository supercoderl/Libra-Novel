import { cn } from "@/lib/utils";
import { Novel } from "@/types";
import { Search, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchComponent: React.FC<{ data: Novel[] }> = ({ data }) => {
    const [userInput, setUserInput] = useState('');
    const [filteredWords, setFilteredWords] = useState<Novel[]>([]);
    const [show, setShow] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setUserInput(input);
    };

    useEffect(() => {
        if (userInput.length === 0) {
            setFilteredWords([]);
            setShow(false);
        } else {
            const filtered = data
                .filter(e => e.title.toLowerCase().includes(userInput))
                .sort()
                .splice(0, 5);
            setFilteredWords(filtered);
            setShow(true);
        }
    }, [userInput, data]);

    return (
        <div className="hidden bg-search rounded gap-1.5 py-1.5 px-3 md:flex relative">
            <Search className="text-gray-400 z-20 w-4" />
            <input
                type="text"
                className="bg-transparent text-sm text-white w-96 z-0 focus:shadow focus:outline-none"
                placeholder="Tìm truyện..."
                value={userInput}
                onChange={handleInputChange}
            />
            <ul className={
                cn(
                    "absolute bg-border top-10 rounded-sm z-10 left-0 w-full transition duration-500",
                    !show && "hidden"
                )
            }>
                {filteredWords.map((item, index) => (
                    <li key={index} className={cn(
                        item.title === userInput && 'match',
                        "p-2 border-b-2 rounded-sm border-gray-300 overflow-hidden hover:bg-description cursor-pointer"
                    )}>
                        <Link
                            href={`/novel/${item.novelID}`}
                            className="flex gap-2 overflow-hidden"

                        >
                            <img className="w-10 rounded-sm" src={item.coverImage || process.env.NEXT_PUBLIC_DUMMY_IMAGE} alt={item.img_des || ""} />
                            <div>
                                <h5 className="text-md font-semibold truncate">{item.title}</h5>
                                <span className="text-xs text-gray-500 truncate">{item.description}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {
                userInput && userInput.length > 0 && <X className="text-white z-20 w-4 cursor-pointer" onClick={() => setUserInput("")} />
            }
        </div>
    );
};

export default SearchComponent;