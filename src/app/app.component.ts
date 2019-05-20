import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';
import { Music } from './music';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewSongComponent } from './new-song/new-song.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Streamer-fe';
  currentSong: Music;
  bsModalRef: BsModalRef;

  constructor(private service: AudioService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.service.getDefaultSong().subscribe(song => {
      this.currentSong = song;
      console.log(song);
    });
  }

  newSong(): void {
    this.bsModalRef = this.modalService.show(NewSongComponent);
  }
}
