import 'jquery';
import './styles/application.css';

import './syncConfig';
import App from 'components/App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
