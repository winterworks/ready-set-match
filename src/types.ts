export interface Data {
    collections: Collection[];
}

export interface Collection {
    name: string;
    sets: Set[];

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