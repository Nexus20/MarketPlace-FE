import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ICategoryResult} from "./models/ICategoryResult";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly api = environment.api;

  constructor(private httpClient: HttpClient) { }

  public get = (queryParams?: {}) => {
    return this.httpClient.get<ICategoryResult[]>(`${this.api}categories`, { params: queryParams });
  }

  public getById = (id: string) => {
    return this.httpClient.get<ICategoryResult>(`${this.api}categories/${id}`);
  }

  public create = (route: string, body: FormData) => {
    return this.httpClient.post<ICategoryResult>(`${this.api}categories`, body);
  }

  public update = (id: string, body: FormData) => {
    return this.httpClient.put<ICategoryResult>(`${this.api}categories/${id}`, body);
  }
}
