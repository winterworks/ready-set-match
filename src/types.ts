export interface Data {
    categories: Categories;
}

export type Categories = Record<string, Category>;

export interface Category {
    name: string;
    sets: Set[];

    link?: string;
    icon?: string;
    categories?: Category[];
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