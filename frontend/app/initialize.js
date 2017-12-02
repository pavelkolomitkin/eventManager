import 'jquery';
import './styles/application.css';

import moment from '../bower_components/moment/moment';
import '../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min';

import './syncConfig';
import App from 'components/App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
