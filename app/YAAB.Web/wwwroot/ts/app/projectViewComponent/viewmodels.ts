///<reference path="../../typings/browser/ambient/knockout/knockout.d.ts" />
///<reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
///<amd-dependency path="app/projectViewComponent/models" />

import ko = require("knockout");
import $ = require("jquery");
import * as models from "./models";
import * as sortable from "knockout-sortable";

export interface KnockoutObservableArrayWithParent<T, TParent> extends KnockoutObservableArray<T> {
    parent: TParent;
}

export interface IWithModel<TModel> {
    model: TModel;
}

export class ViewModel<TModel> implements IWithModel<TModel> {
    model: TModel;

    constructor(model: TModel) {
        this.model = model;
    }
}

export class LabelViewModel extends ViewModel<models.Label> {
    constructor(label: models.Label) {
        super(label);
        this.text = ko.observable(label.text);
        this.type = ko.observable(label.type);
        this.typeClass = ko.computed(() => { return "label-" + this.type(); });
    }

    text: KnockoutObservable<string>;
    type: KnockoutObservable<string>;
    typeClass: KnockoutComputed<string>;
}

export class CardViewModel extends ViewModel<models.Card> {
    constructor(card: models.Card) {
        super(card);
        this.id = ko.observable(card.id);
        this.title = ko.observable(card.title);
        this.description = ko.observable(card.description);
        this.userName = ko.observable(card.userName);
        this.userEmail = ko.observable(card.userEmail);
        this.type = ko.observable(card.type);
        this.isBlocked = ko.observable(card.isBlocked);
        this.isReady = ko.observable(card.isReady);
        this.estimate = ko.observable(card.estimate);
        const labels = $.map(card.labels, label => new LabelViewModel(label));

        this.labels = <any>(ko.observableArray(labels));
        this.labels.parent = this;

        this.typeClass = ko.computed(() => { return "card-" + this.type(); });
        this.transform = ko.observable<string>();
        this.randomizeTransform();
    }

    id: KnockoutObservable<string>;
    title: KnockoutObservable<string>;
    description: KnockoutObservable<string>;
    userName: KnockoutObservable<string>;
    userEmail: KnockoutObservable<string>;
    type: KnockoutObservable<string>;
    isBlocked: KnockoutObservable<boolean>;
    isReady: KnockoutObservable<boolean>;
    estimate: KnockoutObservable<string>;
    labels: KnockoutObservableArrayWithParent<LabelViewModel, CardViewModel>;
    typeClass: KnockoutComputed<string>;
    transform: KnockoutObservable<string>;

    randomizeTransform(): void {
        const transform = 'rotate(' + (Math.random() - 0.5) * 10 + 'deg)';
        this.transform(transform);
    }

    move(from: SwimlaneColumnViewModel, to: SwimlaneColumnViewModel) {
        const fromState = from.stateText;
        const toState = to.stateText;

        if (fromState !== toState) {
            console.log(this.model.changeState);
            this.model.changeState(toState);
        }
        const fromSwimlane = from.swimlane;
        const toSwimlane = to.swimlane;
        if (fromSwimlane !== toSwimlane) {
            console.log(this.model.transferToSwimlane);
            this.model.transferToSwimlane(toSwimlane.model);
        }

        this.randomizeTransform();
    }

}

export class SwimlaneColumnViewModel extends ViewModel<models.Swimlane> {
    static buildAll(swimlane: models.Swimlane, vm: SwimlaneViewModel): SwimlaneColumnViewModel[] {
        const columns: SwimlaneColumnViewModel[] = [];
        const headers = ko.unwrap(vm.project.headers);
        const columnCount = headers.length - 1; // First header is for the swimlane heading
        for (let i = 0; i < columnCount; i++) {
            const cards = swimlane.cards[i] || [];
            columns.push(new SwimlaneColumnViewModel(cards, i, vm));
        }
        return columns;
    }

    constructor(cards: models.Card[], index: number, swimlane: SwimlaneViewModel) {
        super(swimlane.model);
        this.swimlane = swimlane;
        const cardViewModels = $.map(cards, card => new CardViewModel(card));
        this.cards = <any>ko.observableArray<CardViewModel>(cardViewModels);
        this.cards.parent = this;
        this.stateText = swimlane.project.headers()[index + 1];
    }

    cards: KnockoutObservableArrayWithParent<CardViewModel, SwimlaneColumnViewModel>;
    swimlane: SwimlaneViewModel;
    stateText: string;

    afterMove(args: sortable.IAfterMoveEvent<CardViewModel>) {
        const card = args.item;
        const sourceParent = <KnockoutObservableArrayWithParent<CardViewModel, SwimlaneColumnViewModel>>args.sourceParent;
        const source = sourceParent.parent;
        const targetParent = <KnockoutObservableArrayWithParent<CardViewModel, SwimlaneColumnViewModel>>args.targetParent;
        const target = targetParent.parent;
        card.move(source, target);
    }
}

export class SwimlaneViewModel extends ViewModel<models.Swimlane> {
    constructor(swimlane: models.Swimlane, project: ProjectViewModel) {
        super(swimlane);
        this.project = project;
        this.id = ko.observable(swimlane.id);
        this.title = ko.observable(swimlane.title);
        this.completion = ko.observable(swimlane.completion);
        const columns = SwimlaneColumnViewModel.buildAll(swimlane, this);
        this.columns = <any>ko.observableArray(columns);
        this.columns.parent = this;
    }

    id: KnockoutObservable<string>;
    title: KnockoutObservable<string>;
    completion: KnockoutObservable<number>;
    columns: KnockoutObservableArrayWithParent<SwimlaneColumnViewModel, SwimlaneViewModel>;
    project: ProjectViewModel;
}

export class ProjectViewModel extends ViewModel<models.Project> {
    constructor(project: models.Project) {
        super(project);
        this.id = project.id;
        this.headers = ko.observableArray(project.headers);
        const swimlanes = $.map(project.swimlanes, swimlane => new SwimlaneViewModel(swimlane, this));
        this.swimlanes = <any>ko.observableArray(swimlanes);
        this.swimlanes.parent = this;
    }
    id: string;
    headers: KnockoutObservableArray<string>;
    swimlanes: KnockoutObservableArrayWithParent<SwimlaneViewModel, ProjectViewModel>;
}
