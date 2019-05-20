import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';
import { AudioService } from './audio.service';
import { NewSongComponent } from './new-song/new-song.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SecondsToMinutesPipe,
    NewSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  entryComponents: [NewSongComponent],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
