import * as React from "react";
import { cn } from "@/lib/utils";
import Svgs from "@/Assets/Svgs";
import { Textarea } from "@/Components/ui/textarea";

const TextArea = React.forwardRef(({
    label,
    required,
    value,
    error,
    onChange,
    className,
    parentStyle,
    disabled,
    labelStyle,
    onEnterSubmit,
    resizable,
    rows = 5,
    ...props }, ref) => {

    const handleKeyPress = (e) => {

        if (e.key.toLowerCase() === "enter" && !disabled) {
            onEnterSubmit && onEnterSubmit();
        }
    };

    return (
        <div className={`w-full relative ${parentStyle ? parentStyle : ''}`}>
            {label && (
                <label className={`text-[#807D8D] text-[14px] font-[300] ${labelStyle ? labelStyle : ''}`}>
                    {label}
                    {required && <span className='text-[#0D99FF] text-[16px]'> *</span>}
                </label>
            )}
            <div className="relative h-full">
                <Textarea
                    onKeyDown={handleKeyPress}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    rows={rows}
                    className={cn(
                        "flex w-full focus-visible:ring-offset-0 focus-visible:ring-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-red-600" : "",
                        resizable ? "resize" : "resize-none",
                        className
                    )}

                    ref={ref}
                    {...props}
                />
            </div>
            {error && typeof error === "string" ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    {error}
                </p>
            ) : typeof error === "boolean" && error === true ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    This field is required
                </p>
            ) : (
                ""
            )}
        </div>
    );
});

TextArea.displayName = "TextArea";

export { TextArea };
