/// <reference path="../../typings/browser/ambient/require/require.d.ts" />
module RequireJs {

    requirejs.config({
        baseUrl: "/lib",
        paths: {
            "app": "../js/app",
            "jquery": "jquery/dist/jquery",
            "bootstrap": "bootstrap/dist/js/bootstrap",
            "knockout": "knockoutjs/dist/knockout",
            "blueimp-md5": "blueimp-md5/js/md5",
            "knockout-sortable": "knockout-sortable/build/knockout-sortable",
            "jquery-ui": "jquery-ui/jquery-ui.js",
            "jquery-ui/accordion": "jquery-ui/ui/accordion",
            "jquery-ui/autocomplete": "jquery-ui/ui/autocomplete",
            "jquery-ui/button": "jquery-ui/ui/button",
            "jquery-ui/core": "jquery-ui/ui/core",
            "jquery-ui/datepicker": "jquery-ui/ui/datepicker",
            "jquery-ui/dialog": "jquery-ui/ui/dialog",
            "jquery-ui/draggable": "jquery-ui/ui/draggable",
            "jquery-ui/droppable": "jquery-ui/ui/droppable",
            "jquery-ui/effect": "jquery-ui/ui/effect",
            "jquery-ui/effect-blind": "jquery-ui/ui/effect-blind",
            "jquery-ui/effect-bounce": "jquery-ui/ui/effect-bounce",
            "jquery-ui/effect-clip": "jquery-ui/ui/effect-clip",
            "jquery-ui/effect-drop": "jquery-ui/ui/effect-drop",
            "jquery-ui/effect-explode": "jquery-ui/ui/effect-explode",
            "jquery-ui/effect-fade": "jquery-ui/ui/effect-fade",
            "jquery-ui/effect-fold": "jquery-ui/ui/effect-fold",
            "jquery-ui/effect-highlight": "jquery-ui/ui/effect-highlight",
            "jquery-ui/effect-puff": "jquery-ui/ui/effect-puff",
            "jquery-ui/effect-pulsate": "jquery-ui/ui/effect-pulsate",
            "jquery-ui/effect-scale": "jquery-ui/ui/effect-scale",
            "jquery-ui/effect-slide": "jquery-ui/ui/effect-slide",
            "jquery-ui/effect-transer": "jquery-ui/ui/effect-transer",
            "jquery-ui/menu": "jquery-ui/ui/menu",
            "jquery-ui/mouse": "jquery-ui/ui/mouse",
            "jquery-ui/position": "jquery-ui/ui/position",
            "jquery-ui/progressbar": "jquery-ui/ui/progressbar",
            "jquery-ui/resizable": "jquery-ui/ui/resizable",
            "jquery-ui/selectable": "jquery-ui/ui/selectable",
            "jquery-ui/selectmenu": "jquery-ui/ui/selectmenu",
            "jquery-ui/slider": "jquery-ui/ui/slider",
            "jquery-ui/sortable": "jquery-ui/ui/sortable",
            "jquery-ui/spinner": "jquery-ui/ui/spinner",
            "jquery-ui/tabs": "jquery-ui/ui/tabs",
            "jquery-ui/tooltip": "jquery-ui/ui/tooltip",
            "jquery-ui/widget": "jquery-ui/ui/widget"
        },
        "shim": {
            bootstrap: {
                deps: ["jquery"],
                exports: "bootstrap"
            }
        }
    });
}