import { v4 as uuid} from "uuid"

export class Item {
    public id: string
    public name: string

    constructor(name: string) {
        this.id = uuid()
        this.name = name
    }
}