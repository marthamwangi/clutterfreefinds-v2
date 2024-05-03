import { Injectable, Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Injectable()
@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    value: any,
    sortOrder: SortOrder | string = 'asc',
    sortKey?: string
  ): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numberArray: Array<any>;
    let stringArray: Array<any>;

    if (!sortKey) {
      numberArray = value
        .filter((item: any) => typeof item === 'number')
        .sort();
      stringArray = value
        .filter((item: any) => typeof item === 'string')
        .sort();
    } else {
      numberArray = value
        .filter(
          (item: { [x: string]: any }) => typeof item[sortKey] === 'number'
        )
        .sort(
          (a: { [x: string]: number }, b: { [x: string]: number }) =>
            a[sortKey] - b[sortKey]
        );
      stringArray = value
        .filter(
          (item: { [x: string]: any }) => typeof item[sortKey] === 'string'
        )
        .sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
    }
    const sorted = numberArray.concat(stringArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}
