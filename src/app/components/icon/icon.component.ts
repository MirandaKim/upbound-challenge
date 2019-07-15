import { Component, OnInit, Input } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Icon (icon.component.ts)                           */
/*                                                     */
/******************************************************/
/*

Component for an icon.

Site icons are created using an SVG sprite.
Create a specific icon by inputing property values (e.g. type, size, color, ...)

Go to this component's style file to see all the available style options: ./icon.component.scss

*************
*  Example: *
*************

Create a small dark oragne pencil icon:
<app-icon class="icon" iconType="pencil" iconSize="small" iconColor="dark-orange"></app-icon>


*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init

******************/

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /********************
  *  > Icon Options   *
  ********************/

  /*Type: image/shape of the icon (e.g. pencil, trash, ...)*/
  @Input()
  public iconType: string; // e.g. icon-trash, icon-database, icon-eye (see src/assets/symbol-defs.svg all svg ids)

  /*Size: the resulting size of the icon*/
  @Input()
  public iconSize: string = "medium"; // e.g. small, medium, large (see ./icon.component.scss for all size options)

  /*Color: the fill color of the icon*/
  @Input()
  public iconColor: string = "medium-grey"; // e.g. black, white, orange (see ./icon.component.scss for all size options)

  /*Color on Hover: the icon's fill color when hovered*/
  @Input()
  public iconColorOnHover: string = "none"; // e.g. black, white, orange (see ./icon.component.scss for all size options)

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
