import ContentView from './ContentView';
import template from '../../../templates/pages/login.jst';
import ApiClient from '../../services/ApiClient';

const LoginView = ContentView.extend({
    template: template,
    className: 'security-form-container',
    ui: {
        'form': 'form',
        'username': 'input[name="username"]',
        'password': 'input[name="password"]',
        'errors': '#errors'
    },

    triggers: {
        'submit @ui.form': {
            event: 'submit:form',
            preventDefault: true,
            stopPropagation: false
        }
    },

    onSubmitForm()
    {
        this.ui.errors.hide();

        let username = this.ui.username.val();
        let password = this.ui.password.val();

        const self = this;

        const client = ApiClient.getInstance();
        client.login(
            username,
            password,
            function(result) {
             self.triggerMethod(LoginView.Events.LOGIN_SUCCESS, result);
            },
            function() {
             self.ui.errors.show();
            }
        );
    }
});

LoginView.Events = {
    LOGIN_SUCCESS: 'login:success:view'
};

export default LoginView;