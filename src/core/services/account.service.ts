import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { account } from "../../shared/models/account.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private baseUrl = `${environment.apiUrl}/account`;

    constructor(private http: HttpClient) { }

    createAccount(Account: account): Observable<any> {
        return this.http.post(`${this.baseUrl}/create`, Account);
    }

    getAccounts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/get`);
    } 
}