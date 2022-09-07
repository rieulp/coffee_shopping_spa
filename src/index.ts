import App from "./App";

const $app = document.querySelector<HTMLDivElement>(".App");
if ($app) new App($app);
console.log("load");
