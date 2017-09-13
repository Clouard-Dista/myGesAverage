'use strict';
const settings = {
  saveMark:true,
  evoAllNotes:true,
  evoGeneralAverage:true,
  allNotes:true,
  generalAverage:true,
  saveNotes:{}
};

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync') {
    for (const key in changes) {
      const storageChange = changes[key];
      if (settings[key] !== undefined) {
        settings[key] = storageChange.newValue;
      }
    }
  }
});

chrome.storage.sync.get({
  clickIfNoAnswer: false,
  notifyOnGoldStar: false,
  highLightOnly:false,
  forceErrors:false,
  speed: 'normal',
  maxRandomized: 10254,
  minRandomized: 4620,
}, function (items) {
  for (const key in items) {
    settings[key] = items[key];
  }
});
