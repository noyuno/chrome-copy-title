"use strict";

var load = function () {
    chrome.storage.sync.get("formats", function (options) {
        document.getElementById("target").innerHTML="";
        for (var k in options.formats) {
            append(k, options.formats[k]);
        }
    });
};

var append = function (k, v) {
    var id = "target-" + String(Math.floor(Math.random() * 10000000));
    var item = document.createElement("div");
    item.setAttribute("id", id);
    item.setAttribute("class", "item");

    var hr = document.createElement("button");
    hr.setAttribute("class", "remove");
    hr.textContent="x";
    hr.addEventListener("click", function () {
        document.getElementById(id).remove();
        });
    item.appendChild(hr);

    var area = document.createElement("span");
    area.setAttribute("class", "inputarea");

    var hk = document.createElement("input");
    hk.setAttribute("id", id + "-name");
    hk.setAttribute("class", "name");
    hk.setAttribute("type", "text");
    hk.value=k;
    area.appendChild(hk);

    var hvp = document.createElement("span");
    hvp.setAttribute("class", "textparent");
    var hv = document.createElement("input");
    hv.setAttribute("id", id + "-text");
    hv.setAttribute("class", "text");
    hv.setAttribute("type", "text");
    hv.value=v;
    hvp.appendChild(hv);
    area.appendChild(hvp);

    item.appendChild(area);

    document.getElementById('target').appendChild(item);

};

var message = function (m) {
    document.getElementById("message").textContent = m;
};
var save = function () {
    var b = { "formats": { } };
    var a = Array.from(document.getElementById("target").children);
    a.forEach(function (d) {
        var n = document.getElementById(d.id + "-name").value;
        var t = document.getElementById(d.id + "-text").value;
        b.formats[n] = t
    });
    chrome.storage.sync.set(b);
    message("saved");
}
var reset = function () {
    chrome.storage.sync.set(config.defaultvalue);
    load();
    message("reset");
}

window.onload = load;
document.getElementById("append").addEventListener("click", function () { append("name", "text"); });
document.getElementById("save").addEventListener("click", save);
document.getElementById("reset").addEventListener("click", reset);


