import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconMapping'
})
export class IconPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'icon-frontal.png';
      case 2:
        return 'icon-zoom.png';
      default:
        return '';
    }
  }
}