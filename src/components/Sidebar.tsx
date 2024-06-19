
type StepProps = {
    currentStepIndex: number
}

export function Sidebar({currentStepIndex}: StepProps){
    const steps = [
        { number: 1, title: "Your Info"},
        { number: 2, title: "Select Plan"},
        { number: 3, title: "Add-ons"},
        { number: 4, title: "Summary"},
    ]
    return (
        <aside className="sidebar">
            <ul>
            {steps.map((s)=>(
                <li key={s.number}>
                    <span className={`circle ${s.number == currentStepIndex+1 ? "active" : "" }`}>{s.number}</span>
                    <span className="d-none d-md-inline text-uppercase step-text">
                        <span className="d-block">Step {s.number}</span>
                        <span className="d-block">{s.title}</span>
                    </span>
                </li>
            ))}
            </ul>
        </aside>
    )
}