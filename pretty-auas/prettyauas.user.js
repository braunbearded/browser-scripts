// ==UserScript==
// @name         PrettyAUAS
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds some new functionality to auas
// @author       braunbearded
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://auas.cs.uni-duesseldorf.de/*
// @downloadURL  https://raw.githubusercontent.com/braunbearded/browser-scripts/master/pretty-auas/prettyauas.user.js
// ==/UserScript==

(function() {

let courses = document.getElementsByTagName("fieldset");
let overview = document.getElementsByClassName("icon-plus-circled").length > 0;
let mailInput = document.getElementById("LoginEmail");

if (courses.length > 0 && overview) {
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let children = course.children;

        //is course hidden from the start?
        let courseName = course.children[0].textContent;
        let hidden = localStorage.getItem(courseName);
        if (hidden === null || hidden === "false") hidden = false;
        else hidden = true;


        //add/show collabs button
        let legend = course.children[0];
        let expand = document.createElement("Button");
        let expandText = document.createTextNode("hide/collaps");
        expand.appendChild(expandText);
        legend.appendChild(expand);
        if (!hidden) expand.style.display = "none";

        //restore last session
        if (hidden === true) {
            for (let child of Array.from(children)) {
                if (child != legend) {
                    child.style.display = "none";
                }
            }
        }

        course.addEventListener("mouseenter", event => {
            expand.style.display = "initial";
        });

        course.addEventListener("mouseleave", event => {
            if (expand && !hidden) expand.style.display = "none";
        });

        expand.addEventListener("click", event => {
            if (hidden) {
                for (let child of Array.from(children)) {
                    if (child != legend && child != expand) {
                        if (child.tagName === "TABLE") {
                            child.style.display = "table";
                        } else {
                            child.style.display = "block";
                        }
                    }
                }
                hidden = false;
                localStorage.setItem(courseName, false);
            } else {
                for (let child of Array.from(children)) {
                    if (child != legend) {
                        child.style.display = "none";
                    }
                }
                hidden = true;
                localStorage.setItem(courseName, true);
            }
        });
    }
} else if (mailInput){
    mailInput.focus();
    console.log("Bitte anmelden");
}

})();

