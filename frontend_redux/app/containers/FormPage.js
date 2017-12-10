import React from 'react';

class FormPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFieldChange(event)
    {
        const fieldName = event.target.name;

        let state = this.state;
        state[fieldName] = event.target.value;

        this.setState(state);
    }

    onSubmit(event)
    {
        event.preventDefault();

        this.submitHandler(event);
    }

    submitHandler(event)
    {

    }
}

export default FormPage;