import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';
import { Music } from './music';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewSongComponent } from './new-song/new-song.component';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, retry, tap } from 'rxjs/operators';
import { ImgLoaderPipe } from './img-loader.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Streamer-fe';
  songs: Array<Music>;
  currentSong: Music;
  bsModalRef: BsModalRef;
  searchTerm = '';

  constructor(private service: AudioService, private modalService: BsModalService, private imgLoader: ImgLoaderPipe) { }

  ngOnInit(): void {
    this.songs = [];
    this.currentSong = null;
    fromEvent(document.getElementById('src'), 'keyup').pipe(
      map((e: any) => e.target.value.trim().toLowerCase()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((f: string) => f.length > 0 ? this.service.getSongs(f) : this.service.getSongs()),
      retry(3),
      tap((e: Music[]) => {
        e.forEach(song => {
          this.imgLoader.transform(song.image).subscribe(imgres => {
            song.image = imgres;
          });
        });
      })
    ).subscribe((res: Array<Music>) => {
      this.songs = res;
      this.songs.forEach(song => {
        this.imgLoader.transform(song.image).subscribe(imgres => {
          song.imageUrl = imgres;
        });
      });
    });

    this.service.getSongs().subscribe((res: Array<Music>) => {
      this.songs = res;
      this.songs.forEach(song => {
        this.imgLoader.transform(song.image).subscribe(imgres => {
          song.imageUrl = imgres;
        });
      });
    });
  }

  newSong(): void {
    this.bsModalRef = this.modalService.show(NewSongComponent);
  }
}
