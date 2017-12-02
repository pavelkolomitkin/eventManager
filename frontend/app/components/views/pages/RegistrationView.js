import ContentView from './ContentView';
import template from '../../../templates/pages/registration.jst';
import ApiClient from '../../services/ApiClient';

const RegistrationView = ContentView.extend({
    template: template,
    className: 'security-form-container',
    ui: {
        'form': 'form',
        'username': 'input[name="username"]',
        'userEmail': 'input[name="email"]',
        'password': 'input[name="password"]',
        'passwordRepeat': 'input[name="passwordRepeat"]',
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
        this.hideErrors();

        let username = this.ui.username.val();
        let password = this.ui.password.val();
        let email = this.ui.userEmail.val();
        let passwordRepeat = this.ui.passwordRepeat.val();

        const self = this;

        const client = ApiClient.getInstance();
        client.register(
            username,
            email,
            password,
            passwordRepeat,
            function(result)
            {
                self.triggerMethod(RegistrationView.Events.REGISTER_SUCCESS, result);
            },
            function(result)
            {
                const errors = result[0].responseJSON.children;
                self.showErrors(errors);
            }
        );
    },

    showErrors(errors)
    {
        if (errors.email.errors && (errors.email.errors.length > 0))
        {
            this.$('#email-error').html(errors.email.errors[0]).show();
        }

        if (errors.username.errors && (errors.username.errors.length > 0))
        {
            this.$('#username-error').html(errors.username.errors[0]).show();
        }

        if (errors.plainPassword.children.first.errors && (errors.plainPassword.children.first.errors.length > 0))
        {
            this.$('#password-error').html(errors.plainPassword.children.first.errors[0]).show();
        }

        if (errors.plainPassword.children.second.errors && (errors.plainPassword.children.second.errors.length > 0))
        {
            this.$('#passwordRepeat-error').html(errors.plainPassword.children.second.errors[0]).show();
        }
    },

    hideErrors()
    {
        this.$('.form-error').hide();
    }
});

RegistrationView.Events = {
    REGISTER_SUCCESS: 'register:success:view'
};

export default RegistrationView;