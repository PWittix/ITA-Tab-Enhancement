$.getJSON("https://spreadsheets.google.com/feeds/list/1Omn9eF5upJ48fO8yhcatGBGHCqtNwvEw-bdaSMplsiI/od6/public/values?alt=json", function(jsonObj){

	ingest(jsonObj);	
});

var tabs = $( "#tabs" ).tabs();

var ingestJson = [];

function ingest(jsonObj){
	for (var n = jsonObj.feed.entry.length -1; n >= 0; n--){
		var data = {};
		data.name = titleCase(jsonObj.feed.entry[n].gsx$incident.$t);
		data.text = jsonObj.feed.entry[n].gsx$update.$t;
		data.date = jsonObj.feed.entry[n].gsx$date.$t;
		data.time = jsonObj.feed.entry[n].gsx$timestamp.$t;
		data.type = jsonObj.feed.entry[n].gsx$typeofevent.$t;
		ingestJson.push(data);
	}
	var data = sort(ingestJson);
	//call compare function passing sorted ingestJson as argument
	compare(data);
}

function sort(jsonObj){
	var updateField = document.createElement('article');

	var groupedData = [];
	
	groupedData = _.sortBy(jsonObj, 'name');
	
	return groupedData;
}

var counter = 0;
var updateField = document.createElement('article');

function compare(data){

	
	var updateText = null;
	var updateDate = null;
	var updateTime = null;
	var previousName = null;
	
	//populate tabs
	for (var i=0; i<ingestJson.length; i++){
		var updateName = document.createElement('p');
			
		if(data[i].name === previousName){
			updateText = data[i].text;
			updateDate = data[i].date;
			updateTime = data[i].time;
			updateName.textContent = updateDate + " " + updateTime + " " + updateText;
			updateField.appendChild(updateName);
			previousName = data[i].name;
			//add to the current tab
			


		}
		else if (i === 0){
			updateField.textContent = "";
			updateText = data[i].text;
			updateDate = data[i].date;
			updateTime = data[i].time;
			updateName.textContent = updateDate + " " + updateTime + " " + updateText;
			updateField.appendChild(updateName);
			previousName = data[i].name;
			counter++;
			//create new tab
			addTab(data[i].name);
		}
		else{
			//moving to new, push out old contents
			pushUpdate(updateField);
			updateField.textContent = "";
			updateText = data[i].text;
			updateDate = data[i].date;
			updateTime = data[i].time;
			updateName.textContent = updateDate + " " + updateTime + " " + updateText;
			updateField.appendChild(updateName);
			previousName = data[i].name;
			counter++;
			//create new tab
			addTab(data[i].name);


		}
		if(i === ingestJson.length-1){
			//last output
			pushUpdate(updateField);
		}
	}

}



//working
function pushUpdate(update){
	$("<div id='tab-" + counter + "'><p>" + update.innerHTML + "</p></div>").appendTo(tabs);
	tabs.tabs("refresh");
}

//working
function addTab(title){
	var ul = tabs.find("ul");
	$("<li><a href='#tab-" + counter + "'>" + title + "</a></li>").appendTo(ul);
	tabs.tabs("refresh");
}



var docDiv = document.getElementById('tabs');
var previous = null;
var current = null;


//needs work
setInterval(function() {
$.getJSON("https://spreadsheets.google.com/feeds/list/1Omn9eF5upJ48fO8yhcatGBGHCqtNwvEw-bdaSMplsiI/od6/public/values?alt=json", function(json) {
current = JSON.stringify(json);            
if (previous && current && previous !== current) {
	//reset div
	docDiv.innerHTML = "<ul></ul>";
	//get user's current tab
	var currentTab = tabs.tabs('option', 'active');
	tabs.tabs('destroy');
	tabs.tabs();
	ingestJson = [];
	ingest(json);
	console.log(currentTab);
	tabs.tabs("refresh").tabs("option", "active", currentTab);
	//open the tab with new data
 }
  previous = current;
        });                       
    }, 10000);      
	


function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}