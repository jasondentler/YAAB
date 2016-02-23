"use strict";

export class Project {
    static fromJs(obj: any): Project {
        const swimlanes: Swimlane[] = [];
        for (let swimlane of obj.swimlanes) {
            swimlanes.push(Swimlane.fromJs(swimlane));
        }
        return new Project(obj.id, swimlanes, obj.headers);
    }

    constructor(
        public id?: string,
        public swimlanes?: Swimlane[],
        public headers?: string[]) {
        this.swimlanes = this.swimlanes || [];
        this.headers = this.headers || ["Feature", "To Do", "Doing", "Done"];
    }
}

export class Swimlane {
    static fromJs(obj: any): Swimlane {
        const cards: Card[][] = [];
        for (let cardColumn of obj.cards) {
            const cardsInColumn: Card[] = [];
            for (let card of cardColumn) {
                cardsInColumn.push(Card.fromJs(card));
            }
            cards.push(cardsInColumn);
        }
        return new Swimlane(
            obj.id,
            obj.title,
            obj.completion,
            cards);
    }

    constructor(
        public id?: string,
        public title?: string,
        public completion?: number,
        public cards?: Card[][]) {
        this.cards = this.cards || [];
    }
}

export class Card {
    static fromJs(obj: any): Card {
        const labels: Label[] = [];
        for (let label of obj.labels) {
            labels.push(Label.fromJs(label));
        }
        return new Card(
            obj.id,
            obj.title,
            obj.description,
            obj.userName,
            obj.userEmail,
            obj.type,
            obj.isBlocked,
            obj.isReady,
            obj.estimate,
            labels
        );
    }

    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public userName?: string,
        public userEmail?: string,
        public type?: string,
        public isBlocked?: boolean,
        public isReady?: boolean,
        public estimate?: string,
        public labels?: Label[]) {
        this.isBlocked = !!this.isBlocked;
        this.isReady = !!this.isReady;
        this.labels = this.labels || [];
        this.type = this.type || "default";
    }

    changeState(newState: string): void {
        console.log({ state: newState, card: this });
    }

    transferToSwimlane(swimlane: Swimlane): void {
        console.log({ swimlane: swimlane, card: this });
    }
}

export class Label {

    static fromJs(obj: any): Label {
        return new Label(obj.text, obj.type);
    }

    constructor(public text?:string, public type?:string) {
        this.type = this.type || "default";
    }
}
