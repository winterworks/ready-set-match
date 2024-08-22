export interface Data {
    collections: Collection[];
    categories: Category[];
}

export interface Category {
    name: string;
}

export interface Collection {
    name: string;
    sets: Set[];

    category?: string;
    link?: string;
    icon?: string;
    aIsLarge?: boolean;
    bIsLarge?: boolean;
}

export interface Set {
    id: string;
    a: string;
    b: string;

    practiced?: number;
    mistakes?: number;
}