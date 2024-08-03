import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private apiUrl = 'http://api.worldbank.org/v2'

  constructor(private http: HttpClient) { }

  getCountryData(countryCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${countryCode}?format=json`);
  }
}

