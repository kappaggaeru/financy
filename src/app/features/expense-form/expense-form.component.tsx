import AppInput from "@/components/app/app-input.component"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useExpenses } from "../expense-drawer/expenses.context";
import React from "react";
import { ItemList } from "../expense-drawer/item-list.model";
import { AppCombobox } from "@/components/app/app-select.component";
import { AppCalendar } from "@/components/app/app-calendar.component";


export default function ExpenseForm() {
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [amountError, setAmountError] = React.useState(false);
    const [detail, setDetail] = React.useState("");
    const [category, setCategory] = React.useState<ItemList | null>(null);
    const [date, setDate] = React.useState<Date | undefined>();
    const [account, setAccount] = React.useState<ItemList | null>(null);
    const { dispatch } = useExpenses();
    const categories = [
        {
            id: 1,
            description: "groceries"
        },
        {
            id: 2,
            description: "clothes"
        },
        {
            id: 3,
            description: "rent"
        },
        {
            id: 4,
            description: "car"
        },
        {
            id: 5,
            description: "festival"
        },
        {
            id: 6,
            description: "restaurant"
        },
        {
            id: 7,
            description: "cinema"
        },
        {
            id: 8,
            description: "laundry"
        },
        {
            id: 9,
            description: "shopping"
        },
        {
            id: 10,
            description: "ice cream"
        },
        {
            id: 11,
            description: "holidays"
        },
        {
            id: 12,
            description: "pets"
        },
        {
            id: 13,
            description: "coffee shop"
        },
        {
            id: 14,
            description: "rocket"
        },
    ]
    const accounts = [
        {
            id: 1,
            description: "banco macro"
        },
        {
            id: 2,
            description: "banco provincia"
        },
        {
            id: 3,
            description: "mercado pago"
        },
    ]

    function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(getInputValue<number>(e, "number"));
    }

    function handleDetail(e: React.ChangeEvent<HTMLInputElement>) {
        setDetail(getInputValue<string>(e, "text"));
    }

    function handleCategory(category: ItemList) {
        setCategory(category);
    }

    function handleAccount(account: ItemList) {
        setAccount(account);
    }

    function getInputValue<T extends string | number>(
        e: React.ChangeEvent<HTMLInputElement>,
        type: "text" | "number"
    ): T {
        const value = e.target.value;
        if (type === "number") {
            return Number(value) as T;
        }
        return value as T;
    }

    const submitForm = () => {
        console.log([amount, detail, category, date, account]);
        if (isFormValid()){
            dispatch({
                type: "ADD_EXPENSE",
                payload: { amount, detail, category, date, account }
            })
            setOpen(false);
        } else {
            setFormErrors()
        }
    }

    function isFormValid(): boolean {
        return amount > 0;
    }

    function setFormErrors(): void {
        setAmountError(true);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setOpen(!open)}>Nuevo gasto</Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Nuevo gasto</DialogTitle>
                        <DialogDescription>
                            Ingresa los datos de tu gasto.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <AppCalendar label="Fecha" onChange={(date) => setDate(date)} />
                        <AppInput
                            id="amount"
                            type="number"
                            label="Monto"
                            expand={true}
                            placeholder="0.0"
                            useMono={true}
                            required={true}
                            invalid={amountError}
                            errorText="El monto debe ser mayor a 0"
                            onChange={handleAmount}
                        />
                        <AppInput
                            id="detail"
                            type="text"
                            label="Descripción"
                            expand={true}
                            placeholder="Compra"
                            disabled={true}
                            onChange={handleDetail}
                        />
                        <AppCombobox title="Categoria" list={categories} expand={true} onChange={(category) => handleCategory(category)} />
                        <AppCombobox title="Cuenta" list={accounts} expand={true} onChange={(account) => handleAccount(account)} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" onClick={submitForm}>Guardar gasto</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}