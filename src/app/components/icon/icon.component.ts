import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  iconType: string; // e.g. icon-trash, icon-database, icon-eye (see src/assets/symbol-defs.svg all svg ids)

  @Input()
  iconSize: string = "medium"; // e.g. small, medium, large (see ./icon.component.scss for all size options)

  @Input()
  iconColor: string = "medium-grey"; // e.g. black, white, orange (see ./icon.component.scss for all size options)

  @Input()
  iconColorOnHover: string = "none"; // e.g. black, white, orange (see ./icon.component.scss for all size options)

  constructor() { }

  ngOnInit() {
  }


}
