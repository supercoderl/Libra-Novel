import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/hooks/useAxios";
import { Comment } from "@/types";
import { timeAgo } from "@/utils/date";
import { Edit, MessageSquareMore, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface CommentProps {
    className?: string;
    novelID?: number;
    chapterID?: number;
}

const CommentSection: React.FC<CommentProps> = ({ novelID, chapterID }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentID, setCommentID] = useState(-1);
    const [pageSize, setPageSize] = useState(5);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const axios = useAxios();

    //Load comment list
    const onLoadData = async () => {
        await axios.get("get-all-comments", {
            params: {
                pageIndex: 1,
                pageSize: pageSize,
                novelID: novelID,
                chapterID: chapterID
            }
        }).then(({ data }) => {
            if (data && data.succeeded && data.data) {
                setComments(data.data.items);
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    useEffect(() => {
        onLoadData();
    }, [session]);

    //Submit form
    const onSubmit = async () => {
        const body = {
            content,
            novelID: novelID,
            chapterID: chapterID
        };

        if (!content || content === "") return;

        await axios.post("create-comment", body).then(({ data }) => {
            if (data && data.succeeded) {
                setComments((prevComments) => [{ ...data.data, name: session?.user.name, avatar: session?.user.avatar }, ...prevComments]);
                setContent("");
            }
        });
    }

    const handleOpen = (commentID: number) => {
        setOpen(true);
        setCommentID(commentID);
    }

    const handleClose = () => {
        setOpen(false);
        setCommentID(-1);
    }

    //Delete item
    const onDelete = async () => {
        setOpen(false);
        await axios.delete(`/delete-comment/${commentID}`).then(({ data }) => {
            if (data && data.succeeded) {
                onLoadData();
            }
        });
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={handleClose}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="w-full text-white py-10">
                <h3 className="text-2xl border-b-2 mb-5 flex items-center gap-1">
                    <MessageSquareMore className="w-5" />
                    Bình luận
                </h3>
                <div className="w-full py-2 flex flex-col gap-5">
                    {
                        session?.user &&
                        <div className="w-full flex gap-2">
                            <div className="group relative flex flex-shrink-0 self-start">
                                <img src={session?.user?.avatar || process.env.NEXT_PUBLIC_DUMMY_IMAGE} alt="" className="h-9 w-9 object-fill rounded-full" />
                            </div>
                            <div className="w-full">
                                <Textarea
                                    disabled={loading}
                                    placeholder="Nhập bình luận..."
                                    rows={6}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <div className="flex justify-end mt-2">
                                    <Button
                                        className="hover:bg-main hover:text-black duration-500 transition border-2 border-description"
                                        onClick={onSubmit}
                                    >
                                        Đăng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                    {/* <div className="flex items-center space-x-2">
                    <div className="group relative flex flex-shrink-0 self-start">
                        <img src="https://images.unsplash.com/photo-1507965613665-5fbb4cbb8399?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className="h-9 w-9 object-fill rounded-full" />
                    </div>

                    <div className="w-full">
                        <div className="block p-1 bg-trending rounded-md">
                            <div className="flex items-center space-x-2">
                                <div className="rounded-xl px-2">
                                    <div className="font-medium">
                                        <a href="#" className="hover:text-main">
                                            <small>Ganendra</small>
                                        </a>
                                    </div>
                                    <div>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start items-center w-full pb-2">
                                <div className="font-semibold text-white px-2 flex items-center justify-center space-x-1">
                                    <a href="#" className="hover:underline hover:text-gray-400">
                                        <small>Like</small>
                                    </a>
                                    <small className="self-center">.</small>
                                    <a href="#" className="hover:underline hover:text-gray-400">
                                        <small>Reply</small>
                                    </a>
                                    <small className="self-center">.</small>
                                    <a href="#" className="hover:underline hover:text-gray-400">
                                        <small>15 hour</small>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="reply mt-5">
                            <div className="flex items-center space-x-2">
                                <div className="flex flex-shrink-0 self-start">
                                    <img src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className="h-9 w-9 object-fill rounded-full" />
                                </div>

                                <div className="w-full block p-1 bg-trending rounded-md">
                                    <div className="w-auto rounded-xl px-2">
                                        <div className="font-medium">
                                            <a href="#" className="hover:text-main">
                                                <small>Hasan Muhammad</small>
                                            </a>
                                        </div>
                                        <div>
                                            Lasd, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center w-full">
                                        <div className="font-semibold text-white px-2 flex items-center justify-center space-x-1">
                                            <a href="#" className="hover:underline hover:text-gray-400">
                                                <small>Like</small>
                                            </a>
                                            <small className="self-center">.</small>
                                            <a href="#" className="hover:underline hover:text-gray-400">
                                                <small>Reply</small>
                                            </a>
                                            <small className="self-center">.</small>
                                            <a href="#" className="hover:underline hover:text-gray-400">
                                                <small>15 hour</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                    {
                        comments && comments.length > 0 &&
                        comments.map((comment, index) => (
                            <div className="flex items-center space-x-2" key={index}>
                                <div className="flex flex-shrink-0 self-start">
                                    <img src={comment.avatar || process.env.NEXT_PUBLIC_DUMMY_IMAGE} alt="" className="h-9 w-9 object-cover rounded-full" />
                                </div>

                                <div className="w-full">
                                    <div className="block p-1 bg-trending rounded-md">
                                        <div className="w-auto rounded-xl px-2">
                                            <div className="font-medium flex items-center justify-between">
                                                <a href="#" className="hover:text-main">
                                                    <small>{comment.name}</small>
                                                </a>
                                                {
                                                    comment.userID === session?.user?.id
                                                    &&
                                                    <div className="flex gap-1.5">
                                                        <Edit className="w-4 cursor-pointer" />
                                                        <Trash
                                                            className="w-4 cursor-pointer"
                                                            onClick={() => handleOpen(comment.commentID)}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                {comment.content}
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center w-full">
                                            <div className="font-semibold text-gray-700 px-2 text-white flex items-center justify-center space-x-1">
                                                <a href="#" className="hover:underline hover:text-gray-400">
                                                    <small>Like</small>
                                                </a>
                                                <small className="self-center">.</small>
                                                <a href="#" className="hover:underline hover:text-gray-400">
                                                    <small>Reply</small>
                                                </a>
                                                <small className="self-center">.</small>
                                                <a href="#" className="hover:underline hover:text-gray-400">
                                                    <small>{timeAgo(comment.createdDate)}</small>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {
                        loading && <Spinner className="w-12 h-12 m-auto" />
                    }
                </div>
            </div>
        </>
    )
}

export default CommentSection;