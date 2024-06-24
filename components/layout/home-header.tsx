'use client'

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Search, Slash, Tally1Icon } from "lucide-react";
import Link from "next/link";

export default function HomeHeader() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className="w-full z-10">
                <div className="w-full">
                    <div className="flex items-center h-20 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex justify-center items-center flex-shrink-0 ">
                                <h1 className="font-bold text-xl cursor-pointer text-white" onClick={() => window.location.href = "/"}>
                                    Libra<span className="text-main">Novel</span>
                                </h1>
                            </div>
                            <div className="hidden bg-search rounded gap-1 py-1.5 px-3 md:flex">
                                <Search className="text-gray-400 z-20 w-4" />
                                <input
                                    type="text"
                                    className="bg-transparent text-sm text-white w-96 z-0 focus:shadow focus:outline-none"
                                    placeholder="Tìm truyện..."
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/"
                                        className="cursor-pointer text-white font-normal text-md px-3 hover:text-main transition-all duration-500"
                                    >
                                        Trang chủ
                                    </Link>
                                    <Link
                                        href="/"
                                        className="cursor-pointer hover:text-main text-white font-normal px-3 transition-all duration-500"
                                    >
                                        Thể loại
                                    </Link>
                                    <Link
                                        href="/"
                                        className="cursor-pointer hover:text-main text-white font-normal px-3 transition-all duration-500"
                                    >
                                        Cộng đồng
                                    </Link>

                                    <Link
                                        href="/"
                                        className="cursor-pointer hover:text-main text-white font-normal px-3 transition-all duration-500"
                                    >
                                        Sáng tác
                                    </Link>

                                    <div className="flex items-center">
                                        <Link
                                            href="/login"
                                            className="cursor-pointer text-white font-medium transition-all duration-500 hover:text-main"
                                        >
                                            Đăng nhập
                                        </Link>
                                        <Tally1Icon className={`ml-3 size-5 text-white`} />
                                        <Link
                                            href="/register"
                                            className="cursor-pointer font-medium rounded bg-red-300 py-1 px-4 hover:bg-transparent transition-all duration-500 hover:text-white hover:border-2 border-2 border-transparent hover:border-white"
                                        >
                                            Đăng ký
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex md:hidden gap-3">
                            <button>
                                <svg className="block h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#fff" /></svg>
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center text-white hover:bg-blue-600 border-2 border-white rounded-sm p-1"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    
                >
                    {() => (
                        <div className="md:hidden relative z-10" id="mobile-menu">
                            <div
                                // ref={ref}
                                className="absolute w-full rounded-sm bg-background-custom pt-2 pb-3"
                            >
                                <Link
                                    href="/"
                                    className="cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Trang chủ
                                </Link>
                                <Link
                                    href="/"
                                    className="cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Thể loại
                                </Link>

                                <Link
                                    href="/"
                                    className="cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Cộng đồng
                                </Link>
                                <Link
                                    href="/"
                                    className="cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Sáng tác
                                </Link>

                                <Link
                                    href="/login"
                                    className="cursor-pointer text-white hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    )
}