import { AccountType } from "../../core/services/account-types.enum";

export interface account {
    id: number;
    name: string;
    type: AccountType;
}

export class Account {
    id: number;
    name: string;
    type: AccountType;
    constructor() {
        this.id = 0;
        this.name = "";
        this.type = AccountType.ASSET;
    }
}