// See `https://github.com/whatwg/html/issues/2271` for underscore attributes
// const io = new IntersectionObserver((entries, obs) => {
//     for (const e of entries) {
//       if (!e.isIntersecting) continue;
//       const img = e.target;
//       img.src = img.getAttribute("_lazy");
//       obs.unobserve(img);
//     }
//   }, { rootMargin: "0px", threshold: 0.01 });

//   document.querySelectorAll("img[_lazy]").forEach(img => io.observe(img));
"use strict";

/* Global */
var L = Lapys;

/* Main */
void function main() {
  var Portals = {__proto__: null};
  var portals = [];

  /* Class > Portal */
  function Portal(element, observed) {
    this.element  = element;
    this.observed = observed
  }
    Portal.prototype = {
      element : null,
      observed: null,

      __proto__: null
    };

  /* Function > ... */
  function getLazy(document) {}
  function getPortals(document) {}

  function iterateLazy(document) { for (const el of document.querySelectorAll("[portal]").values()) { /* ... */ } }
  function iteratePortals(document) {}

  /* ... */
  // watch for old/ new portals and update list
  // every low-priority frame, check which portal teleports
}();

function findPortalElements(root = document) {
  const xpath = "//*[_portal]";
  const result = document.evaluate(
    xpath,
    root,          // context node
    null,          // namespace resolver (not needed for HTML)
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  const nodes = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    nodes.push(result.snapshotItem(i));
  }
  return nodes;
}

function findPortalElementsIter(root = document) {
  const xpath = "//*[_portal]";
  const result = document.evaluate(
    xpath,
    root,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );

  const nodes = [];
  for (let n = result.iterateNext(); n; n = result.iterateNext()) {
    nodes.push(n);
  }
  return nodes;
}
