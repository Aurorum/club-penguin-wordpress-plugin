<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="items.json"></script>
</head>
<body>
<button onclick="dog()">test</button>
<p>Image to use:</p>
<p id="output">test</p> 
<div class="images">

<img id="puffles-1-item-image" width="220" height="277" src="./assets/2.png">
<img id="puffles-2-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-3-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-4-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-5-item-image" onerror="dog()" width="220" height="277" src="./assets/empty.png">
<img id="puffles-6-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-7-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-8-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-9-item-image" width="220" height="277" src="./assets/empty.png">
<img id="puffles-10-item-image" width="220" height="277" src="./assets/empty.png">
</div>
<p>Canvas:</p>
<div>
 <canvas id="puffles-canvas" width="600" height="600">
Your browser does not support the HTML5 canvas tag.
</canvas>
<div>
<select id="puffles-1-item" onchange="pufflesUpdateItem(1)" size="8">
  </select>
  <select id="puffles-2-item" onchange="pufflesUpdateItem(2)" size="8">
  </select>
    <select id="puffles-3-item" onchange="pufflesUpdateItem(3)" size="8">
  </select>
  <select id="puffles-4-item" onchange="pufflesUpdateItem(4)" size="8">
  </select>
  <select id="puffles-5-item" onchange="pufflesUpdateItem(5)" size="8">
  </select>
  <select id="puffles-6-item" onchange="pufflesUpdateItem(6)" size="8">
  </select>
  <select id="puffles-7-item" onchange="pufflesUpdateItem(7)" size="8">
  </select>
   <select id="puffles-8-item" onchange="pufflesUpdateItem(8)" size="8">
  </select>
  <select id="puffles-9-item" onchange="pufflesUpdateItem(9)" size="8">
  </select>
  </div>
  </div>

<script>
var allPufflesBackItems = [];

window.onload = function() {
    buildCanvas();
    pufflesBuildAllOptions();
    var pufflesBackItems = pufflesFindBackItems();
    var i;
    
    for (i = 0; i < pufflesBackItems.length; i++) {
    	allPufflesBackItems.push(pufflesFindBackItems()[i].paper_item_id);
    }
}

function buildCanvas() {
var canvas = document.getElementById("puffles-canvas");
    var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// No loop here because layers must follow this specific order.

     ctx.drawImage(document.getElementById("puffles-9-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-1-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-7-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-5-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-4-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-10-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-3-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-2-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-6-item-image"), 10, 10);
     ctx.drawImage(document.getElementById("puffles-8-item-image"), 10, 10);
  
}

function getCountryByCode(type) {
    return data.filter(
        function(data) {
            return data.type == type && data.is_bait !== '1' && data.label.length
        }
    );
}

function pufflesFindBackItems() {
    return data.filter(
        function(data) {
            return data.has_back === '1'
        }
    );
}

function pufflesBuildAllOptions() {
    var i;
    for (i = 0; i < 10; i++) {
        pufflesBuildOptions(i);
    }
}


function pufflesBuildOptions(id) {
    var found = getCountryByCode(id);
    var i;
    for (i = 0; i < found.length; i++) {
        var pufflesSelectId = document.getElementById("puffles-" + id + "-item");
        var option = document.createElement("option");
        var item = found[i].label;
        option.text = item;
        pufflesSelectId.add(option);

        [].slice.call(pufflesSelectId.options)
            .map(function(a) {
                if (this[a.value]) {
                    pufflesSelectId.removeChild(a);
                } else {
                    this[a.value] = 1;
                }
            }, {});
    }
}

function getItemById(label, itemTypeId) {
    return data.filter(
        function(data) {
            return data.label == label && data.type == itemTypeId 
        }
    );
}


function pufflesUpdateItem(itemTypeId) {
    let selectId;

    var sel = document.getElementById("puffles-" + itemTypeId + "-item");
    var found = getItemById(sel.options[sel.selectedIndex].text, itemTypeId);
    document.getElementById("puffles-" + itemTypeId + "-item-image").src = './assets/' + found[0].paper_item_id + '.png';
    
    if ( allPufflesBackItems.includes(found[0].paper_item_id) ) {
    document.getElementById("puffles-10-item-image").src = './assets/' + found[0].paper_item_id + '_back.png';
    } else {
    document.getElementById("puffles-10-item-image").src = './assets/empty.png';
    }

    console.log('./assets/' + found[0].paper_item_id + '.png');
 console.log(document.getElementById("puffles-" + itemTypeId + "-item-image").src);
 setTimeout(buildCanvas, 100);
}
</script>

</body>
</html>