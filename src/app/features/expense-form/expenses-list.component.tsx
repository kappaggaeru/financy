import { ExpenseCard } from "../expense-card/expense-card.component";
import { useExpenses } from "./expenses.context";

export default function ExpensesList() {
    const { state } = useExpenses();

    return (
        <div>
            <p>Listado de gastos:</p>
            {
                state.expenses.length === 0
                    ? (<p>no hay gastos registrados</p>)
                    :
                    <div className="grid gap-3 overflow-auto pt-2">
                        {state.expenses.map((exp, i) => (
                            <ExpenseCard key={i} amount={exp.amount} detail={exp.detail} category={exp.category} date={exp.date} account={exp.account} />
                        ))}
                    </div>
            }
        </div>
    )
}

