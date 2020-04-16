// ==UserScript==
// @name         hhu-mediathek-download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  create download link for hhu mediathek videos
// @author       braunbearded
// @match        https://mediathek.hhu.de/watch/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/braunbearded/browser-scripts/master/hhu-mediathek-download/hhu-mediathek-download.js
// ==/UserScript==

(function() {
    'use strict';
    let jwplayer = document.querySelector("#mt_watch_player > script:nth-child(3)").text.replace(/[\n\r\t]|  /g, "");
    //let source = jwplayer.match(/sources: \[ *({ *file: *'[a-zA-Z0-9\/\._]*' *, *label: *'[a-zA-Z0-9 öÖäÄüÜ()]*' *(, *default: *'[a-z]*' *)?},? *)*\]/g);
    let urls = jwplayer.match(/\/movies\/[a-zA-Z0-9]+\/v_\d+\.(mp4|webm)/g);
    let download_box = document.createElement("div");
    download_box.className = "watch-video";
    let parent = document.querySelector("#mt_watch_video_container");
    let download_header = document.createElement("h3");
    download_header.innerHTML = "Downloads";
    let download_list = document.createElement("ul");
    download_box.appendChild(download_header);
    for (let i = 0; i < urls.length; i++) {
        let li = document.createElement("li");
        let url = document.createElement("a");
        let filename = urls[i].split("/");
        url.setAttribute("href", urls[i]);
        url.setAttribute("download", filename[2]+filename[3]);
        url.innerHTML = urls[i];

        li.appendChild(url);
        download_list.appendChild(li);
    }
    download_box.appendChild(download_list);
    parent.appendChild(download_box);
})();
