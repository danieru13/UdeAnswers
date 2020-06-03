export interface Answer {
    id?: string;
    content?: {
        author?: string,
        uid?: string,
        content?: string,
        score?: number;
    }[]
}