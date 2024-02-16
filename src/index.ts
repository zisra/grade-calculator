import { login } from './api/login';

login({
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
});
