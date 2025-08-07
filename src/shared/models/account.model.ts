export interface account {
    id: number;
    name: string;
    type: string;
}

export class Account {
    id: number;
    name: string;
    type: string;
    constructor() {
        this.id = 0;
        this.name = "";
        this.type = "";
    }
}