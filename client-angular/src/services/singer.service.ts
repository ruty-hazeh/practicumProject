// singer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Singer, SingerDTO } from '../models/singer';



@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private baseUrl = 'https://localhost:7208/api/singer'; // תעדכני ל-URL של ה-API שלך

  constructor(private http: HttpClient) {}

  getAll(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.baseUrl);
  }

  add(singer: SingerDTO): Observable<Singer> {
    return this.http.post<Singer>(this.baseUrl, singer);
  }

  update(id: number, singer: SingerDTO): Observable<Singer> {
    return this.http.put<Singer>(`${this.baseUrl}/${id}`, singer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
