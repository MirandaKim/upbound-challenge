import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card-footer-active',
  templateUrl: './card-footer-active.component.html',
  styleUrls: ['./card-footer-active.component.scss']
})
export class CardFooterActiveComponent implements OnInit {

  @Input()
  card: Card;

  @Input()
  totalRevenueCurrency: string = 'USD';

  constructor() { }

  ngOnInit() {
  }

}
