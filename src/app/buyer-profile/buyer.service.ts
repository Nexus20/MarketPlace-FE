import {Injectable} from '@angular/core';
import {IOrderResult} from "../orders/models/IOrderResult";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BuyerService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public getBuyerOrders = (queryParams?: {}) => {
        return this.httpClient.get<IOrderResult[]>(`${this.api}buyer/GetOwnOrders`, {params: queryParams});
    }
}
