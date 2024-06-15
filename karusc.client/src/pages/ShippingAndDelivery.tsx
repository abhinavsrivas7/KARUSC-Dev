import { Accordion } from "react-bootstrap";
import { FormatProductPrice } from "../utilities/ProductCardUtils";

export const ShippingAndDelivery = () => {
    return <div style={{ minHeight: '700px' }}>
        <h1 className="d-flex justify-content-center align-items-center py-4 mb-0">
            Shipping & Delivery
        </h1>
        <div className="p-3">
            <Accordion className="light-pink" defaultActiveKey={['0']}>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            Shipping Policy
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Karus collection is committed to delivering your order with good-quality packaging within the given time frame.
                            <br /><br />
                            We ship throughout the week, except Sundays & Public holidays.
                            To ensure that your order reaches you in good condition, in the shortest span of time, we ship through reputed courier agencies only.
                            If there is no courier service available in your area, we will ship your items via Speedpost.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            How long does it take for an order to arrive?
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Orders are dispatched within 3 working days or as per the delivery date specified by you at the time of placing the order.
                            Most orders are delivered within 7 to 8 working days.
                            Delivery of all orders will be duly done to the address mentioned by you at the time of placing the order.
                            <br /><br />
                            To Ensure That your order is delivered on time, please provide a Complete Address with House No., area, landmark, city, and Pincode.
                            The order may get misrouted if these details are incorrect.
                            In this case, the customer needs to pay forward & Reverse Shipping Charges.
                            Kindly make sure that mobile no. is correct & reachable, delivery person needs to call you for delivery-related queries.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <h6 className="d-flex justify-content-center align-items-center">
                            Cash on Delivery (COD)
                        </h6>
                    </Accordion.Header>
                    <Accordion.Body className="light-pink">
                        <p style={{ textAlign: 'left', fontSize: '0.8em' }} className="mb-0">
                            Safe & Secured Online banking, razor pay options available at payment checkout screen. Pay online to get faster delivery.
                            <br /><br />
                            Kindly read below prior placing COD orders:
                            <ul>
                                <li>Extra charges flat {FormatProductPrice(100)} on total order value as per courier partner fees</li>
                                <li>Pay minimum {FormatProductPrice(200)} online advance and remaining in cash when product is delivered to you. (Note: advance amount may increase depending on products value & location)</li>
                                <li>Without Advance payment orders will not be shipped.</li>
                                <li>Delivery time for COD orders can be delayed when compared to prepaid orders.</li>
                                <li>COD orders will be accepted only if your location is serviceable.</li>
                                <li>Example:
                                    <br />
                                    If item price {FormatProductPrice(500)} + {FormatProductPrice(100)} COD charge = {FormatProductPrice(600)} total.
                                    Must pay advance deposit {FormatProductPrice(200)} as online payment, remaining Rs.400 can be paid in cash to courier person as cash when item is delivered to you
                                </li>
                                <li>COD ADVANCE AMOUNTS WILL NOT BE REFUNDED FOR PERSONAL PREFERNECE, CANCELLATION OR RETURNS.</li>
                                <li>ALL COD ORDERS INVOLVES US PACKING AND SHIPPING & COD COSTS, PLEASE ENSURE PRIOR PLACING ORDERS.</li>
                            </ul>
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    </div>
};