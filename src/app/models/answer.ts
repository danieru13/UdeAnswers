export interface Answer {
    id?: string;
    qid?: string;
    content?: {
        author?: string,
        uid: string,
        content: string,
        date: Date,
        score?: number;
    }[]
}