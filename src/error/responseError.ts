export class ResponseError extends Error {
    constructor(public message: string, public status: number) {
    super(message);
    }
}

export const sendErrorResponse = (res: any, error: any) => {
    if (error instanceof ResponseError) {
    return res.status(error.status).json({
        success: false,
        message: error.message,
    });
}
    return res.status(500).json({
    success: false,
    message: 'Internal server error',
    });
};