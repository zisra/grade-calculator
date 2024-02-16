import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://aspen.cps.edu';

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
	},
});

export async function login({
	username,
	password,
}: {
	username: string;
	password: string;
}) {
	const loginPageResponse: AxiosResponse<string> = await instance.get(
		'/aspen/logon.do'
	);

	if (loginPageResponse.status !== 200) {
		throw new Error('Aspen is currently down');
	}

	const loginPage = loginPageResponse.data;

	const [, session_id] = /sessionId='(.+)';/.exec(loginPage) as RegExpExecArray;
	const [, token] =
		/name="org.apache.struts.taglib.html.TOKEN" value="(.+)"/.exec(
			loginPage
		) as RegExpExecArray;

	const loginForm = new FormData();
	loginForm.append('org.apache.struts.taglib.html.TOKEN', token);
	loginForm.append('userEvent', 930);
	loginForm.append('deploymentId', 'aspen');
	loginForm.append('mobile', 'false');
	loginForm.append('username', username);
	loginForm.append('password', password);

	const loginResponse: AxiosResponse<string> = await instance.post(
		'/aspen/logon.do',
		loginForm,
		{
			headers: {
				Cookie: `JSESSIONID=${session_id}`,
			},
		}
	);

	if (loginResponse.data.includes('Invalid login.')) {
		throw new Error('Invalid login');
	}

	return { session_id, token };
}
