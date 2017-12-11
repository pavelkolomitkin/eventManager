import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../actions/eventActions';
import URLSearchParams from 'url-search-params';

import EventFilter from './EventFilter';
import EventListView from '../components/EventList';
import PagerView from '../components/Pager';

class EventListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.buildPageRoute = this.buildPageRoute.bind(this);

        const {page, date} = this.props;
        this.props.actions.loadEvents(page, date);
    }

    isParamentersChanged(prevProps)
    {
        return ((this.props.page !== prevProps.page) || (this.props.date !== prevProps.date));
    }

    componentDidUpdate(prevProps)
    {
        if (this.isParamentersChanged(prevProps))
        {
            const {page, date} = this.props;
            this.props.actions.loadEvents(page, date);
        }
    }

    buildPageRoute(page)
    {
        let result = '/events?page=' + page;

        if (this.props.date)
        {
            result += '&date=' + this.props.date;
        }

        return result;
    }

    render() {

        return (
            <div>
                <EventListView events={this.props.events} />
                <PagerView
                    currentPage={this.props.page}
                    totalItems={this.props.eventsTotal}
                    pageSize={this.props.eventsOnPage}
                    routeBuilder={this.buildPageRoute}
                />
            </div>

        );
    }
}

function mapStateToProps(state, ownProps) {

    let queryParams = new URLSearchParams(ownProps.location.search);

    return {
        events: state.events.events ? state.events.events : [],
        eventsTotal: parseInt(state.events.eventsTotal),
        eventsOnPage: 10,
        page: parseInt(queryParams.get('page') ? queryParams.get('page') : 1),
        date: queryParams.get('date')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListPage);