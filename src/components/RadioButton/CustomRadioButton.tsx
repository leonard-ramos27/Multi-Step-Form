import { ChangeEvent } from "react"
import "./CustomRadioButton.css"

type CustomRadioButtonProps = {
    name: string,
    id: number,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    price: string,
    text?: string,
    icon: string
}

const CustomRadioButton = ({name, id, checked, onChange,price, text, icon}: CustomRadioButtonProps) => {
    return (
        <label 
            htmlFor={name}
            className="label-radio">
            <input 
                type="radio" 
                name="plan" 
                value={id}
                id={name}
                checked={checked}
                onChange={onChange} />
            <img src={`./src/assets/images/${icon}`} alt="Plan Icon" />
            <div className="info">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
                <span className="text">{text && text}</span>
            </div>
            
        </label>
    )
}

export default CustomRadioButton