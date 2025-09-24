"use client"
import ExpenseDrawer from "./features/expense-drawer/expense-drawer.component"
import ExpensesList from "./features/expense-drawer/expenses-list.component"
import { ExpensesProvider } from "./features/expense-drawer/expenses.context"
import ExpenseForm from "./features/expense-form/expense-form.component"

export default function Home() {
    return (
        <ExpensesProvider>
            <div className="p-4">
                <ExpenseForm />
                <ExpenseDrawer />
                <ExpensesList />
            </div>
        </ExpensesProvider>
    )
}
