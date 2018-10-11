//Below is the function to read value of a given cookie name.
chrome.runtime.sendMessage({todo:"showPageAction"});

var resp;
// Below is function to send message to background.js script. However I am not using any messages from background.js as of now, but it might be usefull so it is safe to keep it
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});
//This function will listen to message from popup2.js, and in response to message, it will send values of cookies to popup2.js 
// chrome.runtime.onMessage.addListener(function(msg, sender, response){
// 	if ((msg.from === "content") && (msg.subject==="DOMInfo")) { // Check the sedner and subject of message from popup2.js, if they are "content" and "DOMInfo" respectively, send popup2.js values of cookies
// 		var domInfo = {
// 			dis1 : getCookie("Username"), //Read value of cookie Username
//  			//dis2 : getCookie("MoneyMade"),	//Read value of cookie MoneyMade
// 			//dis3 : getCookie("AvgDuration") //Read value of cookie AvgDuration
// 		};
// 		response (domInfo);
// 	}
// });

var diff;
// $.get('/crowdcur/plugin_api/send_answer',{task_uid:532669658,time_took:12.3})
//Send xmlHttp object to server
function send(task_uid,time_it_took) {
    $.ajax({
            async:false,
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrf);
                }
            },

            url:SERVER_URL+PLUGIN_URL+'send_answer',
            data: {task_uid:task_uid,time_took:time_it_took},
            dataType: 'json',
            type:'GET',
            success: function(data) {
                console.log(data);
            },
        }
    );

}


//Below is the part of the code that will redirect the user to set his preferences after every 5 clicks on submit button. Sessions are used.
console.log("This happens in Content Script.");
// ; // Listen to event "Page Load", below is the code to capture activities on submit button of the task page.

var timeStart = new Date(); // On page load, set the timer
$("form[action*=work]").on('submit', function(event){
    var clickcounts;
    var timeEnd = new Date(); // On button click stop the timer
    diff = (timeEnd - timeStart); // Get difference of both recorded time
    diff = (diff / 1000); // Convert into seconds
    var task_uid = $("#plugin_task_uid").val();
    console.log("This happened in submit function");
    chrome.storage.sync.get("clickcount",function(item){
        console.log("Time it took: "+diff);

        if (!chrome.runtime.error){
            if(!$.isEmptyObject(item)) {
                console.log("This happened in local storage");
                clickcounts = Number(item.clickcount+1);
                chrome.storage.sync.set({"clickcount":clickcounts})
            }
            else{
                console.log("This happened in local storage Else");
                console.log("setting initial click count");
                clickcounts = 1;
                chrome.storage.sync.set({"clickcount":clickcounts})
            }
        }
        console.log("Number of clicks  "+clickcounts);
        if (clickcounts % 5 == 0) { //If 5 tasks are submitted, redirect user to below link. Here, temporarily I have used google.com, because it cant open a local file
            window.open(SERVER_URL+"crowdcur/get_feedback/", "_blank");
        }
        send(task_uid,diff);
        return True;
    });

});

