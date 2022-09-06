import App from './App';

const $app = document.querySelector<HTMLDivElement>('.App');
console.log($app);
if ($app) {
  const app = new App($app);
}
