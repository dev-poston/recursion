// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var nodes = [];
  var innerfunc = function (tag) {
    if (_(tag.classList).contains(className)) {
      nodes.push(tag);
    }
    _(tag.childNodes).forEach(function(child) {
      innerfunc(child);
    });
  };
  innerfunc(document.body);
  return nodes;
};