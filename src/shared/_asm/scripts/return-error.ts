export type ReturnError = {
	message: string;
	code: number;
};

//* WrapperCount - a parameter that sets the number of wrappers around the function to shift the error array
export function returnError(
	error: unknown,
	code?: number,
	appName?: string,
	wrapperCount = 0,
	deep = Infinity,
	consoleIgnore = false,
): ReturnError {
	const errorCount = 2 + wrapperCount;
	const errorDeep = wrapperCount < 0 ? 0 : deep;

	code = code || -1;

	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';

	if (error) {
		if (typeof error === 'string') message = error;

		if (typeof error === 'object' && error !== null) {
			if ('message' in error) message = String(error.message);
			if ('code' in error) code = Number(error.code);
		}
	}

	if (!consoleIgnore) {
		console.error(
			appName ? `${appName} >` : '',
			`${code} | ${message}\n`,
			new Error().stack?.split('\n').splice(errorCount, errorDeep).join('\n'),
		);
	}

	return { code, message };
}
