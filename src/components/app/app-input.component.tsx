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
    required?: boolean,
    invalid?: boolean,
    errorText?: string,
    helpText?: string,
    disabled?: boolean,
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
    required = false,
    invalid = false,
    errorText = "Campo requerido",
    helpText,
    disabled = false,
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
                <Label
                    htmlFor={id}
                    className={`
                        ${capitalizedLabel ? "capitalize" : "normal-case"}
                        ${required ? "required" : ""}
                        ${disabled ? "disabled" : ""}
                        ${invalid ? "invalid" : ""}
                    `}>
                    {label}
                </Label>)}
            <div>
                <Input
                    ref={inputRef}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        ${expand ? "w-full" : "w-fit"}
                        ${useMono ? "font-mono text-sm" : "font-sans text-sm"}
                        ${invalid ? "border-destructive focus-visible:ring-destructive text-destructive" : ""}
                    `}
                    onChange={onChange}
                />
                {helpText &&
                    <span className="text-sm text-gray-400">{helpText}</span>
                }
                {invalid &&
                    <span className="text-sm text-destructive">{errorText}</span>
                }
            </div>
        </div>
    )
})

AppInput.displayName = "AppInput"

export default AppInput;