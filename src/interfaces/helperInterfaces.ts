export interface ParsedWikiSection {
    title: string;
    body: string;
    length: number;
}

export interface RequestChunks {
    subject: string;
    section: string;
    body: string;
}

export interface PromptQuery {
    sections_number: Number;
    query_sections: String[]
}

export interface GaiaQueryRole {
    role: string;
    content: string;
}

export interface GaiaQuery {
    messages: GaiaQueryRole[]
}