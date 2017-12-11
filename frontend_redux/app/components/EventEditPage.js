import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-bootstrap-datetimepicker';
import Select from 'react-select';

const EventEditPage = ({eventLoaded, errors, onSubmit, onPriorityChange, onStatusChange, onStartDateChange, onEndDateChange, onChange, priorityOptions, statusOptions, titleValue, descriptionValue, timeStartValue, timeEndValue, priorityValue, statusValue }) => {
    return (
        <div>
            <h2>Create new Event</h2>
            {
                eventLoaded ?
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input name="title" className="form-control" placeholder="Title..." value={titleValue}
                                   onChange={onChange}/>
                            {
                                errors.title &&
                                <span className="text-danger form-error" id="title-error">{errors.title}</span>
                            }

                        </div>
                        <div className="form-group">
                            <textarea name="description" className="form-control" placeholder="Description..."
                                      value={descriptionValue} onChange={onChange}></textarea>
                            {
                                errors.description && <span className="text-danger form-error"
                                                            id="description-error">{errors.description}</span>
                            }
                        </div>


                        <label className="col-md-1">From</label>
                        <div className="col-md-5">
                            <div className="form-group">
                                <Datetime dateTime={timeStartValue} onChange={onStartDateChange}
                                          inputFormat="DD.MM.YYYY h:mm a" format="DD.MM.YYYY h:mm a"/>
                                {
                                    errors.timeStart && <span className="text-danger form-error"
                                                              id="timeStart-error">{errors.timeStart}</span>
                                }
                            </div>
                        </div>
                        <label className="col-md-1">Till</label>
                        <div className="col-md-5">
                            <div className="form-group">
                                <Datetime dateTime={timeEndValue} onChange={onEndDateChange}
                                          inputFormat="DD.MM.YYYY h:mm a" format="DD.MM.YYYY h:mm a"/>
                                {
                                    errors.timeEnd &&
                                    <span className="text-danger form-error" id="timeEnd-error">{errors.timeEnd}</span>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <Select
                                id="prioritySelect"
                                options={priorityOptions}
                                simpleValue
                                clearable={false}
                                name="prioritySelect"
                                value={priorityValue}
                                onChange={onPriorityChange}
                                openOnClick={false}
                                searchable={false}

                            />
                            {
                                errors.priority && <span className="text-danger form-error"
                                                         id="time-priority-error">{errors.priority}</span>
                            }
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Status</label>
                            <Select
                                id="statusSelect"
                                options={statusOptions}
                                simpleValue
                                clearable={false}
                                name="statusSelect"
                                value={statusValue}
                                onChange={onStatusChange}
                                openOnClick={false}
                                searchable={false}
                            />
                            {
                                errors.status &&
                                <span className="text-danger form-error" id="time-priority-error">{errors.status}</span>
                            }
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary right"/>
                        </div>
                    </form>
                    :
                    'Loading...'
            }
        </div>
    );
}

EventEditPage.propTypes = {
    eventLoaded: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    priorityOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    titleValue: PropTypes.string.isRequired,
    descriptionValue: PropTypes.string.isRequired,
    timeStartValue: PropTypes.string.isRequired,
    timeEndValue: PropTypes.string.isRequired,
    priorityValue: PropTypes.number.isRequired,
    statusValue: PropTypes.number.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onPriorityChange: PropTypes.func.isRequired

};

export default EventEditPage;
