import { Expense } from "../expense-form/expenses.context";

export const ExpenseCard: React.FC<Expense> = ({
    amount,
    detail,
    category,
    date,
    account
}) => {
    const formattedDate = (date: Date | undefined): string => {
        if (date) {
            return `${formattedDay(date.getDay())} ${date.getDay()}/${date.getMonth()+1}`
        }
        return ""
    }

    const formattedDay = (day: number): string => {
        switch (day) {
            case 1: return "lunes";
            case 2: return "martes";
            case 3: return "miercoles";
            case 4: return "jueves";
            case 5: return "viernes";
            case 6: return "sabado";
            case 7: return "domingo";
            default: return ""
        }
    }

    return (
        <div className="grid gap-3 p-4 rounded-xl border border-gray-300 border-dashed bg-card">
            <div className="flex flex-row justify-between items-center">
                <div className="p-1 px-4 flex items-center capitalize bg-accent rounded-full">{category?.description}</div>
                <div>{formattedDate(date)}</div>
            </div>
            <div className="grid gap-3">
                <h1 className="text-lg bold">${amount}</h1>
                <p className="">{detail}</p>
            </div>
            <div>
                <p>{account?.description}</p>
            </div>
        </div>
    )
}