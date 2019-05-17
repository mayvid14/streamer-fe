import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';
import { Music } from './music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Streamer-fe';
  currentSong: Music;

  constructor(private service: AudioService) {}

  ngOnInit(): void {
    this.service.getDefaultSong().subscribe(song => {
      this.currentSong = song;
      console.log(song);
    });
  }
}
