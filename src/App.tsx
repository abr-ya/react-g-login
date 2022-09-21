import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./app.scss";
import { gapiInit } from "./services/gapi";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    gapiInit();
  }, []);

  const handleLogin = async (googleData) => {
    console.log(googleData);
    setUser(googleData);
    // запрос на наш бэк - постим googleData.tokenId
    // в ответ получаем пользователя из базы - прочитанного или созданного
    // отправляем запрос, работаем с результатом - функция асинхронная...
  };

  const handleError = (err) => {
    console.log("Ууууууупс!!..", err);
  };

  const onLogoutSuccess = () => {
    console.log("Успешно вышли!");
    setUser(null);
  };

  const renderButton = () => {
    if (!user)
      return (
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleError}
          cookiePolicy={"single_host_origin"}
        />
      );

    return (
      <>
        <p>Привет, {user.profileObj.name}!</p>
        <GoogleLogout clientId={process.env.GOOGLE_CLIENT_ID} onLogoutSuccess={onLogoutSuccess} />
      </>
    );
  };

  return (
    <div className="app">
      <h1>Hello, React with Google Button!</h1>
      {renderButton()}
    </div>
  );
};

export default App;
