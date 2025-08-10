import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AccountLSService {
    private baseUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    // createAccount(Account: account): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/create`, Account);
    // }
    Post(url: string, accountObj: any): Observable<any> {
        return this.http.post(`${this.baseUrl}${url}`, accountObj);
    }

    getAllData(url: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}${url}`);
    }

    updateAccount(url: string, id: number, accountObj: any): Observable<any> {
        debugger
        return this.http.put(`${this.baseUrl}${url}/${id}`, accountObj)
        // return this.http.put(`${this.baseUrl}/update/${id}`, account)
    }

    RemoveAccount(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${id}`)
    }
}