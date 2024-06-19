import { ReactElement, useState } from "react"
import { Sidebar } from "./components/Sidebar"
import PersonalInfoForm from "./components/PersonalInfoForm"
import SelectPlanForm from "./components/SelectPlanForm"
import useNavigateSteps from "./hooks/useNavigateSteps"
import PickAddOnsForm from "./components/PickAddOnsForm"
import SummaryForm from "./components/SummaryForm"
import SuccessMessage from "./components/SuccessMessage"

type FormData = {
  name: string,
  email: string,
  phonenumber: string,
  plan: number,
  billing: string,
  addons: number[],
  total: number,
}

const plans: { id: number, name: string, monthlyPrice: number, yearlyPrice: number, icon: string }[] = [
  {
    id: 1,
    name: "arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: "icon-arcade.svg"
  },
  {
    id: 2,
    name: "advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: "icon-advanced.svg"
  },
  {
    id: 3,
    name: "pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: "icon-pro.svg"
  },
]

const addons: { id: number, name: string, desc: string, monthlyPrice: number, yearlyPrice: number }[] = [
  {
    id: 1,
    name: "Online service",
    desc: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10
  },
  {
    id: 2,
    name: "Larger storage",
    desc: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20
  },
  {
    id: 3,
    name: "Customizable profile",
    desc: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20
  },
]

let formData: FormData = {
  name: "",
  email: "",
  phonenumber: "",
  plan: 1,
  billing: "monthly",
  addons: [],
  total: 0,
}

function App() {
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const [confirmedSubscription, setConfirmedSubscription] = useState<boolean>(false)

  const {goToNext, goToPrevious, stepIndex, goToStep} = useNavigateSteps()

  const updateData = (newData: Partial<FormData>) => formData = {...formData, ...newData}

  const updateErrors = (formErrors: Partial<FormData>) => setErrors(formErrors)

  const handleConfirm = () => setConfirmedSubscription(true)

  const steps: ReactElement[] = [
    <PersonalInfoForm 
      formData={formData}
      goNext={goToNext}
      updateData={updateData}
      updateErrors={updateErrors}
      errors={errors}/>,
    <SelectPlanForm
      formData={formData}
      plans={plans}
      goBack={goToPrevious}
      goNext={goToNext}
      updateData={updateData}/>,
    <PickAddOnsForm 
      formData={formData}
      addons={addons}
      goBack={goToPrevious}
      goNext={goToNext}
      updateData={updateData}/>,
    <SummaryForm 
      formData={formData}
      goBack={goToPrevious}
      changeBilling={goToStep}
      plans={plans}
      addons={addons}
      confirmSubscription={handleConfirm}/>,
  ]

  return (
    <>
    <main className="main-container p-md-3 shadow-sm">
      <Sidebar currentStepIndex={stepIndex}/>
      <section className="form-container">
        {confirmedSubscription ? <SuccessMessage /> : steps[stepIndex]}
      </section>
    </main>
    <footer className="text-center">
      <p className="mb-0">
        Challenge by
        <a 
          href="https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ" 
          target="_blank"
          className="ms-1">
          Frontend Mentor
        </a>
        . Coded by 
        <a 
          href="https://www.frontendmentor.io/profile/leonard-ramos27" 
          target="_blank"
          className="ms-1">
          Leonard Ramos
        </a>.
      </p>
    </footer>
    </>
  )
}

export default App
