import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrderResult} from "./models/IOrderResult";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IOrderResult[]>(`${this.api}order`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IOrderResult>(`${this.api}order/${id}`);
    }

    public create = (body: any) => {
        return this.httpClient.post<IOrderResult>(`${this.api}order`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IOrderResult>(`${this.api}order/${id}`, body);
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}order/${id}`);
    }
}
