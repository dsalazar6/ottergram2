var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";

var BUTTON_NEXT_SELECTOR = "[next-button-role='trigger']";
var BUTTON_PREV_SELECTOR = "[prev-button-role='trigger']";
var currentImage = 0;
var NUM_IMAGES = 5;
var next = document.querySelector(BUTTON_NEXT_SELECTOR);
var previous = document.querySelector(BUTTON_PREV_SELECTOR);

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function addPNHandlers(prev, next) {
  "use strict";
  var thumbnails = getThumbnailsArray();
  prev.addEventListener("click", function() {
    currentImage--;
    if (currentImage < 0)
      currentImage += NUM_IMAGES;
    setDetailsFromThumb(thumbnails[currentImage]);
  });
  next.addEventListener("click", function() {
    currentImage++;
    if (currentImage >= NUM_IMAGES)
      currentImage %= NUM_IMAGES;
    setDetailsFromThumb(thumbnails[currentImage]);
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();
addPNHandlers(previous, next);
