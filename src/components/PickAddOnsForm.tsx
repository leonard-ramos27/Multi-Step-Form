import { ChangeEvent, FormEvent, useState } from "react"
import { Button, Form } from "react-bootstrap"

type FormData = {
    billing: string,
    addons: number[],
}

type AddOnsData = {
    id: number, 
    name: string, 
    desc: string, 
    monthlyPrice: number, 
    yearlyPrice: number
}[]

type PickAddOnsProps = {
    formData: FormData,
    addons: AddOnsData,
    goBack: () => void,
    goNext: () => void,
    updateData: (newData:Partial<FormData>) => void
}

const PickAddOnsForm = ({formData, addons, goBack, goNext, updateData}: PickAddOnsProps) => {
    const [selectedAddons, setSelectedAddons] = useState<number[]>(formData.addons)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setSelectedAddons([
                ...selectedAddons,
                parseInt(e.target.value)
            ])
        } else {
            setSelectedAddons(
                selectedAddons.filter( id => parseInt(e.target.value) !== id )
            )
        }
    }

    const handleGoBack = () => {
        updateData({addons: selectedAddons})
        goBack()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateData({addons: selectedAddons})
        goNext()
    }

    return (
        <Form 
            className="main-form"
            onSubmit={handleSubmit}>
            <div className="form-details">
                <h1>Pick add-ons</h1>
                <p className="form-desc">Add-ons help ehance your gaming experience.</p>
                <div className="addons-container">
                    {addons.map(addon => (
                        <div 
                            key={addon.id}
                            className="addon-div d-flex align-items-center">
                            <span className="col-auto">
                                <input 
                                    type="checkbox" 
                                    name="addon" 
                                    id={addon.name}
                                    value={addon.id}
                                    checked={selectedAddons.includes(addon.id)}
                                    onChange={handleChange} />
                            </span>
                            <span className="col addon-details">
                                <label 
                                    htmlFor={addon.name}
                                    className="d-flex flex-column">
                                    <span className="name">{addon.name}</span>
                                    <span className="desc">{addon.desc}</span>
                                </label>
                            </span>
                            <span className="col-auto">
                                <span className="addon-price">{formData.billing === "monthly" ? `+${addon.monthlyPrice}/mo` : `+${addon.yearlyPrice}/yr`}</span>
                            </span>
                            
                        </div>
                    ))}
                </div>
            </div>
            <div className="form-buttons d-flex justify-content-between">
                <Button 
                    type="button"
                    className="btn-back"
                    onClick={handleGoBack}>
                    Go Back
                </Button>
                <Button 
                    type="submit"
                    className="btn-next">
                    Next Step
                </Button>
            </div>
        </Form>
    )
}

export default PickAddOnsForm