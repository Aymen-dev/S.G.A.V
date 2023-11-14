import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private loginURL = "http://localhost:8080/API/users/login.php";
    private addUserURL = "http://localhost:8080/API/users/adduser.php";
    private getUsersURL = "http://localhost:8080/API/users/getusers.php";
    private getSellersURL = "http://localhost:8080/API/users/getsellers.php";
    private getChauffeursURL = "http://localhost:8080/API/users/getchauffeurs.php";
    private deleteUserURL = "http://localhost:8080/API/users/deleteuser.php";
    private getUserByIdURL = "http://localhost:8080/API/users/getuserbyid.php";

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        const user = {
            username: username,
            password: password
        }
        return this.http.post<any>(this.loginURL, user);
    }

    addUser(name: string, phone: string, cin: string, username: string, password: string, role: string) {
        const user = {
            name: name,
            phone: phone,
            cin: cin,
            username: username,
            password: password,
            role: role
        }
        return this.http.post<any>(this.addUserURL, user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<any[]>(this.getUsersURL);
    }

    getSellers(): Observable<User[]> {
        return this.http.get<any[]>(this.getSellersURL);
    }

    getChauffeurs(): Observable<User[]> {
        return this.http.get<any[]>(this.getChauffeursURL);
    }

    deleteUser(id: number): Observable<any> {
        const url = `${this.deleteUserURL}?id=${id}`; // Pass the id as a query parameter
        return this.http.delete(url);
    }

    getUserById(id: number): Observable<any> {
        const url = `${this.getUserByIdURL}?id=${id}`;
        return this.http.get<User>(url);
    }

}