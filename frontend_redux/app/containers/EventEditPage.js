import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventEditPageView from '../components/EventEditPage';

class EventEditPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <EventEditPageView/>
        );
    }
}

EventEditPage.propTypes = {};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }

export default connect(mapStateToProps, null)(EventEditPage);