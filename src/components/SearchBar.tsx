import { Button, Container, InputGroup } from "react-bootstrap";

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
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                    <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/>
                </svg>
            </Button>
        </div>
    </InputGroup>
</Container>;