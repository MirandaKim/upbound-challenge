import { Component, OnInit, Input } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Skip to Content (skip-to-content.component.ts)     */
/*                                                     */
/******************************************************/
/*

Create a skip to content link that is hidden from view until focused.

Customize skip link with input properties for the parent component.
Example:

<app-skip-to-content contentId="main-content" linkText="Skip to Service Card List"></app-skip-to-content>


*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init

******************/


@Component({
  selector: 'app-skip-to-content',
  templateUrl: './skip-to-content.component.html',
  styleUrls: ['./skip-to-content.component.scss']
})
export class SkipToContentComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Input()
  contentId: string = 'main-content';

  @Input()
  linkText: string = 'Skip to Main Content';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
  }


}
