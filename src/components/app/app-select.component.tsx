"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ItemList } from "@/app/features/expense-drawer/item-list.model"
import { Label } from "@radix-ui/react-label"

type Props = {
    list: ItemList[],
    title: string,
    label?: string,
    placeholder?: string,
    notFoundMessage?: string,
    expand?: boolean,
    onChange: (option: ItemList) => void
}

export const AppCombobox: React.FC<Props> = ({
    list,
    title,
    label,
    placeholder = "Buscar ...",
    notFoundMessage = "Sin resultados ...",
    expand = false,
    onChange
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="grid gap-3">
                    {label && <Label className="text-sm capitalize">{label}</Label>}
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`justify-between ${expand ? "w-full" : ""}`}
                    >
                        {value
                            ? list.find((framework) => framework.description === value)?.description
                            : title}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className={`p-0`}>
                <Command>
                    <CommandInput placeholder={placeholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{notFoundMessage}</CommandEmpty>
                        <CommandGroup>
                            {list.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.description}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onChange(option)
                                    }}
                                >
                                    {option.description}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.description ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
