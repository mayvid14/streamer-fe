import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.sass']
})
export class NewSongComponent implements OnInit {
  audioFile: File;
  imageFile: File;
  title = '';
  artist = '';
  msg = '';
  duration = 0;

  constructor(public bsModalRef: BsModalRef, private service: AudioService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList, type: string) {
    if (type === 'image') {
      this.imageFile = files.item(0);
      return;
    }
    this.audioFile = files.item(0);
    let obUrl = URL.createObjectURL(this.audioFile);
    let audioElement = document.createElement("audio");
    audioElement.setAttribute('src', obUrl);
    audioElement.oncanplaythrough = ((e: any) => {
      this.duration = e.currentTarget.duration;
    });
  }

  save(): void {
    this.service.postSong(this.title, this.artist, this.audioFile, this.imageFile, this.duration).subscribe(res => {
      if (res.success) {
        this.bsModalRef.hide();
      } else {
        this.msg = 'An error occured';
      }
    });
  }

}
