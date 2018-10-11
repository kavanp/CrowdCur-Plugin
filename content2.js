
chrome.runtime.sendMessage({todo:"showPageAction"});


var tasks = $(".plugin_task_uid");
var uids= tasks.map(function(){return this.value}).get().join();

var csrf = getCookie("csrftoken");

$.ajax({
    beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrf);
            }
        },

    url:SERVER_URL+PLUGIN_URL+'set_tasks',
    data: {
      tasks : uids
    },
    dataType: 'json',
    type:'POST',
    success: function(data) {
        console.log(data);
    },
    }
);
