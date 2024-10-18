import { useEffect, useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import Svgs from "@/Assets/Svgs"

export function Dropdown({
    options, placeholder, titleStyle, error, title, name, value, onChange, required, disabled, searchPlaceholder, onEnterSubmit,
    shouldFilter = false, noValue
}) {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectValue] = useState(value || "")
    const [searchTerm, setSearchTerm] = useState("") // State to track search input

    useEffect(() => {
        setSelectValue(value)
    }, [value])

    // handle onChange here
    const handleChange = (currentValue) => {
        setSelectValue(currentValue)
        const selectedItm = options?.find(itm => itm?.label == currentValue || itm?.value == currentValue)
        console.log(selectedItm)
        setOpen(false)
        if (onChange) {
            onChange({ target: { name: name, value: selectedItm?.value || selectedItm?.value === false ? selectedItm?.value : selectedItm?.label || currentValue } }); // Call external change handler if provided
        }
    }

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() == "enter" && !disabled) {
            onEnterSubmit && onEnterSubmit();
        }
    };

    const handleOpenChange = (isOpen) => {
        // Only allow opening if not disabled
        if (!disabled) {
            setOpen(isOpen);
        }
    };

    const filteredOptions = options?.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) // Custom search logic
    );

    const selectedOption = selectedValue || selectedValue === false
        ? options?.length > 0 ? options?.find(itm => itm?.value === selectedValue || itm?.label === selectedValue) : null
        : null;
    const displayLabel = selectedOption ? selectedOption?.label || selectedOption?.value : placeholder;

    return (
        <div className="relative w-full">
            {title &&
                <label className={`text-[#807D8D] text-[14px] font-[300] ${titleStyle ? titleStyle : ''}`}>{title}
                    {required && <span className='text-[#0D99FF] text-[16px] '> *</span>}
                </label>
            }
            <Popover open={open} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`w-full ${placeholder && !selectedValue && "text-gray-500"} ${(options?.length == 0 || !options || disabled) && "bg-gray-200 cursor-not-allowed"} justify-between focus-visible:ring-0 focus-visible:ring-offset-0 ${error ? 'border-red-600' : 'border-gray-300'}`}
                    >
                        {selectedValue || selectedValue === false
                            ? noValue ? "" : displayLabel
                            : placeholder}
                        {options && options?.length > 0 ? <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> : ""}
                    </Button>
                </PopoverTrigger>
                {(options && options?.length > 0 && !disabled) &&
                    <PopoverContent className="w-[200px] p-0 z-[99999]">
                        <Command
                            filter={(value, search) => {
                                if (value?.includes(search)) return 1;
                                return 0;
                            }}
                            shouldFilter={shouldFilter}>
                            <CommandInput
                                placeholder={searchPlaceholder ? searchPlaceholder : "Search ..."}
                                onKeyDown={handleKeyPress}
                                onValueChange={setSearchTerm} // Update searchTerm when the input changes
                            />
                            <CommandList>
                                <CommandEmpty>No Value found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredOptions?.map((framework) => ( // Use filtered options
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={handleChange}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedValue === framework?.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {framework?.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                }
            </Popover>
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
    )
}
