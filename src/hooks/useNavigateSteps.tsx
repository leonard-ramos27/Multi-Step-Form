import { useState } from "react"

const useNavigateSteps = () => {
    const [stepIndex, setStepIndex] = useState<number>(0)

    const goToNext = () => setStepIndex(stepIndex + 1)

    const goToPrevious = () => setStepIndex(stepIndex - 1)

    const goToStep = (index: number) => setStepIndex(index)

    return {
        stepIndex,
        goToNext,
        goToPrevious,
        goToStep
    }
}

export default useNavigateSteps