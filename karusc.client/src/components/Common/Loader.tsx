import { Container } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";

export const Loader = () => <Container className="d-flex justify-content-center align-items-center">
    <TailSpin color="#890074" height={70} width={70} />
</Container>;