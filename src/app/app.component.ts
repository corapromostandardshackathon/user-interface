import { Component } from '@angular/core';
import { Item } from "./item.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cora';

  items: Item[] = [
    new Item("Know yourself and you will win all battles."),
    new Item("A leader leads by example, not by force."),
    new Item("Appear weak when you are strong, and strong when you are weak."),
  ]
}
