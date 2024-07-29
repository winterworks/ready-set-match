export interface Data {
    categories: Category[];
}

export interface Category {
    key: string;
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
}