import React, { forwardRef, useEffect } from "react"
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
    useAutoFocus?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AppInput = forwardRef<HTMLInputElement, Props>(({
    id,
    type,
    label,
    capitalizedLabel = false,
    placeholder,
    style,
    expand = false,
    useMono = false,
    useAutoFocus = false,
    onChange
},
    ref
) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
        if (useAutoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [useAutoFocus])

    return (
        <div className={`grid w-full items-center gap-3 ${style}`}>
            {label && (
                <Label htmlFor={id} className={`${capitalizedLabel ? "capitalize" : "normal-case"}`}>
                    {label}
                </Label>)}
            <Input
                ref={inputRef}
                type={type}
                id={id}
                placeholder={placeholder}
                className={`
                    ${expand ? "w-full" : "w-fit"}
                    ${useMono ? "font-mono text-sm" : "font-sans text-sm"}
                `}
                onChange={onChange}
            />
        </div>
    )
})

AppInput.displayName = "AppInput"

export default AppInput;