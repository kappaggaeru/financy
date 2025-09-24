"use client"
import React from "react";
import { Button } from "../ui/button";
import AppInput from "./app-input.component";
import { ItemList } from "@/app/features/expense-drawer/item-list.model";

type Props = {
    list: ItemList[],
    allowFilter?: boolean,
    placeholder?: string,
    onChange: (category: ItemList) => void
}

const AppFilterList: React.FC<Props> = ({
    list,
    allowFilter = true,
    placeholder = "Buscar",
    onChange
}) => {
    const [selected, setSelected] = React.useState(0);
    const entriesList = list.map((e) => (
        <Button
            key={e.id}
            variant={`${selected === e.id ? "default" : "outline"}`}
            className={`capitalize w-full`}
            onClick={() => handleSelect(e)}>
            {e.description}
        </Button>
    ));

    const handleSelect = (e: ItemList) => {
        setSelected(e.id);
        onChange(e);
    }

    return (
        <div className="grid gap-3">
            {allowFilter && <div>
                <AppInput id="searchBar" type="string" placeholder={placeholder} expand={true} onChange={() => { }} />
            </div>
            }
            <div className="overflow-auto">
                <div className="flex flex-row flex-wrap gap-3 h-[100px]">
                    {entriesList}
                </div>
            </div>
        </div>
    )
}

export default AppFilterList;