import { Offcanvas } from "react-bootstrap";

type CartSliderProps = {
    show: boolean,
    onClose: () => void
}

export const CartSlider = ({ show, onClose }: CartSliderProps) => {
    return <Offcanvas
        placement="end"
        className="light-pink"
        show={show}
        onHide={onClose}>
        <Offcanvas.Header>
            <h2>Cart</h2>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
        </Offcanvas.Body>
    </Offcanvas>;
}