import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { DissmissableAlert } from "../Common/DissmissableAlert";
import { Loader } from "../Common/Loader";
import { Address, CreateAddressCommand, UpdateAddressCommand } from "../../models/AddressModels";
import axios from "axios";
import { AddressEndpoint, GetAddressByIdEndpoint } from "../../utilities/EndpointUtils";
import { validateTokens } from "../../utilities/ContextUtils";
import { useUserContext } from "../../hooks/useUser";

export type AddAddressModalData = {
    show: boolean,
    onHide: () => void,
    addressId?: string | undefined
};

export const AddressModal = ({ show, onHide, addressId }: AddAddressModalData) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [createAddressCommand, setCreateAddressCommand] = useState<CreateAddressCommand | null>(null);
    const [updateAddressCommand, setUpdateAddressCommand] = useState<UpdateAddressCommand | null>(null);
    const { getUser, getToken } = useUserContext();

    useEffect(() => {
        if (addressId) {
            const user = getUser();
            const tokenResponse = validateTokens(getToken());

            if (user === null || tokenResponse === false) onHide();

            setShowLoader(true);

            axios
                .get(GetAddressByIdEndpoint(), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenResponse}`
                    },
                    params: {
                        'addressId': addressId
                    }
                })
                .then(response => {
                    const address = response.data as Address;
                    setUpdateAddressCommand({
                        id: address.id,
                        recipient: address.recipient,
                        line1: address.line1,
                        line2: address.line2,
                        city: address.city,
                        state: address.state,
                        country: address.country,
                        pincode: address.pincode,
                        phone: address.phone
                    });
                    setShowLoader(false);
                })
                .catch(() => {
                    setShowLoader(false);
                    setShowError(true);
                })
        } else {
            setCreateAddressCommand({
                recipient: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                phone: ''
            });
        }
    }, [getToken, getUser, onHide, addressId]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (addressId && updateAddressCommand !== null) {
            setShowLoader(true);
            const tokenResponse = validateTokens(getToken());
            if (tokenResponse === false) onHide();

            axios.patch(AddressEndpoint(), updateAddressCommand, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenResponse}`
                }
            })
            .then(() => {
                setShowLoader(false);
                onHide();
            })
            .catch(() => setShowError(true));
        }
        else if (createAddressCommand !== null) {
            setShowLoader(true);
            const tokenResponse = validateTokens(getToken());
            if (tokenResponse === false) onHide();

            axios.post(AddressEndpoint(), createAddressCommand, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenResponse}`
                }
            })
            .then(() => {
                setShowLoader(false);
                onHide();
            })
            .catch(() => setShowError(true));
        }
    };

    const handleChange = (
        key: "recipient" | "line1" | "line2" | "city" | "state" | "country" | "pincode" | "phone",
        value: string) => {
        if (addressId && updateAddressCommand !== null)  {
            const changedCommand = updateAddressCommand;
            changedCommand[key] = value;
            console.log(changedCommand);
            setUpdateAddressCommand(changedCommand);
        }
        else if (createAddressCommand !== null) {
            const changedCommand = createAddressCommand;
            changedCommand[key] = value;
            setCreateAddressCommand(changedCommand);
        }
    };

    return <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header className="light-pink" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {addressId ? "Update Address" : "Add New Address"}
        </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="light-pink d-flex justify-content-center align-items-center px-4">
              {showError
                  ? <DissmissableAlert title="Oops! Some error occurred" description={null} variant="danger" />
                  : null}
              <Stack direction="vertical" gap={1}>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          required
                          type="text"
                          placeholder="Recipient"
                          onChange={(event) => handleChange("recipient", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.recipient : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="text"
                          required
                          placeholder="Line 1"
                          onChange={(event) => handleChange("line1", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.line1 : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="text"
                          required
                          placeholder="Line 2"
                          onChange={(event) => handleChange("line2", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.line2 : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="text"
                          required
                          placeholder="City"
                          onChange={(event) => handleChange("city", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.city : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="text"
                          required
                          placeholder="State"
                          onChange={(event) => handleChange("state", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.state : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="text"
                          required
                          placeholder="Country"
                          onChange={(event) => handleChange("country", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.country : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="number"
                          required
                          placeholder="Pincode"
                          onChange={(event) => handleChange("pincode", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.pincode : undefined}
                          disabled={showLoader} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formTitle">
                      <input
                          className="discount-input"
                          type="number"
                          required
                          placeholder="Phone"
                          onChange={(event) => handleChange("phone", event.target.value)}
                          defaultValue={addressId && updateAddressCommand !== null ? updateAddressCommand.phone : undefined}
                          disabled={showLoader} />
                   </Form.Group>
                   {showLoader ? <Loader /> : null}
              </Stack>           
          </Modal.Body>
          <Modal.Footer className="light-pink d-flex justify-content-center align-items-center">
              <Button type="submit" className="admin-button">Save</Button>
          </Modal.Footer>
      </Form>
  </Modal>;
}

