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
}
