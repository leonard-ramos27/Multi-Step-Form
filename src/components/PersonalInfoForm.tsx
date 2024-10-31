import React, { FormEvent, useRef } from "react"
import { Button, Form } from "react-bootstrap"

type FormData = {
    name: string,
    email: string,
    phonenumber: string,
}

type PersonalInfoProps = {
    formData: FormData,
    goNext: () => void,
    updateData: (newData:Partial<FormData>) => void,
    errors: Partial<FormData>,
    updateErrors: (formErrors: Partial<FormData>) => void,
}

const PersonalInfoForm = ({formData, goNext, updateData, errors, updateErrors}: PersonalInfoProps) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    const validateFormat = (field: string, value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+\d{1,4} \d{4,}$/;

        if(field === "email"){
            return emailRegex.test(value)
        } else if (field === "phone") {
            return phoneRegex.test(value)
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if(e.target.value.trim()){
            updateErrors({ ...errors, [e.target.name]: "" })
        }
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        const formErrors: Partial<FormData> = {}
        if(!nameRef.current?.value.trim()){
            formErrors.name = "This field is required"
        } 

        if(!emailRef.current?.value.trim()){
            formErrors.email = "This field is required"
        } else if(!validateFormat("email", emailRef.current?.value.trim())){
            formErrors.email = "Invalid email address"
        }

        if(!phoneRef.current?.value.trim()){
            formErrors.phonenumber = "This field is required"
        } else if(!validateFormat("phone", phoneRef.current?.value.trim())){
            formErrors.phonenumber = "Invalid phone number"
        }

        if(Object.keys(formErrors).length > 0) {
            updateErrors(formErrors)
        } else {
            updateErrors({})
            updateData({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                phonenumber: phoneRef.current?.value
            })
            goNext()
        }
    }

    return (
        <Form 
            className="main-form"
            noValidate
            onSubmit={handleSubmit}>
            <div className="form-details">
                <h1>Personal info</h1>
                <p className="form-desc">Please provide your name, email address and phone number.</p>
                <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between">
                        <Form.Label 
                            htmlFor="txt-name"
                            className="mb-2">
                            Name
                        </Form.Label>
                        {errors.name && <span className="invalid-text">{errors.name}</span>}
                    </div>
                    <input 
                        className={`form-control ${errors.name ? 'invalid' : ''}`}
                        type="text" 
                        id="txt-name"
                        name="name"
                        placeholder="e.g. Stephen King"
                        defaultValue={formData.name}
                        ref={nameRef}
                        onBlur={handleBlur}
                        autoFocus/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between">
                        <Form.Label 
                            htmlFor="txt-email"
                            className="mb-2">
                            Email Address
                        </Form.Label>
                        {errors.email && <span className="invalid-text">{errors.email}</span>}
                    </div>
                    <input 
                        className={`form-control ${errors.email ? 'invalid' : ''}`}
                        type="email" 
                        id="txt-email"
                        name="email"
                        placeholder="e.g. stephenking@lorem.com"
                        defaultValue={formData.email}
                        onBlur={handleBlur}
                        ref={emailRef}/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between">
                        <Form.Label 
                            htmlFor="txt-phone"
                            className="mb-2">
                            Phone Number
                        </Form.Label>
                        {errors.phonenumber && <span className="invalid-text">{errors.phonenumber}</span>}
                    </div>
                    <input 
                        className={`form-control ${errors.phonenumber ? 'invalid' : ''}`}
                        type="text" 
                        id="txt-phone"
                        name="phonenumber"
                        placeholder="e.g. +123 4567890"
                        defaultValue={formData.phonenumber}
                        onBlur={handleBlur}
                        ref={phoneRef}/>
                </Form.Group>
            </div>
            <div className="form-buttons d-flex justify-content-end">
                <Button 
                    type="submit"
                    className="btn-next">
                    Next Step
                </Button>
            </div>
        </Form>
    )
}

export default PersonalInfoForm