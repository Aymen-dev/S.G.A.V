import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from './journal';

@Injectable({
    providedIn: 'root'
})
export class JournalService {
    private addJournalURL = 'http://localhost:8080/API/journals/addJournal.php';
    private getJournalURL = "http://localhost:8080/API/journals/getJournal.php"

    constructor(private http: HttpClient) { }

    createJournalEntry(journalEntry: Journal) {
        return this.http.post(`${this.addJournalURL}`, journalEntry);
    }

    getJournal(sellerId: number){
        const url = `${this.getJournalURL}?id=${sellerId}`;
        return this.http.get(url);
    }
}