///<reference path="../../typings/browser/ambient/knockout/knockout.d.ts" />
///<reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
///<amd-dependency path="app/projectViewComponent/viewmodels" />
///<amd-dependency path="app/knockout-bindings/gravatar" />
///<amd-dependency path="knockout-sortable" />

import ko = require("knockout");
import $ = require("jquery");
import * as viewmodels from "./viewmodels";
import * as models from "./models";
import * as pageData from "../require/pageData";

$(function () {
    var project = models.Project.fromJs(pageData.get<models.Project>("project"));
    var vm = new viewmodels.ProjectViewModel(project);
    var target = $(".agile-board")[0];
    console.log("Before binding");
    console.log({ model: project });
    console.log({ 'view-model': ko.toJS(vm) });
    console.log(target);
    ko.applyBindings(vm, target); // This makes Knockout get to work
    console.log("After binding");
})