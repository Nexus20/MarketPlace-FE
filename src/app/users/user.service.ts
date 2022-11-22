import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ILoginResponse} from "./models/ILoginResponse";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public login(email: string, password: string): Observable<ILoginResponse> {
        return this.httpClient.post<ILoginResponse>(`${this.api}Users/Login`, {
            email, password
        });
    }
}
