import { cn } from "@/lib/utils"
import React from "react"

type T = {
    values: any[];
    className?: string;
    type: string;
    field: {
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
        name: string;
    }
}

export const RadioBox = ({ className, values, type, field, ...props }: T) => {
    return (
        <div className="flex gap-3">
            {
                values.map((item, index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            className={"hidden"}
                            value={item.value}
                            id={item.value}
                            name={field.name}
                        />
                        <label
                            htmlFor={item.value}
                            className={cn(
                                "bg-white flex items-center rounded-sm cursor-pointer w-1/3 h-10 gap-1 px-3 border-2 border-solid border-lightgray transition duration-300",
                                field.value === item?.value && "bg-main border-main"
                            )}
                            onClick={() => field.onChange({ target: { value: item.value, name: field.name } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            <div
                                className={cn(
                                    "h-4 w-4 bg-gray-300 rounded-full relative before:absolute before:content-[''] before:scale-150 before:opacity-0 before:top-2/4 transition duration-300 before:left-2/4 before:w-6/12 before:h-3/6 before:bg-main before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-md",
                                    field.value === item?.value && "bg-white before:opacity-1 before:scale-100"
                                )}
                            ></div>
                            <span
                                className={cn(
                                    "text-sm text-gray-500",
                                    field.value === item?.value && "text-white"
                                )}
                            >{item?.label}</span>
                        </label>
                    </React.Fragment>
                ))
            }
        </div>
    )
}