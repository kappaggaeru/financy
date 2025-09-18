"use client"
import ExpenseForm from "./features/expense-form/expense-form.component"
import ExpensesList from "./features/expense-form/expenses-list.component"
import { ExpensesProvider } from "./features/expense-form/expenses.context"

export default function Home() {
    return (
        <ExpensesProvider>
            <div className="p-4">
                <ExpenseForm />
                <ExpensesList />
            </div>
        </ExpensesProvider>
    )
}
