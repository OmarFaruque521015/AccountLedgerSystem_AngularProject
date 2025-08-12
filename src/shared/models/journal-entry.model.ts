 
// export class JournalEntry {
//     id:number;
//     date: Date;
//     description: string;
//     lines:linesDto[];
//     constructor() {
//         this.id=0;
//         this.date = new Date();
//         this.description = "";
//         this.lines=[]
//     }
// }

// export class linesDto {
//     accountId: number;
//     debit: number;
//     credit: number;

//     constructor() {
//         this.accountId = 0;
//         this.debit = 0;
//         this.credit = 0;

//     }
// }

export class JournalEntry {
    id: number;
    date: any;
    description: string;
    constructor() {
        this.id = 0;
        this.date = new Date();
        this.description = "";
    }
}

