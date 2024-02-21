import { Accordion } from "react-bootstrap"
import { AddUser } from "./AddUser"

export const UserOperations = () => {
    return <Accordion className="light-pink mt-5">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Create New User</Accordion.Header>
            <Accordion.Body className="light-pink">
                <AddUser />
            </Accordion.Body>
        </Accordion.Item>
            </Accordion>
        }