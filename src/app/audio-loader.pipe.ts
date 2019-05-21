import { Pipe, PipeTransform } from '@angular/core';
import { AudioService } from './audio.service';

@Pipe({
  name: 'audioLoader'
})
export class AudioLoaderPipe implements PipeTransform {

  constructor(private service: AudioService) { }

  transform(path: string): any {
    return `${this.service.defaultUrl}/track/audio/${encodeURI(path)}`;
  }

}
