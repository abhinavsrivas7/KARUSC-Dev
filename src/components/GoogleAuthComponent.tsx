import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export const GoogleAuthComponent = () => {
    
  const handleSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div style={{ display: 'none' }}>
      <GoogleOAuthProvider clientId="406061486952-6r67hp2bqmmqj9s8lbfok3lv4t04oqbg.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          auto_select
          theme="filled_blue"
          logo_alignment="left"
        />
      </GoogleOAuthProvider>
    </div>
  );
};
