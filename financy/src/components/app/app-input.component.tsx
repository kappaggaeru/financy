import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    id: string,
    type: string,
    label?: string,
    capitalizedLabel?: boolean,
    placeholder?: string,
    style?: string,
    expand?: boolean,
    useMono?: boolean,
    onChange: (value: string) => void
}

const AppInput: React.FC<Props> = ({
    id,
    type,
    label,
    capitalizedLabel = false,
    placeholder,
    style,
    expand = false,
    useMono = false,
    onChange
}) => {
    return (
        <div className={`grid w-full items-center gap-3 ${style}`}>
            {label && <Label htmlFor={id} className={`${capitalizedLabel ? "capitalize" : "normal-case"}`}>{label}</Label>}
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${expand ? "w-full" : "w-fit"} ${useMono ? "font-mono text-sm" : "font-sans text-sm"}`}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default AppInput;