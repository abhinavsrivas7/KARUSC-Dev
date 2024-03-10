import { Button, Offcanvas, Stack, Image as ImageBs } from "react-bootstrap";
import { User } from "../../models/UserModels";
import { Link } from "react-router-dom";
import closeImg from "../../../resources/media/close.svg";

type MenuSliderProps = {
    show: boolean,
    onClose: () => void,
    user: User | null
};

export const MenuSlider = ({ show, onClose, user }: MenuSliderProps) => {
    return <Offcanvas
        className="light-pink"
        show={show}
        onHide={onClose}>
        <Offcanvas.Header>
            <h1 className="extra-bold-font">KARUSC</h1>
            <Button
                onClick={onClose}
                className="pt-0"
                variant="white"
                style={{ border: '0' }}>
                <img src={closeImg} />
            </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
            {user !== null
                ? <><Stack
                    className="p-2 purple"
                    direction="horizontal"
                    gap={2}
                    style={{ border: "1px solid" }}>
                    <div>
                        <ImageBs
                            height="60vh"
                            src={user.profilePictureUrl}
                            roundedCircle />
                    </div>
                    <Stack direction="vertical" gap={0}>
                        <div className="bold-font ps-1 pt-1 pb-0 mb-0">
                            {user.name}
                        </div>
                        <div className="thin-font px-1">
                            <Button
                                onClick={onClose}
                                variant="white"
                                className="admin-button ps-0 pt-0">
                                View Profile
                            </Button>
                        </div>
                    </Stack>
                </Stack>
                    <hr /></>
                : null}
            <ul>
                <li>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/"
                        onClick={onClose}
                        className="regular-font light-pink">
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/ProductList"
                        onClick={onClose}
                        className="regular-font light-pink">
                        Product List
                    </Link>
                </li>
                {user?.role === 1 ?
                    <li>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to="/Admin"
                            onClick={onClose}
                            className="regular-font light-pink">
                            Admin
                        </Link>
                    </li>
                    : null}
            </ul>
        </Offcanvas.Body>
    </Offcanvas>;
}