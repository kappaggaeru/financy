import React from "react";
import { Calendar } from "../ui/calendar"

type Props = {
    onChange: (date: Date | undefined) => void
}

export const AppCalendar: React.FC<Props> = ({onChange}) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const handleSelect = (d: Date | undefined) => {
        setDate(d);
        onChange(d);
    }

    return (
        <div>
            <Calendar
                mode="single"
                defaultMonth={date}
                selected={date}
                onSelect={handleSelect}
                className="rounded-lg border shadow-sm mx-auto"
            />
        </div>
    )
}