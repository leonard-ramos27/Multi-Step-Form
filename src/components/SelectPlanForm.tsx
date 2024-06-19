import { FormEvent, useState } from "react"
import ToggleSwitch from "./Toggle/ToggleSwitch"
import CustomRadioButton from "./RadioButton/CustomRadioButton"
import { Button, Form } from "react-bootstrap"

type FormData = {
    plan: number,
    billing: string,
}

type PlansData = {
    id: number, 
    name: string, 
    monthlyPrice: number, 
    yearlyPrice: number,
    icon: string
}[]

type SelectPlanProps = {
    formData: FormData,
    plans: PlansData,
    goBack: () => void,
    goNext: () => void,
    updateData: (newData:Partial<FormData>) => void,
}

const SelectPlanForm = ({ formData, plans, goBack, goNext, updateData}: SelectPlanProps) => {
    const [selectedPlan, setSelectedPlan] = useState<number>(formData.plan)
    const [billing, setBilling] = useState<string>(formData.billing)

    const handleChangeBilling = (checked: boolean) => {
        if(checked){
            setBilling("yearly")
        } else {
            setBilling("monthly")
        }
    }

    const handleGoBack = () => {
        updateData({
            plan: selectedPlan,
            billing
        })
        goBack()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateData({
            plan: selectedPlan,
            billing
        })
        goNext()
    }

    return(
        <Form 
            className="main-form"
            onSubmit={handleSubmit}>
            <div className="form-details">
                <h1>Select your plan</h1>
                <p className="form-desc">You have the option of monthly or yearly billing.</p>
                <div className="plans-container">
                    {plans.map(plan => (
                        <CustomRadioButton
                            key={plan.id} 
                            name={plan.name}
                            id={plan.id}
                            icon={plan.icon}
                            checked={selectedPlan === plan.id}
                            onChange={e => setSelectedPlan(parseInt(e.target.value))}
                            price={billing === "monthly" ? `$${plan.monthlyPrice}/mo` : `$${plan.yearlyPrice}/yr`}
                            text={billing === "yearly" ? "2 months free" : ""}/>
                    ))}
                </div>
                <div className="toggle-wrapper">
                    <ToggleSwitch 
                        label="billing"
                        checked={billing === "monthly" ? false : true}
                        onChange={handleChangeBilling}/>
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

export default SelectPlanForm;