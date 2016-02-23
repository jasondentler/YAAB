///<reference path="../../typings/browser/ambient/knockout/knockout.d.ts" />
///<reference path="../../typings/browser/ambient/blueimp-md5/blueimp-md5.d.ts"/>
///<reference path="bindingHandlers.d.ts"/>
import ko = require("knockout");
import md5 = require("blueimp-md5");

function getHashedCredential(credential: string) {
    const isEmail = credential.indexOf("@") !== -1;
    if (typeof md5.md5 == "undefined")
        md5.md5 = (<any>md5); //Ugly hack because I don't understand typescript exports
    return !isEmail ? credential : md5.md5(credential);
}

function generateUrl(
    hashedCredential: string,
    size: number,
    rating: string,
    defaultImage: string,
    isSecure: boolean) {
    let url = isSecure ? "https://secure.gravatar.com/avatar/" : "http://www.gravatar.com/avatar/";
    url += hashedCredential + ".jpg?";

    if (!!size) {
        url += "s=" + size + "&";
    }

    if (!!rating) {
        url += "r=" + rating + "&";
    }

    if (!!defaultImage) {
        url += "d=" + encodeURIComponent(defaultImage);
    }
    return url;
}

ko.bindingHandlers.gravatar = {
    update(element: any, valueAccessor: any, allBindingsAccessor: any, viewModel: any) {
        const allBindings = allBindingsAccessor();
        var credential: any,
            size: any,
            rating: any,
            defaultImage: any,
            isSecure: any;
        const gravatar = allBindings.gravatar;
        if (typeof (ko.unwrap(gravatar)) == "string") {
            credential = ko.unwrap(gravatar);
        } else {
            credential = ko.unwrap(gravatar.credential);
            size = ko.unwrap(gravatar.size);
            rating = ko.unwrap(gravatar.rating);
            defaultImage = ko.unwrap(gravatar.defaultImage);
            isSecure = ko.unwrap(gravatar.isSecure);
        }

        if (typeof (credential) == "undefined" || credential == "") {
            return;
        }

        var hashedCredential = getHashedCredential(credential);
        var url = generateUrl(hashedCredential, size, rating, defaultImage, isSecure);
        element.src = url;
    }
};