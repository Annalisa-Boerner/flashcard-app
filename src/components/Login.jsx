import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../common/AlertMessage.jsx';
import useFields from '../hooks/useFields';

function LoginForm({ login }) {
	const navigate = useNavigate();

	const initialState = {
		username: '',
		password: '',
	};

	const [formData, handleChange] = useFields(initialState);
	const [errors, setErrors] = React.useState([]);

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		const loginRes = await login(formData);
		if (loginRes.loggedIn) {
			navigate('/');
		} else {
			setErrors(loginRes.errs);
		}
	};

	return (
		<div className="LoginForm">
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">
							Username:
							<input
								id="username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								type="text"
								required
							/>
						</label>
					</div>

					<div>
						<label htmlFor="password">
							Password:
							<input
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								type="password"
								required
							/>
						</label>
					</div>

					{errors.length ? (
						<AlertMessage alertType="danger" errs={errors} />
					) : null}
					<div className="text-end">
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;