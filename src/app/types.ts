export interface Data {
    categories: Category[];
}

export interface Category {
    name: string;
    categories?: Category[];
    sets: Set[]
}

export interface Set {
    id: number;
    a: string;
    b: string;
}