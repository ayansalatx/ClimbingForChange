

export const errorHandler = (
    error,
    _request,
    response,
    next
) => {
    console.log('--- ERROR HANDLER ENTERED ---');
    console.error('Error caught by errorHandler:', error);

    if (error instanceof Error) {
        console.log(
            "file errors/index.ts line 81 Error happened with message: ",
            error
        );

        return response.status(500).send({ error: error.message });
    }

    process.on("uncaughtException", error => {
        console.error("There was an uncaught error", error);
        process.exit(1);
    });

    next(error);
    return null;
};
