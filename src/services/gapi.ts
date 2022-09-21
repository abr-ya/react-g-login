import { gapi } from "gapi-script";

export const gapiInit = () => {
  function start() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const scope = "email";
    console.log("start:", clientId.slice(0, 20), scope);
    gapi.auth2.init({
      clientId,
      scope,
    });
  }
  gapi.load("client:auth2", start);
};
