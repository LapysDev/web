var BACKGROUND_REEL_STARRY       = 0x0;
var BACKGROUND_REELS             = [BACKGROUND_REEL_STARRY];
var BACKGROUND_ELEMENT           = getElementById("background");
var BACKGROUND_CONTEXT           = typeof BACKGROUND_ELEMENT.getContext === "function" ? BACKGROUND_ELEMENT.getContext("2d", {"alpha": true, "colorSpace": "srgb", "desynchronized": true, "willReadFrequently": false}) : null;
var BACKGROUND_STYLE_DECLARATION = getCSSStyleDeclaration(BACKGROUND_ELEMENT);
var TAGLINE_ELEMENT              = getElementById("tagline");

// ...
if (null !== BACKGROUND_CONTEXT) {
  function resolution(_) {
    var backgroundElementBounds = getElementBounds(BACKGROUND_ELEMENT);

    BACKGROUND_ELEMENT.height                = backgroundElementBounds.height;
    BACKGROUND_ELEMENT.width                 = backgroundElementBounds.width;
    BACKGROUND_CONTEXT.imageSmoothingEnabled = false;
    BACKGROUND_CONTEXT.imageSmoothingQuality = "low";
    BACKGROUND_CONTEXT.lang                  = "en-US";
    BACKGROUND_CONTEXT.lineJoin              = "round";
    BACKGROUND_CONTEXT.miterLimit            = 1;
    BACKGROUND_CONTEXT.textRendering         = "optimizeSpeed"
  }

  resolution();
  void poll(window, "load",   resolution, {"capture": true, "once": true,  "passive": true});
  void poll(window, "resize", resolution, {"capture": true, "once": false, "passive": true});

  if (typeof ResizeObserver === "function")
  (new ResizeObserver(resolution)).observe(document.documentElement);

  switch (BACKGROUND_REELS[Math.floor(BACKGROUND_REELS.length * Math.random())]) {
    case BACKGROUND_REEL_STARRY: {
      var COMET_RADIUS                = 3;
      var COMET_SPEED                 = 30.0;
      var COMET_LENGTH_MAXIMUM        = 200;
      var STAR_COUNT_MAXIMUM          = 1200;
      var STAR_COUNT_MINIMUM          = 200;
      var STAR_PULSE_MINIMUM          = 0.10; // ->> % percent
      var STAR_PULSE_SPEED            = 0.01; // ->> % percent
      var STAR_RADIUS_MAXIMUM         = 1.5;
      var STAR_RADIUS_MINIMUM         = 0.5;
      var STAR_RIPPLE_CLUSTER_MAXIMUM = 2;
      var STAR_RIPPLE_FORCE           = 30.0;
      var STAR_SPEED_MAXIMUM          = 0.25;
      var STAR_SPEED_MINIMUM          = 0.10;

      var comets                 = [];
      var reelTimeDelta          = 0.0;
      var reelTimestamp          = timestamp();
      var starClusterIDIncrement = 0;
      var starRipple             = {x: 0.0, y: 0.0};
      var stars                  = [];

      /* ... */
      function createComets() {
        var position = {x: BACKGROUND_ELEMENT.width * Math.random(), y: BACKGROUND_ELEMENT.height * Math.random()};
        void comets.push({
          origin  : {x: position.x, y: position.y},
          position: {x: position.x, y: position.y}
        })
      }

      function createPlanetoids() {}

      function createStars() {
        var direction       = {x: Math.random(), y: Math.random()};
        var origin          = {x: BACKGROUND_ELEMENT.width * Math.random(), y: BACKGROUND_ELEMENT.height * Math.random()};
        var radiusIncrement = 25.0;
        var radiusMaximum   = Math.random() * (Math.min(BACKGROUND_ELEMENT.height, BACKGROUND_ELEMENT.width) / 2.0);

        // ...
        direction.x = direction.x > 0.5 ? +direction.x : -direction.x;
        direction.y = direction.y > 0.5 ? +direction.y : -direction.y;
        starClusterIDIncrement++;

        for (var radius = 15; radius < radiusMaximum; radius += radiusIncrement)
        for (var count = Math.ceil(MATH_PI * radius), index = count, offset = MATH_PI * Math.random(); index--; ) {
          if (STAR_COUNT_MAXIMUM <= stars.length || (STAR_COUNT_MINIMUM < stars.length && reelTimeDelta >= 60.0 * 1.5))
          return;

          if (Math.random() > 1.0 - (1.0 / radius)) {
            var scatter = Math.random();

            scatter = scatter > 0.69 ? (scatter / 0.31) * 0.25 : 0.00;
            void stars.push({
              cluster  : starClusterIDIncrement,
              direction: Math.random() > 0.8 ? {x: -direction.x + scatter, y: -direction.y + scatter} : {x: +direction.x + scatter, y: +direction.y + scatter},
              position : {x: origin.x + (radius * Math.cos((MATH_TAU * (offset + (index / count))))), y: origin.y + (radius * Math.sin((MATH_TAU * (offset + (index / count)))))},
              pulse    : 0.0,
              radius   : STAR_RADIUS_MINIMUM + ((STAR_RADIUS_MAXIMUM - STAR_RADIUS_MINIMUM) * Math.random()),
              speed    : {x: STAR_SPEED_MINIMUM + ((STAR_SPEED_MAXIMUM - STAR_SPEED_MINIMUM) * Math.random()), y: STAR_SPEED_MINIMUM + ((STAR_SPEED_MAXIMUM - STAR_SPEED_MINIMUM) * Math.random())}
            })
          }
        }
      }

      function rippleStars(position, force) {
        var clusters = [];

        if (false) // TODO (Lapys)
        for (var index = stars.length; index--; ) {
          var star          = stars[index];
          var starDistance  = {x: position.x - star.position.x, y: position.y - star.position.y};
          var starMagnitude = (starDistance.x * starDistance.x) + (starDistance.y * starDistance.y);

          // ...
          if (STAR_RIPPLE_CLUSTER_MAXIMUM > clusters.length)
            void clusters.push(star);

          else for (var subindex = clusters.length; subindex--; ) {
            var clusterStar          = clusters[subindex];
            var clusterStarDistance  = {x: position.x - clusterStar.position.x, y: position.y - clusterStar.position.y};
            var clusterStarMagnitude = (clusterStarDistance.x * clusterStarDistance.x) + (clusterStarDistance.y * clusterStarDistance.y);

            // ...
            if (clusterStarMagnitude > starMagnitude) {
              // for (var subindex = clusters.length; subindex--; )
              // if (clusters[subindex].chunk === star.chunk)

              break
            }
          }

          starMagnitude
          STAR_RIPPLE_FORCE
          // 2 chunks
          // (a-b).sqrMagnitude
        }
      }

      // ...
      createPlanetoids();

      void poll(BACKGROUND_ELEMENT.parentNode, "mousedown", function(event) { rippleStars({x: event.clientX, y: event.clientY}, 50.0) }, {"capture": true, "passive": true});
      void poll(BACKGROUND_ELEMENT.parentNode, "mousemove", function(event) { rippleStars({x: event.clientX, y: event.clientY}, 20.0) }, {"capture": true, "passive": true});

      void LOOP_PROCEDURES.push(function reel() {
        var cometLengthMaximum    = Math.max(BACKGROUND_ELEMENT.width * 0.35, COMET_LENGTH_MAXIMUM);
        var reelPreviousTimestamp = reelTimestamp;

        // ...
        // BACKGROUND_CONTEXT.filter = BACKGROUND_STYLE_DECLARATION.getPropertyValue("filter").replace(/\bhue-rotate\([-+\s]*/gi, "hue-rotate(-"); // ->> Oof! Thankfully this reel is achromatic/ monochrome
        reelTimestamp = timestamp();
        reelTimeDelta = reelTimestamp - reelPreviousTimestamp;

        BACKGROUND_CONTEXT.clearRect(0, 0, BACKGROUND_ELEMENT.width, BACKGROUND_ELEMENT.height);
        void waitEvery(createComets, 5.0e3);
        void waitEvery(createStars,  stars.length ? 10.0e3 : 0.0e3);

        for (var index = comets.length; index--; ) {
          var comet = comets[index];

          // ...
          if (comet.position.x <= 0.0 - cometLengthMaximum || BACKGROUND_ELEMENT.height <= comet.position.y - cometLengthMaximum) {
            comets[index] = comets[comets.length - 1];
            comets.length--
          }

          else {
            var cometSpeed     = {x: COMET_SPEED * 1.0,                 y: COMET_SPEED * 0.6};
            var cometLength    = {x: comet.origin.x - comet.position.x, y: comet.position.y - comet.origin.y};
            var cometFillColor = BACKGROUND_CONTEXT.createLinearGradient(comet.origin.x, comet.origin.y, comet.position.x, comet.position.y);
            var cometAngle     = Math.atan2(cometLength.y, -cometLength.x), cometTangentAngle = Math.asin(COMET_RADIUS / Math.sqrt((cometLength.x * cometLength.x) + (cometLength.y * cometLength.y)));

            // ...
            comet.position.x            -= cometSpeed.x;
            comet.position.y            += cometSpeed.y;
            BACKGROUND_CONTEXT.fillStyle = cometFillColor;

            if (cometLengthMaximum < cometLength.x || cometLengthMaximum < cometLength.y) {
              comet.origin.x -= cometSpeed.x;
              comet.origin.y += cometSpeed.y
            }

            cometFillColor.addColorStop(0.0, "rgba(255, 255, 255, 0.0)");
            cometFillColor.addColorStop(1.0, "rgba(255, 255, 255, 0.6)");

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (Math.floor(comet.origin  .x), Math.floor(comet.origin  .y));
            BACKGROUND_CONTEXT.arc      (Math.floor(comet.position.x), Math.floor(comet.position.y), COMET_RADIUS, cometAngle - MATH_ETA - cometTangentAngle, cometAngle + MATH_ETA + cometTangentAngle, false);
            BACKGROUND_CONTEXT.closePath();
            BACKGROUND_CONTEXT.fill     ();

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (comet.position.x, comet.position.y);
            BACKGROUND_CONTEXT.arc      (Math.floor(comet.position.x), Math.floor(comet.position.y), Math.ceil(COMET_RADIUS * 0.65), 0.0, MATH_TAU, false);
            BACKGROUND_CONTEXT.fill     ()
          }
        }

        for (var index = stars.length; index--; ) {
          var star = stars[index];

          // ...
          if ((BACKGROUND_ELEMENT.width <= star.position.x || star.position.x <= 0.0) || (BACKGROUND_ELEMENT.height <= star.position.y || star.position.y <= 0.0)) {
            stars[index] = stars[stars.length - 1];
            stars.length--
          }

          else {
            star.pulse                   = (star.pulse + (STAR_PULSE_SPEED * Math.random())) % 1.0;
            star.position.x             += star.direction.x * (star.speed.x * (((Math.abs(star.position.x - (BACKGROUND_ELEMENT.width  / 2.0)) / BACKGROUND_ELEMENT.width)  * 20.0) + 1.0));
            star.position.y             += star.direction.y * (star.speed.y * (((Math.abs(star.position.y - (BACKGROUND_ELEMENT.height / 2.0)) / BACKGROUND_ELEMENT.height) * 20.0) + 1.0));
            BACKGROUND_CONTEXT.fillStyle = "rgba(255, 255, 255, " + (STAR_PULSE_MINIMUM + ((star.pulse > 0.5 ? 1.0 - star.pulse : star.pulse) * (1.0 - STAR_PULSE_MINIMUM) * 2.0)) + ')';

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (star.position.x, star.position.y);
            BACKGROUND_CONTEXT.arc      (Math.floor(star.position.x), Math.floor(star.position.y), star.radius, 0.0, MATH_TAU, false);
            BACKGROUND_CONTEXT.fill     ()
          }
        }

        /* HIDDEN PLANETS WITH RAY-CASTED LIGHTS */
        /* CLUMPS OF STARS MOVING IN A SHARED DIRECTION */
        /* CLICKING DEVIATES (and SPAWNS other) STARS IN A CLUMP TEMPORARILY */
      })
    }
  }
}

else {
  var backgroundElement = new Image() || document.createElement("img");

  // ...
  backgroundElement.alt = "canvas";
  backgroundElement.src = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AKoP/2Q==";

  void BACKGROUND_ELEMENT.parentNode.insertBefore(backgroundElement, BACKGROUND_ELEMENT);
  void BACKGROUND_ELEMENT.parentNode.removeChild (BACKGROUND_ELEMENT);

  for (var index = BACKGROUND_ELEMENT.attributes.length; index--; )
    backgroundElement.setAttribute(BACKGROUND_ELEMENT.attributes.item(index).name, BACKGROUND_ELEMENT.attributes.item(index).value);

  BACKGROUND_ELEMENT = backgroundElement
}

// ...
if (null !== TAGLINE_ELEMENT)
void convertChildNodes(TAGLINE_ELEMENT, /* --> Node.TEXT_NODE */ 0x3, /* --> Node.ELEMENT_NODE */ 0x1)
