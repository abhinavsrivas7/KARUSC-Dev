import { Button, Container, InputGroup } from "react-bootstrap";
import searchImg from "../../../resources/media/search.svg";

export const SearchBar = () => <Container>
    <InputGroup>
        <input 
            className="search-input w-100" 
            placeholder="Search products here..."
            style={{
                border: "0", 
                position: "relative", 
                padding: "3px", 
                paddingRight: "10px"}} />
        <div style={{display: "inline-block"}} className="d-flex d-flex justify-content-right align-items-right">
            <Button 
                id="button-addon2"
                style={{ 
                    width: "2.25rem",
                    height: "2.25rem",
                    position: "absolute",
                    transform: "translate(-80%, -20%)"
                }} 
                variant="white">
                <img src = {searchImg} />
            </Button>
        </div>
    </InputGroup>
</Container>;