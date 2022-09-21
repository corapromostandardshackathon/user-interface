import { Component, Input, OnInit } from '@angular/core';
import { Item } from "../item.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() items: Item[]
  query: string = ""
  results: string[] = [
    "In the midst of chaos, there is also opportunity.",
    "The greatest victory is that which requires no battle."
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddResult(result: string): void {
    this.query = ""
    this.items.push(new Item(result))
    localStorage.setItem("items", JSON.stringify(this.items))
  }

}
