import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginPage = ({error, userName, password, onSubmit, onChange}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                {   error &&
                    <div className="form-group form-error" id="errors">
                        <span className="text-danger">Неверный логин или пароль</span>
                    </div>
                }
                <div className="form-group">
                    <input type="text"
                           name="userName"
                           className="form-control"
                           placeholder="Email or username"
                           value={userName}
                           onChange={onChange} />
                </div>

                <div className="form-group">
                    <input type="password"
                           name="password"
                           className="form-control"
                           placeholder="Password"
                           value={password}
                           onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary right">Login</button>
                    <span> Or <Link to="/register">Register</Link></span>
                </div>

            </form>

        </div>
    );
}

LoginPage.propTypes = {
    error: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginPage;
