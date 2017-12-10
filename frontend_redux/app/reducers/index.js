import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import events from './eventReducer';
import priorities from './priorityReducer';
import profile from './profileReducer';
import security from './securityReducer';
import serverActivity from './serverActivityReducer';
import firewall from './firewallReducer';
import statuses from './statusReducer';

const rootReducer = combineReducers({
    firewall,
    events,
    priorities,
    profile,
    security,
    serverActivity,
    statuses,
    routing
});

export default rootReducer;
