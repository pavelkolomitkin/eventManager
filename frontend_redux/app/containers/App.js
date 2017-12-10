import React from 'react';
import Routes from '../routes';
import Header from './Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SessionManager from '../services/SessionManager';

class App extends React.Component
{

    componentWillMount()
    {

        let session = SessionManager.getInstance();

        const currentPath = this.props.state.firewall.pathname;
        if (
            !session.isTokenValid() &&
            (currentPath !== '/login') &&
            (currentPath !== '/register')
        )
        {
            this.props.history.push('/login');
            return;
        }

        if (currentPath === '/')
        {
            this.props.history.push('/events');
            return;
        }
    }

    render()
    {
        return (
        <div className="container">
            <Header/>
            { Routes }
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(App);
