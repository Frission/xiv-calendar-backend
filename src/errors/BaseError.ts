
export type BaseErrorType = "handled" | "redirect"

export class BaseError implements Error {
    public name: string
    public message: string
    public status: number
    public type?: BaseErrorType

    public constructor(name: string, message: string, status: number, type?: BaseErrorType) {
        this.name = name
        this.message = message
        this.status = status
        this.type = type
    }
}