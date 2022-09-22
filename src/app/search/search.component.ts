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
  results: string[] = []
  data: string[] = [
    "Meets FDA Requirements",
    "Double Wall Construction For Insulation Of Hot Or Cold Liquids",
    "Keeps Drinks Hot Or Cold Up To 6 Hours",
    "Know yourself and you will win all battles.",
    "A leader leads by example, not by force.",
    "Appear weak when you are strong, and strong when you are weak.",
    "In the midst of chaos, there is also opportunity.",
    "The greatest victory is that which requires no battle."
  ]
  timeout: number

  constructor() { }

  ngOnInit(): void {
  }

  onAddResult(result: string): void {
    this.query = ""
    this.results = []
    this.items.push(new Item(result))
    localStorage.setItem("items", JSON.stringify(this.items))
  }

  onChange(query): void {
    this.query = query
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.handleSearch(), 500)
  }

  handleSearch(): void {
    if (this.query.length > 0) {
      this.results = this.data.filter((currentData) => currentData.toLowerCase().includes(this.query.toLowerCase()))
    } else {
      this.results = []
    }
  }

}
