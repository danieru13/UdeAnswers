export interface Answer {
    id?: string;
    content?: {
        author?: string,
        content?: string,
        score?: number;
    }[]
}