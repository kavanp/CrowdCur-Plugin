
/**
 * Exports the given object into the global context.
 */
var exportGlobal = function(name, object) {
    if (typeof(GLOBAL) !== "undefined")  {
        // Node.js
        GLOBAL[name] = object;
    }
    else if (typeof(window) !== "undefined") {
        // JS with GUI (usually browser)
        window[name] = object;
    }
    else {
        throw new Error("Unkown run-time environment. Currently only browsers and Node.js are supported.");
    }
};

/**
 * Exports the Export function and a set of GLOBAL variables for the server address.
 */
exportGlobal("exportGlobal",exportGlobal);
// exportGlobal("SERVER_URL","http://127.0.0.1:8000/");
exportGlobal("SERVER_URL","http://crowdcur.com/");
exportGlobal("PLUGIN_URL","crowdcur/plugin_api/");
exportGlobal("DASHBOARD_URL","crowdcur/dashboard");
exportGlobal("STAT_URL","crowdcur/stats");

exportGlobal("clicks",5);

var getCookie = function (name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


var csrfSafeMethod = function (method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

var csrf = getCookie("csrftoken");

