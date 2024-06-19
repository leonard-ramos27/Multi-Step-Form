import "./ToggleSwitch.css"

type ToggleSwitchProps = {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
}

const ToggleSwitch = ({label, checked, onChange}: ToggleSwitchProps) => {
    return (
        <div className="toggle-container">
          <span className={`text ${!checked ? "active" : ""}`}>Monthly</span>
          <div className="toggle-switch">
            <input 
                type="checkbox" 
                className="checkbox"
                name={label} 
                id={label}
                checked={checked}
                onChange={e => onChange(e.target.checked)} />
            <label className="label" htmlFor={label}>
              <span className="inner" />
              <span className="switch" />
            </label>
          </div>
          <span className={`text ${checked ? "active" : ""}`}>Yearly</span>
        </div>
    )
}

export default ToggleSwitch