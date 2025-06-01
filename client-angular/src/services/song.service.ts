import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({ 
  providedIn: 'root' 
})
export class SongService {
  private apiUrl = 'https://server-dotnet.onrender.com/api/song';
  private s3Url = 'https://server-dotnet.onrender.com/api/s3';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  add(song: any): Observable<any> {
    return this.http.post(this.apiUrl, song);
  }

  update(id: number, song: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, song);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.s3Url}/upload`, formData);
  }

  // downloadFile(fileName: string): Observable<Blob> {
  //   return this.http.get(`${this.s3Url}/download/${fileName}`, { responseType: 'blob' });
  // }
  downloadFile(fileName: string): Observable<Blob> {
    const encodedFileName = encodeURIComponent(fileName);
    return this.http.get(`${this.s3Url}/download/${encodedFileName}`, { responseType: 'blob' });
  }

  
  deleteFile(fileName: string): Observable<any> {
    return this.http.delete(`${this.s3Url}/delete/${fileName}`, { responseType: 'text' });
  }
}
