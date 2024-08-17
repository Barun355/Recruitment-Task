import { FC } from "react"

interface ButtonProps {
    children: JSX.Element | string,
    className?: string
    onClick?: any
}

const Button: FC<ButtonProps> = ({children, className, onClick}) => {
  return (
    <button className={"rounded-md border-2 border-[#f2f2f2] cursor-pointer "+className} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button;
