import { Pipe, PipeTransform } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Ordinal (ordinal.pipe.ts)                          */
/*                                                     */
/******************************************************/
/*

Create an ordinal for a number:
'th', 'st', 'nd', 'rd'

******************
*   Parameters   *
******************

withNumber --> (boolean) default is true
    - If true, the number will be returned with the ordinal (ex: '33rd')
    - If false, only the ordinal will be returned (ex: 'rd')

****************
*   Examples   *
****************

{{ 101 | ordinal }} --> '101st'
{{ 102 | ordinal }} --> '102nd'
{{ 103 | ordinal: false }} --> 'rd'

****************************/

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

  protected ordinals: string[] = [ // ORDER MATTERS
    'th', // 0
    'st', // 1
    'nd', // 2
    'rd'  // 3
  ];

  transform(num: number, withNumber: boolean = true): string {
    let lastDigit = num % 10; // get the last diget of the provided number
    if(lastDigit > 3){ // if last diget is greater than 3, use the 'th' ordinal
      return withNumber ? num + this.ordinals[0] : this.ordinals[0];
    }else{ // if the last diget is 3 or less, use the diget to determine the ordinal from the list.
      return withNumber ? num +  this.ordinals[lastDigit] : this.ordinals[lastDigit];
    };
  }
}
