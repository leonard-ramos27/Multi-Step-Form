
type CalculateTotalProps = {
    billing: string,
    selectedPlan: {
        id: number, 
        name: string, 
        monthlyPrice: number, 
        yearlyPrice: number 
    },
    selectedAddons: {
        id: number, 
        name: string, 
        desc: string, 
        monthlyPrice: number, 
        yearlyPrice: number
    }[],
}

const useCalculateTotal = ({billing, selectedPlan, selectedAddons}: CalculateTotalProps) => {

    const getPlanPrice = () => {
        if(billing === "monthly"){
            return selectedPlan.monthlyPrice
        } else if (billing === "yearly") {
            return selectedPlan.yearlyPrice
        }
    }

    const getAddonTotal = () => {
        if (selectedAddons.length == 0){
            return 0
        } else {
            if (billing === "monthly"){
                const prices: number[] = selectedAddons.map((addon) => addon.monthlyPrice)
                return prices.reduce((previousValue: number, currentValue: number) => previousValue + currentValue)
            } else if (billing === "yearly") {
                const prices: number[] = selectedAddons.map((addon) => addon.yearlyPrice)
                return prices.reduce((previousValue: number, currentValue: number) => previousValue + currentValue)
            }
        }
    }

    const calculateTotal = () => {
        const addonTotal = getAddonTotal() || 0
        const planPrice = getPlanPrice() || 0
        return addonTotal+planPrice
    }

    return calculateTotal()
}

export default useCalculateTotal