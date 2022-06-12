import '../style/thankYou.css';

function ThankYou() {
    return (
        <div className="bodyThankYou" style={{marginTop:'100px', position:'realtive'}}>
            <div className="thank-you-wrapper">
                <div className="check-mark-block">
                    <div className="check-mark-wrapper">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h3 className="context">Thank You for ordering!</h3>
                <p className="wishing">Have a great day!</p>
            </div>
        </div>
    );
}

export default ThankYou;