//Set HTML objects according to Cookies sent by content.js
// function setDOMInfo(info){
// 	document.getElementById('dis1').innerHTML = info.dis1;
// }
//
// //This function will send request "send me values of cookies" to content.js
// window.addEventListener('DOMContentLoaded',function(){
// 	chrome.tabs.query({
// 		active:true,
// 		currentWindow: true
// 	}, function(tabs){
// 		chrome.tabs.sendMessage(
// 			tabs[0].id, //Get the current tab, i.e., the tab user is working on
// 			{from: 'content', subject:'DOMInfo'}, //set the "sender" and "subject" of message
// 			setDOMInfo);
// 	});
// });

//This function does nothing as of now, but it might be useful when we need to communicate with background.js
$(function(){ 
	chrome.tabs.query({active: true, currentWindow : true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,{todo:"haha"});
	})
});

//Below is function to open dashboard, if button "Open Dashboard" is CLICKED on popup2.html
document.addEventListener('DOMContentLoaded', function(){
	var y = document.getElementById("clickme");
	y.addEventListener("click",openIndex);
    var y2 = document.getElementById("clickme2");
    y2.addEventListener("click",openStats);
});
//opens below link on click on button "Open Dashboard"
function openIndex(){
	chrome.tabs.create({active:true, url:window.SERVER_URL+window.DASHBOARD_URL})
}
function openStats(){
    chrome.tabs.create({active:true, url:window.SERVER_URL+window.STAT_URL})
}

var set_info = function(){
	$.ajax({
		url : window.SERVER_URL + window.PLUGIN_URL + 'get_info',
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrf);
            }
        },
        dataType: 'json',
        type:'GET',
        success: function(data,status) {
			$("#crowdcur_username").text(data.username);
			$("#dis1").text(data.money_made);
			$("#dis2").text(data.avg_duration);
			$("#dis3").text(data.tasks_seen+'/'+data.tasks_comp);
        },
		error:function (data,status) {
			console.log(data);
            console.log(status);
			
        },
		complete:function (data,status) {
			setTimeout(set_info,5000);
        }

    });
};

$( document ).ready(function() {
    set_info();
});

