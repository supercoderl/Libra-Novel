export const Forbidden = () => {
    return (
        <div className="bg-[#f4f4f4] relative mx-auto my-3 py-10 md:py-12 px-2 md:px-44 border-2 border-[#e9ecf0] rounded-md">
            <div className="top-3 left-3 w-4 h-4 md:w-10 md:h-10 absolute rounded-full transform rotate-45 bg-custom-radial"></div>
            <div className="top-3 right-3 w-4 h-4 md:w-10 md:h-10 absolute rounded-full transform rotate-45 bg-custom-radial"></div>
            <div className="bottom-3 left-3 w-4 h-4 md:w-10 md:h-10 absolute rounded-full transform rotate-45 bg-custom-radial"></div>
            <div className="bottom-3 right-3 w-4 h-4 md:w-10 md:h-10 absolute rounded-full transform rotate-45 bg-custom-radial"></div>
            <header className="bg-[#ef5350] rounded-t-[30px] text-center py-3 relative">
                <h1 className="uppercase text-[#f4f4f4] text-[2em] md:text-[4.5em] leading-[1.1em] tracking-[2px] m-0 font-bold">403 <br /> Bạn đã bị cấm</h1>
                <div className="absolute w-[25%] h-[5px] md:h-[10px] bg-white top-6 left-10 md:left-20"></div>
                <div className="absolute w-[25%] h-[5px] md:h-[10px] bg-white top-6 right-10 md:right-20"></div>
            </header>
            <section className="flex flex-nowrap">
                <div className="basis-[50%] md:basis-[60%]">
                    <h2 className="text-center text-[#1d1e22] text-[1em] md:text-[3em] uppercase font-semibold my-[30px] md:my-[40px] leading-tight">Cần được cấp quyền</h2>
                    <p className="text-center text-[#1d1e22] text-xs md:text-md"><strong>Lỗi 403: Bị cấm</strong>. Bạn không có quyền truy cập vào trang này.</p>
                </div>
                <div className="basis-[50%] md:basis-[40%]">
                    <svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                        <defs>
                            <pattern id="image" patternUnits="userSpaceOnUse" height="450" width="450">
                                <image x="25" y="25" height="450" width="450" xlinkHref="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"></image>
                            </pattern>
                        </defs>
                        <circle cx="250" cy="250" r="200" strokeWidth="40px" stroke="#ef5350" fill="url(#image)" />
                        <line x1="100" y1="100" x2="400" y2="400" strokeWidth="40px" stroke="#ef5350" />
                    </svg>
                </div>
            </section>
        </div>
    )
}