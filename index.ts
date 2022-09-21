import App from './src/App';

const $app = document.querySelector<HTMLDivElement>('.App');
if ($app) new App($app);
