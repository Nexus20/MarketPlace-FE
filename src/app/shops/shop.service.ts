import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IShopResult} from "./models/IShopResult";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IShopResult[]>(`${this.api}shop`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IShopResult>(`${this.api}shop/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IShopResult>(`${this.api}shop`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IShopResult>(`${this.api}shop/${id}`, body);
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}shop/${id}`);
    }
}
