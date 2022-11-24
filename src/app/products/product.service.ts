import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IProductResult} from "./models/IProductResult";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IProductResult[]>(`${this.api}product`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IProductResult>(`${this.api}product/${id}`);
    }

    public getShopProducts = (queryParams?: {}) => {
        return this.httpClient.get<IProductResult[]>(`${this.api}product/GetOwnProducts`, {params: queryParams});
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IProductResult>(`${this.api}product`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IProductResult>(`${this.api}product/${id}`, body);
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}product/${id}`);
    }
}
