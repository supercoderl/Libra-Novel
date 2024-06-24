import { fetchAllChapters } from "@/app/actions/chapterActions";
import { Button } from "@/components/ui/button";
import { Chapter, Novel } from "@/types";
import dateFormatter from "@/utils/date";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";

const NovelInfo: React.FC<{ novel?: Novel | null }> = ({ novel }) => {
    const [chapters, setChapters] = useState([]);

    const onLoadData = async (novelID: number) => {
        await fetchAllChapters(1, 10, novelID).then((value) => {
            if (value && value.succeeded && value.data) {
                setChapters(value.data.items);
            }
        });
    }

    useEffect(() => {
        if (novel) {
            onLoadData(novel?.novelID);
        }
    }, [novel]);

    return (
        <div className="md:flex gap-8">
            <img className="m-auto w-44 md:w-72" src={novel?.coverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt={novel?.img_des || ""} />

            <div className="text-white flex-1 mt-5 md:mt-0">
                <h4 className="font-normal">WATCH</h4>
                <h3 className="font-bold text-2xl md:py-3">{novel?.title}</h3>
                <p className="pt-4 pb-2">
                    <b className="text-description">Other name: </b>
                    <span className="text-sm font-light text-justify">{novel?.other_name}</span>
                </p>
                <p className="pb-3">
                    <b className="text-description">Genres: </b>
                    <span className="text-sm font-light">{novel?.genre}</span>
                </p>
                <p className="pb-3">
                    <b className="text-description">Date aired: </b>
                    <span className="text-sm font-light">{dateFormatter(novel?.publishedDate)}</span>
                </p>
                <div className="grid md:flex gap-4">
                    <p>
                        <b className="text-description">Status: </b>
                        <span className="text-sm font-light">{Number(novel?.status) === 1 ? 'Đang tiến hành' : 'Đã hoàn thành'}</span>
                    </p>
                    <p>
                        <b className="text-description">Views: </b>
                        <span className="text-sm font-light">{novel?.view_num}</span>
                    </p>
                    <p>
                        <b className="text-description">Favorites: </b>
                        <span className="text-sm font-light">{novel?.favor_num}</span>
                    </p>
                    <Link
                        activeClass="Bookmark"
                        to="b"
                        smooth={true}
                        offset={50}
                        duration={500}
                        className="cursor-pointer flex gap-1 items-center text-facebook underline hover:text-main transition-all duration-500"
                    >
                        <CirclePlus className="w-4" />
                        Bookmark
                    </Link>
                </div>
                <p className="mt-5">
                    <b className="text-description">Summary: </b>
                    <span className="text-sm font-light text-justify">{novel?.description}</span>
                </p>
            </div>

            <div className="mt-5 md:mt-0 px-3 py-5 w-full md:w-1/6 bg-trending rounded-md">
                <p className="text-description">Chương 1-{chapters?.length}</p>
                <br />
                <div className="grid grid-cols-2 gap-2">
                    {
                        chapters && chapters.length > 0 &&
                        chapters.map((chapter: Chapter, index) => (
                            <Button
                                key={index}
                                className="bg-main text-brown hover:bg-brown hover:text-white"
                                onClick={() => window.location.href = `/novel/${novel?.novelID}/chapter/${chapter?.chapterID}`}
                            >{chapter.chapterNumber}</Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NovelInfo;