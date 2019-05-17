import { Component, OnInit, Input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {
  @Input() song: Music;
  @ViewChild('player') player: ElementRef;
  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  duration = 0.01;

  constructor() { }

  ngOnInit() {
    console.log('Initializing');
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });

    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
    });

    this.player.nativeElement.addEventListener('loadstart', () => {
      this.loaderDisplay = true;
    });

    this.player.nativeElement.addEventListener('loadeddata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
  }

  play() {
    if (this.player.nativeElement.paused) {
      this.player.nativeElement.play(this.currentTime);
    } else {
      this.currentTime = this.player.nativeElement.currentTime;
      this.player.nativeElement.pause();
    }
  }

  forward() {
    const value = this.currentTime;
    this.currentTime = ((value + 5) < this.duration) ? value + 5 : value;
    this.currTimePosChanged();
  }

  currTimePosChanged() {
    this.player.nativeElement.currentTime = this.currentTime;
  }

  resetSong(): void {
    this.currentTime = 0;
    this.currTimePosChanged();
  }

  getDuration() {
    return this.duration === Number.POSITIVE_INFINITY ? this.isPlaying ? this.currentTime + 1 : this.currentTime : this.duration;
  }

}
