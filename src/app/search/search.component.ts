import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from "../item.model";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Input() isSearching: boolean
    @Output() searchChange = new EventEmitter<boolean>();
    @Input() items: Item[]
    query: string = ""
    results: string[] = []
    timeout: ReturnType<typeof setTimeout>

    constructor(private http: HttpClient) { }

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

    onClear(): void {
        this.query = ""
        this.handleSearch()
    }

    handleSearch(): void {
        if (this.query.length > 0) {
            this.isSearching = true
            this.searchChange.emit(this.isSearching);
            this.http.get("https://ppds.hitpromo.net/hitOrderManagement/predText/keyH/Hackathon/text/{query}".replace("{query}", this.query)).subscribe((data: []) => {
                let options = data.map((option) => {
                    return {
                        value: this.query + " " + option[0],
                        probability: option[1]
                    }
                })

                let uniqueOptions = options.reduce((prev, curr) => {
                    if (prev.find(element => element.value == curr.value) === undefined) {
                        prev.push(curr)
                    }
                    return prev;
                }, [])
                this.results = uniqueOptions
                this.isSearching = false
                this.searchChange.emit(this.isSearching);
            })
        } else {
            this.results = []
        }
    }

}
