import { FormEvent } from "react"
import useCalculateTotal from "../hooks/useCalculateTotal"
import { Button, Form } from "react-bootstrap"

type FormData = {
    name: string,
    email: string,
    phonenumber: string,
    plan: number,
    billing: string,
    addons: number[],
    total: number,
}

type AddOnsData = {
    id: number, 
    name: string, 
    desc: string, 
    monthlyPrice: number, 
    yearlyPrice: number
}[]

type PlansData = {
    id: number, 
    name: string, 
    monthlyPrice: number, 
    yearlyPrice: number 
}[]

type SummaryFormProps = {
    formData : FormData,
    plans: PlansData,
    addons: AddOnsData,
    goBack: () => void,
    changeBilling: (index: number) => void,
    confirmSubscription: () => void,
}

const SummaryForm = ({formData, plans, addons, goBack, changeBilling, confirmSubscription}: SummaryFormProps) => {

    const selectedPlan: {
        id: number, 
        name: string, 
        monthlyPrice: number, 
        yearlyPrice: number 
    } = plans.filter(plan => plan.id === formData.plan)[0]

    const selectedAddons: AddOnsData = addons.filter(
        addon => formData.addons.includes(addon.id)
    )

    const totalPrice = useCalculateTotal({
        billing: formData.billing, 
        selectedPlan, selectedAddons
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        confirmSubscription()
    }

    return (
        <Form 
            className="main-form"
            onSubmit={handleSubmit}>
            <div className="form-details">
                <h1>Finishing up</h1>
                <p className="form-desc">Double-check everything looks OK before confirming.</p>
                <div className="summary-details">
                    <div className="d-flex align-items-center mb-2 mb-md-4">
                        <div className="col">
                            <span className="plan-details">
                                <span className="text-capitalize me-1">
                                    {selectedPlan.name}
                                </span> 
                                (<span className="text-capitalize">
                                    {formData.billing}
                                </span>)
                            </span>
                            <Button 
                                type="button"
                                className="d-block btn-change"
                                onClick={() => changeBilling(1)}>
                                Change
                            </Button>
                        </div>
                        <div className="col-auto plan-price">
                            {formData.billing == "monthly" ? `$${selectedPlan.monthlyPrice}/mo` : `$${selectedPlan.yearlyPrice}/yr`}
                        </div>
                    </div>
                    <hr />
                        <div className="mt-2 mt-md-4">
                            {selectedAddons.map(addon => (
                                <div 
                                    key={addon.id}
                                    className="d-flex mt-2 mt-md-3 addon-details">
                                    <span className="col name">{addon.name}</span>
                                    <span className="col-auto price">{formData.billing == "monthly" ? `$${addon.monthlyPrice}/mo` : `+$${addon.yearlyPrice}/yr`}</span>
                                </div>
                            ))}
                            { selectedAddons.length == 0 && <span className="addons-empty">No addons selected.</span>}
                        </div>
                </div>
                <div className="d-flex total-details mt-md-3">
                    <span className="col billing">Total (per {formData.billing === "monthly" ? "month" : "year"})</span>
                    <span className="col-auto price">+${totalPrice}{formData.billing === "monthly" ? "/mo" : "/yr"}</span>
                </div>
            </div>
            <div className="form-buttons d-flex justify-content-between">
                <Button 
                    type="button"
                    className="btn-back" 
                    onClick={goBack}>
                    Go Back
                </Button>
                <Button 
                    type="submit"
                    className="btn-next">
                    Confirm
                </Button>
            </div>
        </Form>
    )
}

export default SummaryForm