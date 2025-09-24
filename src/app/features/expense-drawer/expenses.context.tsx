import { createContext, useContext, useReducer } from "react"
import { ItemList } from "./item-list.model"

export type Expense = {
    amount: number
    detail: string
    category: ItemList | null
    date: Date | undefined
    account: ItemList | null
}

type State = {
    expenses: Expense[]
}

type Action =
    | { type: "ADD_EXPENSE"; payload: Expense }
    | { type: "REMOVE_EXPENSE"; payload: number } // index o id

const initialState: State = {
    expenses: [],
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_EXPENSE":
            return { ...state, expenses: [...state.expenses, action.payload] }
        case "REMOVE_EXPENSE":
            return { ...state, expenses: state.expenses.filter((_, i) => i !== action.payload) }
        default:
            return state
    }
}

const ExpensesContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined)

export const ExpensesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <ExpensesContext.Provider value={{ state, dispatch }}>{children}</ExpensesContext.Provider>
}

export function useExpenses() {
    const context = useContext(ExpensesContext)
    if (!context) throw new Error("useExpenses must be used within ExpensesProvider")
    return context
}
