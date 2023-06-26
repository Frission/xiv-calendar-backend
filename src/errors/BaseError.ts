

export class BaseError implements Error {
    public name: string
    public message: string
    public status: number
    public originalErr?: unknown

    public constructor(name: string, message: string, status: number, originalErr?: unknown) {
        this.name = name
        this.message = message
        this.status = status
        this.originalErr = originalErr
    }
}