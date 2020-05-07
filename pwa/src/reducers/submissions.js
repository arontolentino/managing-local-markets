import { GET_SUBMISSIONS } from '../actions/types';

const initialState = { submissions: null };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
}
