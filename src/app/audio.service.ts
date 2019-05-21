import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from './music';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  defaultUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getDefaultSong(): Observable<Music> {
    return this.http.get<Music>(`${this.defaultUrl}/track/def`);
  }

  postSong(title: string, artist: string, audio: File, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('audio', audio);
    formData.append('image', image);
    formData.append('title', title);
    formData.append('artist', artist);
    return this.http.post(`${this.defaultUrl}/track`, formData);
  }

  getSongs(term: string): Observable<Array<Music>> {
    const searchTerm = encodeURI(term);
    return this.http.get<Array<Music>>(`${this.defaultUrl}/track/${searchTerm}`);
  }

  getImage(path: string): Observable<any> {
    return this.http.post<any>(`${this.defaultUrl}/img`, { image: path }, { responseType: 'blob' as 'json'});
  }
}
