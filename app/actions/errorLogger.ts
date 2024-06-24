const ErrorLogger = (...args: any[]): void => {

    try {
        args = args.map((o) => JSON.stringify(o));
        console.error(`[${args.join("\n")}]`);
    } catch (error) {
        console.error(`Error in ErrorLogger - ${error}`);
    }
};

export default ErrorLogger;