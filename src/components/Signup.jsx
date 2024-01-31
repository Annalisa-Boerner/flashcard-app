import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../common/AlertMessage.jsx';
import useFields from '../hooks/useFields';

function SignupForm({ signup }) {
	const navigate = useNavigate();

	const initialState = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
	};

	const [formData, handleChange] = useFields(initialState);
	const [errors, setErrors] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();

		const signupRes = await signup(formData);
		if (signupRes.signedUp) {
			navigate('/');
		} else {
			setErrors(signupRes.errs);
		}
	}

	return (
		<div className="SignupForm">
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

					<div>
						<label htmlFor="firstName">
							First Name:
							<input
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								type="text"
								required
							/>
						</label>
					</div>

					<div>
						<label htmlFor="lastName">
							Last Name:
							<input
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								type="text"
								required
							/>
						</label>
					</div>

					<div>
						<label htmlFor="email">
							Email:
							<input
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								type="email"
								required
							/>
						</label>
					</div>

					{errors.length ? (
						<AlertMessage alertType="danger" errs={errors} />
					) : null}

					<div>
						<button type="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignupForm;