import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(items: any[], myFilter: (item: any) => boolean): any {
    if (!items || !myFilter) {
      return items;
    }
    return items.filter(item => myFilter(item));
  }
}
