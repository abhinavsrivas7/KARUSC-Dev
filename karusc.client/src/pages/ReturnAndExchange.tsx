import { Accordion } from "react-bootstrap";
import { FormatProductPrice } from "../utilities/ProductCardUtils";

export const ReturnAndExchange = () => {
    return <div style={{ minHeight: '700px' }}>
        <h1 className="d-flex justify-content-center align-items-center py-4 mb-0">
            Return & Exchange
        </h1>
        <div className="p-3">
            <Accordion className="light-pink" defaultActiveKey={['0']}>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            What is the Cancellation policy?
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            We accept order cancellation only if the order has not been packed yet.
                            <br /><br />
                            Please WhatsApp <a className="light-pink" href="tel:9765039625">9765039625</a> or
                            email us at <a className="light-pink" href="mailto:karus.c2023@gmail.com">karus.c2023@gmail.com</a> for any cancellations.
                            <br /><br />
                            If the Order is Dispatched customer needs to pay Forward & Return Charges of {FormatProductPrice(120)} for cancellation.
                            <br /><br />
                            If the Product Is Not Available Full Refund will be processed within 2 working Days.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            When Can I Return my Order?
                        </h6>                        
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Currently, we do not have a return policy, Return/ Exchange is Available Only For Defective Damage, Or Wrong Products Only. Exchange / Return Not available on a like or dislike basis.
                            <br /><br />
                            For Any Size Issues in  Bangles, Mangalsutra Exchanges are Available, For Exchange Customers Need to Pay an Extra Cost of 150 Rs. Retun Pick up & Delivery will be done from our side. Customer Need to return products in their original packaging, our team members will guide you through all processes.
                            <br /><br />
                            Exchange Time - 7 Working Days
                            <br /><br />
                            Exchange / Return is not available for customized products.
                            <br /><br />
                            Contact no. For Returns / Exchanges Whatsapp <a className="light-pink" href="tel:9765039625">9765039625</a>,
                            Email - <a className="light-pink" href="mailto:karus.c2023@gmail.com">karus.c2023@gmail.com</a>
                            <br /><br />
                            Rejecting Parcel, Not Receiving Delivery Person Phone, Deny OTP / ID Verification, Providing Incorrect Pincode / Contact No. / Address  Considered as Cancellation.
                            The final and binding decision for whether the product is eligible for a refund/exchange, on a case-by-case basis, lies with Karus collection only.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            Received defective/damaged/wrong product
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Please make parcel opening video from start to end, any defect or wrong products mention in the video.
                            Return/exchange for defective products is not available without a parcel opening video.
                            Video must be without any pause & cut.
                            The video must start by showing the parcel on all sides.
                            <br /><br />
                            We will replace the same product if any damages occur during shipping.
                            For any damage or wrong product need to inform us within 24 hours.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="shadow-none">
                    <Accordion.Header className="shadow-none">
                        <h6 className="d-flex justify-content-center align-items-center">
                            Refund Process
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Refund will be initiated within 2 days of acknowledgment of an issue.
                            It will be processed to the original payment source except for COD.
                            <br /><br />
                            In the case of COD, our team will contact you for your bank account details in which the amount will be credited.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    </div>
};