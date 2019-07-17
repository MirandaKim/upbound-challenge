import { Pipe, PipeTransform } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Truncate With Suffix (truncate-with-suffix.pipe.ts)*/
/*                                                     */
/******************************************************/
/*

Truncate a number and append a letter suffix to represent the numbers actual size:
1000 -> 1K
2000000 -> 2M
3000000000 -> 3B
4000000000000 -> 4T

WARNING: This does not handle strings, which means it will not handle aready formated values (e.g. 1,000,000).
         Consider adding a feature to format commas into the resulting value.

******************
*   Parameters   *
******************

withSpace --> (boolean) add a space between the value and the suffix
              Default: false
              '100K'(false) vs '100 K'(true)

notTillLength --> (number) Don't truncate a number till it reaches this digit count.
                  Default: 4
                  Want to show 1000, but truncate once it reaches 10K? notTillLength: 5
                  Don't want to truncate till the number reaches a million? notTillLength: 7


****************
*   Examples   *
****************

{{ 1000 | truncateWithSuffix }} -> 1K
{{ 1000 | truncateWithSuffix: false : 5 }} -> 1000
{{ 10000 | truncateWithSuffix: false : 5 }} -> 10K
{{ 3000000 | truncateWithSuffix }}-> 3M
{{ 3000000 | truncateWithSuffix: true : 8 }}-> 3000000
{{ 30000000 | truncateWithSuffix: true : 8 }}-> 30 M
{{ 400000000 | truncateWithSuffix }}-> 400M
{{ 5000000000 | truncateWithSuffix : true }}-> 5 B
{{ 60000000000000 | truncateWithSuffix }} -> 60T

*****************
*   Contents:   *
*****************

  # Properties
  # Transorm
  # Utilities

****************************/

@Pipe({
  name: 'truncateWithSuffix'
})
export class TruncateWithSuffixPipe implements PipeTransform {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  private suffixOptions = [
      {
        suffix: 'T', // trillion
        value: Math.pow(10, 12)
      },
      {
        suffix: 'B', // billion
        value: Math.pow(10, 9)
      },
      {
        suffix: 'M', // million
        value: Math.pow(10, 6)
      },
      {
        suffix: 'K', // thousand
        value: 1000
      }
  ];

  /********************************************/
  /*   # Transform                           */
  /******************************************/

  transform(value: number, withSpace: boolean = false, notTillLength: number = 4): string | number {
    /* Check is number greater than 0 (will only work value is a number) */
    if(isNaN(value) || value === null || value === 0) return value;
    /*Check if the number is large enough to be truncated*/
    let numberLength = this.digitCount(value);
    if(numberLength < notTillLength) return value;
    /* Get absolute value */
    let abs = Math.abs(value);
    /* Keep track of negative */
    const isNegative = value < 0; // will also work for Negetive numbers
    /*
    Loop through each of the suffix options
    to find the right one for this number.
    Truncate the numer and append the appropriate letter suffix
    (skipping over the any, as requrested)
    */
    for (let i = 0; i < this.suffixOptions.length; i++) {
        let truncated = abs / this.suffixOptions[i].value; // get the shortened version
        truncated = Math.round(truncated * 10) / 10;
        if (truncated >= 1) {
            let suffix = (withSpace ? ' ' : '') + this.suffixOptions[i].suffix;
            return (isNegative ? '-' : '') + truncated + suffix;
        }
    }
    return (isNegative ? '-' : '') + abs;
  }

  /********************************************/
  /*   # Utilities                           */
  /******************************************/

  /*
  Digit Count:
  Get the number of digits in a number.
  Ex: digitCount(1000) returns 4
  */
  digitCount(value: number): number {
    return Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
  }

}
