import { Button, Offcanvas } from "react-bootstrap";
import closeImg from "../../../resources/media/close.svg";


type FilterSliderProps = {
    show: boolean,
    onClose: () => void
}

export const FilterSlider = ({ show, onClose }: FilterSliderProps) => {
    return <Offcanvas
        placement="start"
        className="light-pink"
        show={show}
        onHide={onClose}>
        <Offcanvas.Header>
            <h2>Filter</h2>
            <Button
                onClick={onClose}
                className="pt-0"
                variant="white"
                style={{ border: '0' }}>
                <img src={closeImg} />
            </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
        </Offcanvas.Body>
    </Offcanvas>;
}

