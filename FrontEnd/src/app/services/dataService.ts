import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class DataService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string){}

    async get<T>(url: string): Promise<T>{
        try {
            return await new Promise<T>((resolve, reject) => {
                this.http.get<T>(this.baseUrl + url)
                .subscribe({
                    next: result => resolve(result),
                    error: error => reject(error)
                });
            });
        } catch (error_1) {
            return await Promise.reject(error_1);
        }
    }

    async delete<T>(url: string): Promise<T>{
        try {
            return await new Promise<T>((resolve, reject) => {
                this.http.delete<T>(this.baseUrl + url)
                .subscribe({
                    next: result => resolve(result),
                    error: error => reject(error)
                });
            });
        } catch (error_1) {
            return await Promise.reject(error_1);
        }
    }

    async doPost<T>(url: string, data: any): Promise<T>{
        try {
            return await new Promise<T>((resolve, reject) => {
                this.http.post<T>(this.baseUrl + url, data)
                    .subscribe({
                        next: result => resolve(result),
                        error: error => reject(error)
                    });
            });
        } catch (error_1) {
            return await Promise.reject(error_1);
        }
    }

    async doPut<T>(url: string, data: any): Promise<T>{
        try {
            return await new Promise<T>((resolve, reject) => {
                this.http.put<T>(this.baseUrl + url, data)
                .subscribe({
                    next: result => resolve(result),
                    error: error => reject(error)
                });
            });
        } catch (error_1) {
            return await Promise.reject(error_1);
        }
    }
}