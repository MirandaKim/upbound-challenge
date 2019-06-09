import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skip-to-content',
  templateUrl: './skip-to-content.component.html',
  styleUrls: ['./skip-to-content.component.scss']
})
export class SkipToContentComponent implements OnInit {

  @Input()
  contentId: string = 'main-content';

  @Input()
  linkText: string = 'Skip to Main Content';

  constructor() { }

  ngOnInit() {
  }


}
