// ==UserScript==
// @name         Youtube playlist to clipboard
// @namespace    http://tampermonkey.net/
// @version      0.1a
// @description  Copys the video urls on the current page to clipboard
// @author       braunbearded
// @match        https://www.youtube.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/braunbearded/browser-scripts/master/youtube-playlist-clipboard.js
// ==/UserScript==

(function() {
    'use strict';
    let video_selector = ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer";

    let playlist_selector = "ytd-playlist-sidebar-primary-info-renderer.style-scope";

    let playlist = document.querySelector(playlist_selector);

    let button = document.createElement("button");
    button.innerHTML = "Copy videos to clipboard";
    button.onclick = function(){
        let elements = Array.from(document.querySelectorAll(video_selector));
        let videos = elements.map(e => e.getAttribute("href"))
        .map(e => "https://youtube.com" + e.split("&list=WL&index=")[0])
        .reduce((a,e) => e + "\n" + a);
        navigator.clipboard.writeText(videos);
    };
    playlist.appendChild(button);
})();
