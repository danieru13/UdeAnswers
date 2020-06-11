export interface Answer {
    id?: string;
    qid?: string;
    content?: {
        author?: string,
        uid?: string,
        content?: string,
        score?: number;
    }[]
}