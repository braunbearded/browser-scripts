// ==UserScript==
// @name         youtube-default-settings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  set default values for youtube videos
// @author       braunbearded
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/braunbearded/browser-scripts/master/youtube-default-settings/youtube-default-settings.user.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
  
let video = document.querySelector("video");
video.playbackRate = 2.5
  
// taken from here https://stackoverflow.com/questions/59098489/javascript-to-select-video-quality-on-youtube#68814559
// and slightly modified 
// thanks @aljgom
async function setQuality(quality){   
    let settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
    settingsButton.click();
    let qualityMenu = document.getElementsByClassName("ytp-panel-menu")[0].lastChild;
    qualityMenu.click();

    let qualityOptions = [...document.querySelectorAll(".ytp-menuitem[role=menuitemradio]")];
    let selection;
    if (quality == 'Highest') selection = qualityOptions[0];
    else selection = qualityOptions.filter(el => el.innerText == quality)[0];

    if (!selection) {
        let qualityTexts = qualityOptions.map(el => el.innerText).join('\n');
        console.log('"' + quality + '" not found. Options are: \n\nHighest\n' + qualityTexts);
        settingsButton.click();                               // click menu button to close
        return;
    }

    if (selection.attributes['aria-checked'] === undefined) { // not checked
        selection.click();                                   
    } else settingsButton.click();                            // click menu button to close
};

setQuality('720p');  
})();
