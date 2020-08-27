function init() {
  var buttons = document.getElementsByClassName("more-items-link");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      onClick(event);
    });
    buttons[i].addEventListener("keyup", function (event) {
      onMoreItemsKeyPress(event);
    });
  }

  var buttons = document.querySelectorAll(".dropdown-items-item");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      onDropdownItemsClick(event);
    });
    buttons[i].addEventListener("keyup", function (event) {
      onDropdownItemsKeyPress(event);
    });
  }

  var buttons = document.getElementsByClassName("main-item");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("keyup", function (event) {
      onMainItemKeyPress(event);
    });
  }

  var buttons = document.querySelectorAll(".main-item, .more-items-link, .dropdown-items-item");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("blur", function (event) {
      onFocusOut(event);
    });
  }
}

function toggle(event) {
  var target = (event.target.classList.contains('dropbutton')) ?
    event.target.firstElementChild.children[1] :
    event.target;

  var isOpen = (target.classList.contains('closable'));

  if (!isOpen) {
    target.classList.remove('openable');
    target.classList.add('closable');
  }
  else {
    target.classList.remove('closable');
    target.classList.add('openable');
  }

}

function closeEvery(event) {
  var buttons = document.getElementsByClassName("more-items-link");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('closable')) {
      buttons[i].click();
    }
  }

}

function onClick(event) {
  event.preventDefault();

  toggle(event);

  var dropdowns = getSiblings(event.target.parentNode);
  var dropdown = dropdowns[0];

  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
  }
  else {
    dropdown.classList.add('hidden');
  }

}

function onDropdownItemsClick(event) {
  closeEvery(event);
}

function onFocusOut(event) {
  if (
    typeof (event.relatedTarget) !== "undefined"
    && event.relatedTarget !== null
    &&  event.relatedTarget.classList.contains("dropdown-items-item")
  ) {
      return;
  }

  closeEvery(event);
}

function getSiblings(elem) {
  // Setup siblings array and get the first sibling
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }

  return siblings;
};

function onDropdownItemsKeyPress(event) {
  switch (event.key) {
    case "ArrowDown":
      var parent = event.target.parentElement.nextElementSibling;

      if (parent !== null && parent.childElementCount >= 1) {
        parent.children[0].focus();
      }
      break;

    case "ArrowUp":
      var parent = event.target.parentElement.previousElementSibling;

      if (parent === null) {
        parent = event.target.parentElement.parentElement.parentElement.previousElementSibling;
      }

      if (parent !== null && parent.childElementCount >= 1) {
        parent.children[0].focus();
      }
      break;
  }

}

function onMoreItemsKeyPress(event) {
  switch (event.key) {
    case "ArrowDown":
      var parent = event.target.parentElement.nextElementSibling;

      if (parent !== null && parent.childElementCount >= 1) {
        parent.children[0].children[0].children[0].focus();
      }
      break;

    case "ArrowLeft":
      var previousElement = event.target.previousElementSibling;

      if (previousElement !== null) {
        previousElement.focus();
      }
      break;
  }
}

function onMainItemKeyPress(event) {
  switch (event.key) {
    case "ArrowRight":
      var nextElement = event.target.nextElementSibling;

      if (nextElement !== null) {
        nextElement.focus();
      }
      break;
  }
}

init();