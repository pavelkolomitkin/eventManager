import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import URLSearchParams from 'url-search-params';
import EventFilterView from '../components/EventFilter';
import moment from 'moment';

class EventFilter extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            date: props.date,
            forAllTime: props.forAllTime
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onForAllTimeChange = this.onForAllTimeChange.bind(this);
    }

    onDateChange(date)
    {
        let state = this.state;
        state.date = date;
        state.forAllTime = false;

        this.setState(state);
    }

    onForAllTimeChange(event)
    {
        let state = this.state;

        state.forAllTime = event.target.checked;
        state.date = state.forAllTime ? null : moment().format('DD.MM.YYYY');

        this.setState(state);
    }


    render() {
        return (
            <EventFilterView
                date={this.state.date}
                forAllStatus={this.state.forAllTime}
                onDateChange={this.onDateChange}
                onForAllTimeChange={this.onForAllTimeChange}
            />
        );
    }
}

EventFilter.propTypes = {};

function mapStateToProps(state, ownProps) {

    let queryParams = new URLSearchParams(state.routing.location.search);

    return {
        date: queryParams.get('date'),
        forAllTime: !queryParams.get('date')
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }

export default connect(mapStateToProps, null)(EventFilter);