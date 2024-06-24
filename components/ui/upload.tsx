import * as React from 'react';

export interface UploadProps {
    url: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>; 
    type: string;
    accept: string;
}

const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
    ({ onChange, url, type, accept }) => {
        const inputFileRef = React.useRef<HTMLInputElement>(null);

        const handleDivClick = () => {
            if (inputFileRef.current) {
                inputFileRef?.current?.click();
            }
        };

        return (
            <div onClick={handleDivClick} id="dropZoon" className="group relative h-full flex justify-center items-center flex-col border-2 border-dashed border-blue-300 rounded-md cursor-pointer duration-500 transition hover:border-blue-500">
                <span className="group-hover:opacity-0.7 flex text-2xl text-blue-300 transition duration-500">
                    <i className='bx bxs-file-image'></i>
                </span>
                <p className="text-lg text-gray-400 group-hover:opacity-0.7">Chọn hình ảnh</p>
                <img
                    src={url}
                    alt="Preview Image"
                    id="previewImage"
                    className="absolute top-0 left-0 w-full h-full object-contain p-2 rounded-md z-1000 duration-500 transition" draggable="false" />
                <input
                    type={type}
                    ref={inputFileRef}
                    id="fileInput"
                    className="hidden"
                    accept={accept}
                    onChange={onChange}
                />
            </div>
        );
    }
);
Upload.displayName = 'Upload';

export { Upload };