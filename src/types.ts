export interface Data {
    categories: { [key: string]: Category };
}

export interface Category {
    name: string;
    sets: Set[];

    link?: string;
    icon?: string;
    categories?: Category[];
}

export interface Set {
    id: number;
    a: string;
    b: string;

    practiced?: number;
    mistakes?: number;
}