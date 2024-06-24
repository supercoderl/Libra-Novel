import { MessageSquareMore } from "lucide-react";

export default function CommentSection() {
    return (
        <div className="w-full text-white py-10">
            <h3 className="text-2xl border-b-2 mb-5 flex items-center gap-1">
                <MessageSquareMore className="w-5" />
                Bình luận
            </h3>
            <div className="w-full py-2 flex flex-col gap-5">
                <div className="flex items-center space-x-2">
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
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 self-start">
                        <img src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className="h-9 w-9 object-fill rounded-full" />
                    </div>

                    <div className="w-full">
                        <div className="block p-1 bg-trending rounded-md">
                            <div className="w-auto rounded-xl px-2">
                                <div className="font-medium">
                                    <a href="#" className="hover:text-main">
                                        <small>Nirmala</small>
                                    </a>
                                </div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
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

                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 self-start">
                        <img src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className="h-9 w-9 object-cover rounded-full" />
                    </div>

                    <div className="w-full">
                        <div className="block p-1 bg-trending rounded-md">
                            <div className="w-auto rounded-xl px-2">
                                <div className="font-medium">
                                    <a href="#" className="hover:text-main">
                                        <small>Arkadewi</small>
                                    </a>
                                </div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
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
                                        <small>15 hour</small>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}