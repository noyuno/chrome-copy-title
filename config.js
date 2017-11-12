'use strict';

var config = (function () {
    var defaultvalue = {"formats": {
        "title":"${title}", 
        "Markdown": "[${title}](${url})\n", 
        "thebibliography": '\\bibitem{} "${title}". \\url{${url}}. accessed ${date}.\n',
        "BibTeX": '@misc{ \\n  author = "",\\n  title = "${title}",\\n  year = "${year}",\\n  url = "\\url{${url}}",\\n  note = "[Online; accessed ${date}"\\n}\n'
    }};
    return {
        defaultvalue: defaultvalue
    };
}());

