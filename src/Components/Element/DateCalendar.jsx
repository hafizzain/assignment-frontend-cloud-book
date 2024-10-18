import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { format } from "date-fns";
import moment from "moment";
import Svgs from "@/Assets/Svgs";

const DateCalendar = ({
    title,
    placeholder,
    maxDate,
    minDate,
    onChange,
    name,
    value,
    disabled,
    required,
    error,
    onEnterSubmit,
    dateFormat,
    titleStyle,
    toISOString
}) => {
    const [date, setDate] = React.useState(value || null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false); // Control Popover visibility

    React.useEffect(() => {
        if (value) {
            setDate(new Date(value))
        }
    }, [value])

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        let updatedDate = selectedDate;

        if (toISOString) {
            updatedDate = new Date(selectedDate).toISOString();
        } else if (dateFormat) {
            updatedDate = moment(selectedDate).format(dateFormat);
        }

        // Pass the updated date to the onChange function
        if (onChange) {
            onChange({ target: { name, value: updatedDate } });
        }

        // Automatically close the popover after selecting the date
        setIsPopoverOpen(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && onEnterSubmit && !disabled) {
            onEnterSubmit(); // Trigger the onEnterSubmit function when Enter key is pressed
        }
    };

    return (
        <div className="relative w-full">
            {title &&
                <label className={`text-[#807D8D] text-[14px] font-[300] ${titleStyle ? titleStyle : ''}`}>{title}
                    {required && <span className='text-[#0D99FF] text-[16px] '> *</span>}
                </label>
            }
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="flex flex-col gap-1">
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-between text-left font-normal",
                                !date && "text-muted-foreground",
                                error && "border-red-600",
                                disabled && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={disabled}
                            onKeyDown={handleKeyPress}
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)} // Toggle Popover visibility
                        >
                            {date ? format(date, "dd-MM-yyyy") : <span>{placeholder ? placeholder : "DD-MM-YYY"}</span>}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                        // disabled={(date) =>
                        //     maxDate ? date > maxDate : minDate ? date < minDate : ""
                        // }
                        fromDate={minDate ? minDate : ""}
                        toDate={maxDate ? maxDate : ""}
                    />
                </PopoverContent>
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
            </Popover>
        </div>
    );
};

export default DateCalendar;
