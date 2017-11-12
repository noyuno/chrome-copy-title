"use strict";

var title="";
var url="";

document.addEventListener('DOMContentLoaded', function () {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        chrome.storage.sync.get(config.defaultvalue, function (options) {
            title=tab.title;
            url=tab.title;
            for (var k in options.formats) {
                (function () {
                    var key = k;
                    var item = document.createElement("div");
                    var b = document.createElement("button");
                    b.setAttribute("class", "item");
                    b.textContent = key;
                    b.addEventListener("click", function () { copy(key) }, true);
                    item.appendChild(b);
                    document.getElementById('target').appendChild(item);
                }());
            }
        });
    });
});

var copy = function (k) {
    chrome.storage.sync.get({
        formats:{
            "title":"${title}"
        }
    }, function (options) {
        var obj = document.getElementById('text');
        obj.style.display="inline";
        var now = new Date()
        var year = now.getFullYear();
        var month = ("0"+(now.getMonth()+1)).slice(-2);
        var date = ("0"+now.getDate()).slice(-2);
        obj.value = options.formats[k]
            .replace(/\\n/g, '\r\n')
            .replace(/\\t/g, '\t')
            .replace(/\$\{title\}/g, title)
            .replace(/\$\{url\}/g, url)
            .replace(/\$\{year\}/g, year)
            .replace(/\$\{date\}/g, + year + "/" + month + "/" + date) ;
        obj.select();
        document.execCommand('copy');
        window.close();
    });
};

