import clsx from 'clsx'
import React from 'react'

const variants = {
    primary: 'bg-[#509f8c] text-[#ffffff] hover:bg-[#65509F]',
    secondary: 'bg-[#509f8c] text-[#65509F]'
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variants
}

const Button: React.FC<Props> = (props) => {
    const {
        className,
        type = 'button',
        variant = 'primary',
        ...restOfProps
    } = props

    return (
        <button
            className={clsx(
                "transition-all duration-500 cursor-pointer text-white",
                "px-4 py-2 md:px-6 md:py-3 rounded-[40px] font-bold",
                variants[variant],
                className
            )}
            {...restOfProps}
        />
    )
}

export default Button
