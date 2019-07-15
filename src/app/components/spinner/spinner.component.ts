import { Component, OnInit, Input } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Spinner (spinner.component.ts)                     */
/*                                                     */
/******************************************************/
/*

Give a spinner to a parent component.
This component can be customized by the parent component by including some attribute values.

*****************
*   Contents:   *
*****************

  # Properties
    > Inputs
  # Constructor
  # On Init

******************/


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*************
  *  > Inputs  *
  *************/

  @Input('color')
  public spinnerColor: string = 'medium-grey'; // the color of the svg spinner

  @Input('size')
  public spinnerSize: string = 'medium'; // size of the spinner (e.g. 'small', 'medium', 'large', ...)

  @Input('position')
  public spinnerPosition: string = "center-parent"; // position of spinner ('center-parent' or 'fixed')

  @Input('overlay')
  public spinnerOverlay: boolean = false; // should there be a content overlay behind the spinner?

  @Input('overlayDark')
  public spinnerOverlayDark: boolean = false; // should the overlay be dark? Light if false, dark if true.

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {}

}
