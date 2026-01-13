import { IProduct } from "./product";

export interface IProductsResponse {
    message: string;
    data: IProduct[]
}
