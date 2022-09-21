import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../item.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() items: Item[]

    constructor() { }

    ngOnInit(): void {
    }

    @Output() itemDeleted = new EventEmitter<Item>()

    /**
     * Copies the passed item to the user's clipboard.
     * @param item 
     */
    onCopy(item: Item): void {
        navigator.clipboard.writeText(item.name)
            .then(() => console.log(`Copied to clipboard: ${item.name}`))
            .catch((error) => console.error('Failed to copy the item to the clipboard.', error))
    }

    /**
     * Copies all saved results to the user's clipboard.
     * Inserts a new line character in between each result for improved formatting when pasting from the clipboard.
     */
    onCopyAll(): void {
        const text = this.items.reduce((prev, curr) => { return prev + (prev.length > 0 ? "\n" : "") + curr.name}, "")
        navigator.clipboard.writeText(text)
            .then(() => console.log(`Copied to clipboard: ${text}`))
            .catch((error) => console.error('Failed to copy the text to the clipboard.', error))
    }

    /**
     * Removes the passed item from the saved results and updates local storage with the new value.
     * @param item
     */
    onDelete(item: Item): void {
        console.log(`Deleted: ${item.name}`)
        const index = this.items.findIndex((currentItem) => currentItem.id === item.id)
        if (index !== -1) {
            this.items.splice(index, 1)
        }
        // this.items = this.items.filter((currentItem) => currentItem.id !== item.id) // Doesn't work, seems to break the two-way binding.
        localStorage.setItem("items", JSON.stringify(this.items))
        // this.itemDeleted.emit(item)
    }

    /**
     * Removes all saved results from the list as well as local storage persistance.
     */
    onDeleteAll(): void {
        console.log("Deleted all saved items.")
        this.items.splice(0, this.items.length)
        localStorage.removeItem("items")
    }

}
