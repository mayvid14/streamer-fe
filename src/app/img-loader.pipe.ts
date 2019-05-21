import { Pipe, PipeTransform } from '@angular/core';
import { AudioService } from './audio.service';
import { of, Subject } from 'rxjs';

@Pipe({
  name: 'imgLoader'
})
export class ImgLoaderPipe implements PipeTransform {
  url = new Subject<string | ArrayBuffer>();

  constructor(private service: AudioService) {
    console.log('CREATED');
  }

  transform(path: string): any {
    this.service.getImage(path).subscribe(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.url.next(reader.result);
      };
    });
    return this.url;
  }

}
