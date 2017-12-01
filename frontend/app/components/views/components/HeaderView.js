import Marionette from 'backbone.marionette';
import template from '../../../templates/components/header.jst';


const HeaderView = Marionette.View.extend({
    template: template,
    ui: {
        'userMenu': '#user-menu',
        'userName': '#user-name'
    },

    triggers: {
        'click #user-logout': 'user:logout'
    },

    updateUserState(userData)
    {
        if (userData)
        {
            this.ui.userName.html(userData.username);
            this.ui.userMenu.show();
        }
        else
        {
            this.ui.userMenu.hide();
        }
    }
});

export default HeaderView;