"use client"
import AppInput from "@/components/app/app-input.component"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import React from "react";
import { AnimatePresence } from "framer-motion";
import AppFilterList from "@/components/app/app-filter-list.component";
import { AppCalendar } from "@/components/app/app-calendar.component";
import { ItemList } from "./item-list.model";
import { AnimatedStep } from "./animated-step.container";
import { useExpenses } from "./expenses.context";


export default function ExpenseForm() {
    const [step, setStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [detail, setDetail] = React.useState("");
    const [category, setCategory] = React.useState<ItemList | null>(null);
    const [date, setDate] = React.useState<Date | undefined>();
    const [account, setAccount] = React.useState<ItemList | null>(null);
    const { dispatch } = useExpenses();
    const stepDescriptions = [
        "Ingresa un valor",
        "Ingresa una descripción",
        "Ingresa una categoría",
        "Ingresa una fecha",
        "Ingresa una cuenta",
    ]
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

    function nextStep() {
        if (step < stepDescriptions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(0);
            console.table([amount, detail, category, date, account]);
            dispatch({
                type: "ADD_EXPENSE",
                payload: {amount, detail, category, date, account}
            })
            setOpen(false);
        }
    }

    function prevStep() {
        if (step > 0) {
            setStep(step - 1);
        }
    }
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Nuevo gasto</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Nuevo gasto</DrawerTitle>
                    <DrawerDescription>{stepDescriptions[step]}</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <AnimatedStep id="stepAmount" initialX={0} initialOpacity={1} exitX={-200} exitOpacity={0}>
                                <AppInput id="amount" type="number" label="Monto" expand={true} placeholder="0.0" useMono={true} onChange={(value) => setAmount(Number(value))} />
                            </AnimatedStep>
                        )}
                        {step === 1 && (
                            <AnimatedStep id="stepDetail" initialX={200} initialOpacity={0} animateX={0} animateOpacity={1} exitX={-200} exitOpacity={0} >
                                <AppInput id="detail" type="text" label="Descripción" expand={true} placeholder="Compra" onChange={(value) => setDetail(value)} />
                            </AnimatedStep>
                        )}
                        {step === 2 && (
                            <AnimatedStep id="stepCategory" initialX={200} initialOpacity={0} animateX={0} animateOpacity={1} exitX={-200} exitOpacity={0} >
                                <AppFilterList list={categories} placeholder="Buscar categoría" onChange={(category) => setCategory(category)} />
                            </AnimatedStep>
                        )}
                        {step === 3 && (
                            <AnimatedStep id="stepDate" initialX={200} initialOpacity={0} animateX={0} animateOpacity={1} exitX={-200} exitOpacity={0} >
                                <AppCalendar onChange={(date) => setDate(date)} />
                            </AnimatedStep>
                        )}
                        {step === 4 && (
                            <AnimatedStep id="stepAccount" initialX={200} initialOpacity={0} animateX={0} animateOpacity={1} exitX={-200} exitOpacity={0} >
                                <AppFilterList list={accounts} placeholder="Buscar cuenta" allowFilter={false} onChange={(account) => setAccount(account)} />
                            </AnimatedStep>
                        )}
                    </AnimatePresence>
                </div>
                <DrawerFooter>
                    {step > 0 ? (
                        <div className="flex flex-row-reverse gap-3 w-full">
                            <div className="w-full">
                                <Button type="button" className="w-full" onClick={() => nextStep()}>Siguiente</Button>
                            </div>
                            <div className="w-full">
                                <Button type="button" className="w-full" variant="outline" onClick={() => prevStep()}>Atrás</Button>
                            </div>
                        </div>
                    )
                        :
                        <Button type="button" onClick={() => nextStep()}>Siguiente</Button>
                    }
                    <DrawerClose asChild>
                        <Button type="button" variant="outline" className="w-full" onClick={() => setOpen(false)}>Cancelar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}