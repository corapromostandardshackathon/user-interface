import { Component } from '@angular/core';
import { Item } from "./item.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cora';

  items: Item[] = []

  ngOnInit(): void {
    let savedItems = JSON.parse(localStorage.getItem("items"))
    if (savedItems?.length > 0) {
      for(let item of savedItems) {
        this.items.push(new Item(item.name))
      }
    }
  }
}
