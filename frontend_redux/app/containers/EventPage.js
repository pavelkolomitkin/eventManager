import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventPageView from '../components/EventPage';
import * as eventActions from '../actions/eventActions';

class EventPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            event: {}
        };

        this.onDelete = this.onDelete.bind(this);
        this.props.actions.loadEvent(
            this.props.id,
            (event) => {
                this.setState({event: event});
            },
            (error) => {
                this.props.history.push('/notfound');
            }
            );
    }

    onDelete()
    {
        if (confirm('Вы действительно хотите удалить событие?'))
        {
            this.props.actions.deleteEvent(
                this.props.id,
                () => {
                    this.props.history.push('/events');
                }, () =>
                {
                    alert('Ошибка удаления события');
                }
            )
        }
    }

    render() {
        return (
            <EventPageView
                event={this.state.event}
                onDelete={this.onDelete}
            />
        );
    }
}

EventPage.propTypes = {};

function mapStateToProps(state, ownProps) {

    return {
        state: state,
        id: ownProps.match.params.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);