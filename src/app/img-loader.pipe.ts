import { Pipe, PipeTransform } from '@angular/core';
import { AudioService } from './audio.service';
import { of, Subject } from 'rxjs';

@Pipe({
  name: 'imgLoader'
})
export class ImgLoaderPipe implements PipeTransform {

  constructor(private service: AudioService) {
    console.log('CREATED');
  }

  transform(path: string): any {
    const url = new Subject<string | ArrayBuffer>();

    this.service.getImage(path).subscribe(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        url.next(reader.result);
      };
    });
    
    return url;
  }

}
