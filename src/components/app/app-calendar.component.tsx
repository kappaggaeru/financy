import React from "react";
import { Calendar } from "../ui/calendar"
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";

type Props = {
    label?: string,
    expand?: boolean,
    onChange: (date: Date | undefined) => void
}

export const AppCalendar: React.FC<Props> = ({
    label,
    expand = false,
    onChange
}) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const handleSelect = (d: Date | undefined) => {
        setDate(d);
        onChange(d);
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            {label &&
                <Label htmlFor="date" className="px-1">
                    {label}
                </Label>
            }
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className={`${expand ? "w-full" : ""} justify-between font-normal`}
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        defaultMonth={date}
                        selected={date}
                        onSelect={handleSelect}
                        className="rounded-lg border shadow-sm mx-auto"
                    />
                    {/* <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    /> */}
                </PopoverContent>
            </Popover>
        </div>
    )
}

