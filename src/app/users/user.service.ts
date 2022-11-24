import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ILoginResponse} from "./models/ILoginResponse";
import {Observable} from "rxjs";
import {IUserResult} from "./models/IUserResult";

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

    public register(payload: { firstname: string, lastname: string, phone: string, email: string, password: string, confirmPassword: string }): Observable<IUserResult> {
        return this.httpClient.post<IUserResult>(`${this.api}Users/Register`, payload);
    }
}
