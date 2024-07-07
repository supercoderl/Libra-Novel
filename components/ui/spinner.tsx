import { cn } from "@/lib/utils";

const Spinner: React.FC<{ className: string }> = ({ className }) => {
    return (
        <div className={
            cn(
                "relative border-4 border-[#E7D4B5] rounded-full animate-spin border-t-[#3498db]",
                className
            )
        }></div>
    )
}

export default Spinner;