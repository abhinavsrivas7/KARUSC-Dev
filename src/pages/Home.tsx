import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export const Home = () => {
    return <Container className="d-flex justify-content-center align-items-center w-100">
        <NavLink to="/shop">
            <Button className="hoverButton" variant="outline-dark">
                Shop Now!!
                <div style={{
                    display: "inline-block",
                    width: "1.1rem",
                    height: "1.1rem",
                    marginLeft: "0.3em"}}>
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/>
                    </svg>
                </div>
            </Button>
        </NavLink>
        <div style={{display: "none"}}>
            <GoogleOAuthProvider clientId="406061486952-6r67hp2bqmmqj9s8lbfok3lv4t04oqbg.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess= {credentialResponse => console.log(credentialResponse)}
                    onError= {() => console.log('Login Failed')}
                    useOneTap
                    auto_select 
                    theme="filled_blue"
                    logo_alignment="left"/>;
            </GoogleOAuthProvider>
        </div>  
    </Container>;
}