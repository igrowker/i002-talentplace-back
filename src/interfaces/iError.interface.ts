interface IError {
    message: string;
    code?: number;
    error?: string;
    detail?: string;
    hint?: string;
    schema?: string;
    table?: string;
    column?: string;
    constraint?: string;
}

export default IError