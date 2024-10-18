import Svgs from "@/Assets/Svgs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";

export function Dropdown({ options, value, onChange, label, name, error, required, placeholder, optionMaxHeight, disabled }) {
    const [selectedValue, setSelectedValue] = useState(value || ""); // Initialize with props value

    const handleChange = (newValue) => {
        setSelectedValue(newValue); // Update the selected value
        if (onChange) {
            onChange({ target: { name: name, value: newValue } }); // Call external change handler if provided
        }
    };

    return (
        <div className="relative w-full custom-dropdown">
            <Select value={selectedValue} onValueChange={handleChange}>
                <SelectTrigger
                    className={`w-full ${placeholder && !selectedValue && "text-gray-500"} ${(options?.length == 0 || !options || disabled) && "bg-gray-200 cursor-not-allowed"} ${error ? 'border-red-600' : 'border-gray-300'} border rounded-md focus:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!outline-none`}>
                    <SelectValue placeholder={placeholder ? placeholder : "Select an option"} />
                </SelectTrigger>
                {options?.length > 0 &&
                    <SelectContent>
                        <SelectGroup className={`${optionMaxHeight ? optionMaxHeight : ""}`}>
                            {options?.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                }
            </Select>
            {error && typeof error == "string" ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    {error}
                </p>
            ) : typeof error == "boolean" && error == true ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    This field is required
                </p>
            ) : (
                ""
            )}
        </div>
    );
}
