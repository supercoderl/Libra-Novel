export default function Page() {
    return (
        <div className=" bg-gray-100 min-h-screen flex items-center justify-center">
            <div className=" bg-white p-8 rounded-lg shadow-md text-center">
                <img
                    src="https://res.cloudinary.com/razeshzone/image/upload/v1588316204/house-key_yrqvxv.svg"
                    className="w-16 mx-auto mb-4"
                    alt=""
                />
                <h1 className="text-6xl font-bold text-black mb-4 relative">
                    <span className="flex w-full text-center items-center justify-center">
                        <span className="block text-[120px]">4</span>
                        <span className="block text-[120px]">0</span>
                        <span className="block text-[120px] text-red-600">3</span>
                    </span>
                </h1>
                <h4 className="text-xl text-gray-700 font-bold mb-2">Quyền truy cập bị hạn chế !</h4>
                <h4 className="text-base text-gray-600 mb-4 max-w-[80%] m-auto">Bạn đã bị chặn. Yêu cầu cấp quyền để truy cập thêm, hãy liên lạc với administrator để được cấp. Bạn có thể đi đến <a href="/" className="underline text-blue-700">trang chủ</a></h4>
            </div>
        </div>
    )
}