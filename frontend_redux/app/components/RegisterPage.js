import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RegisterPage = ({errors, userName, email, password, passwordRepeat, onSubmit, onFieldChange}) => {
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="text" name="userName" className="form-control" placeholder="Username" value={userName} onChange={onFieldChange} />
                    {
                        errors.username && <span className="text-danger form-error" id="username-error">{errors.username}</span>
                    }
                </div>

                <div className="form-group">
                    <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={onFieldChange} />
                    {
                        errors.email && <span className="text-danger form-error" id="email-error">{errors.email}</span>
                    }
                </div>

                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={onFieldChange} />
                    {
                        errors.password && <span className="text-danger form-error" id="password-error">{errors.password}</span>
                    }
                </div>
                <div className="form-group">
                    <input type="password" name="passwordRepeat" className="form-control" placeholder="Repeat password" value={passwordRepeat} onChange={onFieldChange} />
                    {
                        errors.passwordRepeat && <span className="text-danger form-error" id="passwordRepeat-error">{errors.passwordRepeat}</span>
                    }
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary right">Register</button>
                    <span> Or <Link to="/login">Login</Link></span>
                </div>

            </form>

        </div>
    );
}

RegisterPage.propTypes = {
    errors: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordRepeat: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired
};

export default RegisterPage;
