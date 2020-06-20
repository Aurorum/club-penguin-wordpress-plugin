var allPufflesBackItems = [];

window.onload = function () {
  if (
    document.getElementsByClassName("puffles-playercard-generator").length > 1
  ) {
    pufflesBlockMultipleGeneratorsOnSamePage();
  }
  pufflesConstructPlayercardCanvas();
  pufflesBuildAllOptions();
  var pufflesBackItems = pufflesFindBackItems();
  var i;

  for (i = 0; i < pufflesBackItems.length; i++) {
    allPufflesBackItems.push(pufflesFindBackItems()[i].paper_item_id);
  }
  pufflesRememberItems();
  document.getElementById("puffles-playercard").classList.remove("is-loading");
};

function pufflesConstructPlayercardCanvas() {
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

  document.getElementById(
    "puffles-playercard-download"
  ).href = canvas.toDataURL("image/png");
}

function pufflesQueryPlayercardData(type) {
  return pufflesItemsData.filter(function (pufflesItemsData) {
    return (
      pufflesItemsData.type == type &&
      pufflesItemsData.is_bait !== "1" &&
      pufflesItemsData.label.length
    );
  });
}

function pufflesFindBackItems() {
  return pufflesItemsData.filter(function (pufflesItemsData) {
    return pufflesItemsData.has_back === "1";
  });
}

function pufflesBuildAllOptions() {
  var i;
  for (i = 0; i < 10; i++) {
    pufflesBuildOptions(i);
  }
  document.getElementById("puffles-1-item").value = "Aqua";
}

function pufflesBuildOptions(id) {
  var found = pufflesQueryPlayercardData(id);
  var i;
  for (i = 0; i < found.length; i++) {
    var pufflesSelectId = document.getElementById("puffles-" + id + "-item");
    var option = document.createElement("option");
    var item = found[i].label;
    option.text = item;
    pufflesSelectId.add(option);

    [].slice.call(pufflesSelectId.options).map(function (a) {
      if (this[a.value]) {
        pufflesSelectId.removeChild(a);
      } else {
        this[a.value] = 1;
      }
    }, {});
  }
}

// TODO: Rewrite this - the amount of nested logic and repeated code gives me a headache.
function pufflesSearchItem(addItem) {
  var enteredInput = document.getElementById("puffles-item-search").value;

  if (enteredInput === "") {
    document.getElementById("puffles-item-search-result").innerHTML =
      "Enter an item's name or ID above first.";
  } else {
    if (/^\d+$/.test(enteredInput)) {
      var found = pufflesSearchById(enteredInput);
      if (found.length) {
        var category = pufflesGetCategoryByType(found[0].type);
        document.getElementById("puffles-item-search-result").innerHTML =
          "Found item <strong>" +
          found[0].label +
          "</strong> in the " +
          "<strong>" +
          category +
          "</strong> category.";

        if (addItem) {
          document.getElementById("puffles-" + found[0].type + "-item").value =
            found[0].label;
          pufflesUpdateItem(found[0].type);
        }
      } else {
        document.getElementById("puffles-item-search-result").innerHTML =
          "No item found";
      }
    } else {
      var found = pufflesSearchByLabel(enteredInput);
      if (found.length) {
        var category = pufflesGetCategoryByType(found[0].type);
        document.getElementById("puffles-item-search-result").innerHTML =
          "Found item <strong>" +
          found[0].label +
          "</strong> in the " +
          "<strong>" +
          category +
          "</strong> category.";

        if (addItem) {
          document.getElementById("puffles-" + found[0].type + "-item").value =
            found[0].label;
          pufflesUpdateItem(found[0].type);
        }
      } else {
        document.getElementById("puffles-item-search-result").innerHTML =
          "No item found";
      }
    }
  }
}

function pufflesGenerateRandomPlayercard() {
  var i;
  for (i = 1; i < 10; i++) {
    var found = pufflesQueryPlayercardData(i);
    var randomNumber = Math.floor(Math.random() * found.length) + 1;
    document.getElementById(
      "puffles-" + found[randomNumber].type + "-item"
    ).value = found[randomNumber].label;
    pufflesUpdateItem(found[0].type);
  }
}

function pufflesGetCategoryByType(itemTypeId) {
  let category;
  switch (itemTypeId) {
    case 1:
      category = "Colours";
      break;
    case 2:
      category = "Head Items";
      break;
    case 3:
      category = "Face Items";
      break;
    case 4:
      category = "Neck Items";
      break;
    case 5:
      category = "Body Items";
      break;
    case 6:
      category = "Hand Items";
      break;
    case 7:
      category = "Feet Items";
      break;
    case 8:
      category = "Pins";
      break;
    case 9:
      category = "Backgrounds";
      break;
    default:
      category = "N/A";
      break;
  }

  return category;
}

function pufflesRememberItems() {
  if (typeof Storage !== "undefined") {
    var i;
    for (i = 1; i < 10; i++) {
      var itemId = localStorage.getItem("puffles-playercard-generator-" + i);
      if (itemId) {
        document.getElementById(
          "puffles-" + i + "-item"
        ).value = pufflesSearchById(itemId)[0].label;
        pufflesUpdateItem(i);
      }
    }
  }
}

function pufflesClearPlayercard() {
  var i;
  for (i = 2; i < 10; i++) {
    document.getElementById("puffles-" + i + "-item").selectedIndex = -1;
    if (typeof Storage !== "undefined") {
      localStorage.removeItem("puffles-playercard-generator-" + i);
    }
    document.getElementById("puffles-" + i + "-item-image").src =
      pufflesPlayercardItems.directory + "empty.png";
  }

  setTimeout(pufflesConstructPlayercardCanvas, 200);
  setTimeout(pufflesConstructPlayercardCanvas, 300);
  setTimeout(pufflesConstructPlayercardCanvas, 500);
  setTimeout(pufflesConstructPlayercardCanvas, 1000);
}

function pufflesBlockMultipleGeneratorsOnSamePage() {
  var i;
  for (
    i = 1;
    i < document.getElementsByClassName("puffles-playercard-generator").length;
    i++
  ) {
    document.getElementsByClassName("puffles-playercard-generator")[
      i
    ].innerHTML =
      "<p>Please click <a onclick='pufflesScrollToPlayercard()'>here</a> to use the playercard generator.</p>";
    document
      .getElementsByClassName("puffles-playercard-generator")
      [i].classList.remove("is-loading");
  }
}

function pufflesScrollToPlayercard() {
  document.getElementById("puffles-playercard").scrollIntoView();
}

function pufflesDoesFileExist(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status !== 404;
}

function pufflesGetItemById(label, itemTypeId) {
  return pufflesItemsData.filter(function (pufflesItemsData) {
    return (
      pufflesItemsData.label == label && pufflesItemsData.type == itemTypeId
    );
  });
}

function pufflesSearchById(itemId) {
  return pufflesItemsData.filter(function (pufflesItemsData) {
    return (
      pufflesItemsData.paper_item_id == itemId &&
      pufflesItemsData.is_bait !== "1" &&
      pufflesItemsData.label.length
    );
  });
}

function pufflesSearchByLabel(label) {
  return pufflesItemsData.filter(function (pufflesItemsData) {
    return (
      pufflesItemsData.label == label &&
      pufflesItemsData.is_bait !== "1" &&
      pufflesItemsData.label.length
    );
  });
}

function pufflesUpdateItem(itemTypeId) {
  let selectId;

  var sel = document.getElementById("puffles-" + itemTypeId + "-item");
  var found = pufflesGetItemById(
    sel.options[sel.selectedIndex].text,
    itemTypeId
  );
  if (
    pufflesDoesFileExist(
      pufflesPlayercardItems.directory + found[0].paper_item_id + ".png"
    )
  ) {
    document.getElementById("puffles-" + itemTypeId + "-item-image").src =
      pufflesPlayercardItems.directory + found[0].paper_item_id + ".png";
    document.getElementById("puffles-item-search-error").style.display = "none";

    if (typeof Storage !== "undefined") {
      localStorage.setItem(
        "puffles-playercard-generator-" + itemTypeId,
        found[0].paper_item_id
      );
    }

    if (allPufflesBackItems.includes(found[0].paper_item_id)) {
      document.getElementById("puffles-10-item-image").src =
        pufflesPlayercardItems.directory + found[0].paper_item_id + "_back.png";
    } else {
      document.getElementById("puffles-10-item-image").src =
        pufflesPlayercardItems.directory + "empty.png";
    }
  } else {
    document.getElementById("puffles-10-item-image").src =
      pufflesPlayercardItems.directory + "empty.png";
    document.getElementById("puffles-item-search-error").innerHTML =
      "Sorry! No files are stored for <strong>" + found[0].label + "</strong>.";
    document.getElementById("puffles-item-search-error").style.display =
      "block";
  }

  setInterval(pufflesConstructPlayercardCanvas, 300);
}
