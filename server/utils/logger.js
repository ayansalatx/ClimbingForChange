
const info = (messages, data) => {
	if (process.env.NODE_ENV !== "test") {
		console.log(messages, data ?? "");
	}
};

const error = (error, data) => {
	if (process.env.NODE_ENV !== "test") {
		console.error(error, data ?? "");
	}
};

export default { info, error };