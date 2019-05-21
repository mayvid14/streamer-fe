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

  constructor(public bsModalRef: BsModalRef, private service: AudioService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList, type: string) {
    type === 'image' ? this.imageFile = files.item(0) : this.audioFile = files.item(0);
  }

  save(): void {
    this.service.postSong(this.title, this.artist, this.audioFile, this.imageFile).subscribe(res => {
      if(res.success) {
        this.bsModalRef.hide();
      } else {
        this.msg = 'An error occured';
      }
    });
  }

}
