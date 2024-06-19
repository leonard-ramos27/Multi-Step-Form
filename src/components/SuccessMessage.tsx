
const SuccessMessage = () => {
    return (
        <div className="success-div text-center d-flex flex-column align-items-center">
            <img 
                src="./src/assets/images/icon-thank-you.svg" 
                className="mb-3 mb-md-4"
                alt="Thank you icon" />
            <h1 className="mb-2 mb-md-3">Thank you!</h1>
            <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
        </div>
    )
}

export default SuccessMessage