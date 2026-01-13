type ProductStatus = 'anunciado' | 'vendido' | 'desativado';

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    status: ProductStatus;
    imageBase64: string;
}
