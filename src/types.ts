export interface Data {
    collections: Collections;
}

export type Collections = Record<string, Collection>;

export interface Collection {
    name: string;
    sets: Set[];

    link?: string;
    icon?: string;
    collections?: Collection[];
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