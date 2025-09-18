import { useExpenses } from "./expenses.context";

export default function ExpensesList() {
    const { state } = useExpenses();
    const formattedDate = (date: Date | undefined): string => {
        if (date) {
            return `${date.getDay()}/${date.getMonth()}`
        }
        return ""
    }
    return (
        <div>
            <p>Listado de gastos:</p>
            {
                state.expenses.length === 0
                    ? (<p>no hay gastos registrados</p>)
                    :
                    <div className="border border-dashed border-gray-200 p-4 rounded-lg overflow-auto">
                        {state.expenses.map((exp, i) => (
                            <div key={i} className="text-nowrap">
                                {i + 1}) ${exp.amount} - {exp.detail} - {formattedDate(exp.date)} - {exp.category?.description} ({exp.category?.id}) - {exp.account?.description} ({exp.account?.id})
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

