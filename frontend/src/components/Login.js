import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { connect } from 'react-redux';
import { login } from '../ducks/auth';

const Login = ({ login }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [validateStatus, setValidateStatus] = useState('');

	return (
		<div style={{ display: 'flex', justifyContent: 'center', background: '#EEEEEE', width: '100%', height: '100%', position: 'absolute' }}>
			<Card title={<div style={{ width: '100%', textAlign: 'center' }}><img style={{ height: 60, marginRight: 20 }} alt='Logo' /></div>} bordered={true}
				style={{ width: 300, position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
				<Form name='login-form'>
					<Form.Item
						name='username'
						rules={[{ required: true, message: 'Podaj nazwę użytkownika!' }]} validateStatus={validateStatus}
					>
						<Input prefix={<AiOutlineUser />} placeholder='Login' value={username} onChange={e => setUsername(e.target.value)} />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Podaj hasło!' }]} validateStatus={validateStatus}
					>
						<Input prefix={<AiOutlineLock />} type='password' placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} />
					</Form.Item>
					<Form.Item>
						<Button style={{ width: '100%' }} htmlType='submit' type='primary' loading={loading}
							onClick={() => {
								setLoading(true);
								login(username, password)
									.then(response => {
										setLoading(true);
										setValidateStatus(response.ok ? '' : 'error');
									});
							}}>
							Zaloguj
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);