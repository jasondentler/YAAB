///<reference path="../../typings/browser/ambient/knockout/knockout.d.ts" />
///<reference path="../../typings/browser/ambient/jqueryui/jqueryui.d.ts" />
///<reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />

declare module "knockout-sortable" {

    export interface IMoveEvent<T> {
        item: T;
        sourceIndex: number;
        sourceParent: KnockoutObservableArray<T>;
        sourceParentNode: JQuery;
        targetIndex: number;
        targetParent: KnockoutObservableArray<T>;
    }

    export interface IAfterMoveEvent<T> extends IMoveEvent<T> {
    }

    export interface IBeforeMoveEvent<T> extends IMoveEvent<T> {
        cancelDrop: boolean;
    }
}