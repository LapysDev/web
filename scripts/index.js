var BACKGROUND_REEL_STARRY       = 0x0;
var BACKGROUND_REELS             = [BACKGROUND_REEL_STARRY];
var BACKGROUND_ELEMENT           = getElementById("background");
var BACKGROUND_CONTEXT           = typeof BACKGROUND_ELEMENT.getContext === "function" ? BACKGROUND_ELEMENT.getContext("2d", {"alpha": true, "colorSpace": "srgb", "desynchronized": true, "willReadFrequently": false}) : null;
var BACKGROUND_STYLE_DECLARATION = getCSSStyleDeclaration(BACKGROUND_ELEMENT);
var TAGLINE_ELEMENT              = getElementById("tagline");

// ...
if (null !== BACKGROUND_CONTEXT) {
  function colorRGBInvertFilters(color, filter) {
    var color   = color;
    var filters = [filter["brightness"], filter["contrast"], filter["hue-rotate"], filter["invert"], filter["saturate"]].sort(function(filterA, filterB) { return filterA.index - filterB.index });

    // ... ->> `filters` possibly too destructive to be inverted
    while (filters.length)
    switch (filters.pop()) {
      case filter["brightness"]: if (filter["brightness"].index !== -1) color = colorRGBBrightness(color, 1.0 / filter["brightness"].value); break;
      case filter["contrast"]:   if (filter["contrast"]  .index !== -1) color = colorRGBContrast  (color, 1.0 / filter["contrast"]  .value); break;
      case filter["hue-rotate"]: if (filter["hue-rotate"].index !== -1) color = colorRGBHueRotate (color, -filter["hue-rotate"]     .value); break;
      case filter["invert"]:     if (filter["invert"]    .index !== -1) color = colorRGBInversion (color, 1.0 / filter["invert"]    .value); break;
      case filter["saturate"]:   if (filter["saturate"]  .index !== -1) color = colorRGBSaturation(color, 1.0 / filter["saturate"]  .value); break;
    }

    return color
  }

  function filters() {
    var filter      = {"brightness": null, "contrast": null, "hue-rotate": null, "invert": null, "saturate": null};
    var filterMatch = null;
    var filterValue = BACKGROUND_STYLE_DECLARATION.getPropertyValue("filter") || "";

    // ...
    switch ((filterMatch = filterValue.match(/\bbrightness\(\s*([-+]?(?:\d+(?:.\d*)?|.\d+)(?:[Ee][-+]?\d+)?)(|%)\s*\)/i) || [null, null])[2]) {
      case "":  filter["brightness"] = {index: filterMatch.index, value: +filterMatch[1]};         break;
      case '%': filter["brightness"] = {index: filterMatch.index, value:  filterMatch[1] / 100.0}; break;
      default:  filter["brightness"] = {index: -1,                value: 0.0}
    }

    switch ((filterMatch = filterValue.match(/\bcontrast\(\s*([-+]?(?:\d+(?:.\d*)?|.\d+)(?:[Ee][-+]?\d+)?)(|%)\s*\)/i) || [null, null])[2]) {
      case "":  filter["contrast"] = {index: filterMatch.index, value: +filterMatch[1]};         break;
      case '%': filter["contrast"] = {index: filterMatch.index, value:  filterMatch[1] / 100.0}; break;
      default:  filter["contrast"] = {index: -1,                value: 0.0}
    }

    switch ((filterMatch = filterValue.match(/\bhue-rotate\(\s*([-+]?(?:\d+(?:.\d*)?|.\d+)(?:[Ee][-+]?\d+)?)(deg|grad|rad|turn)\s*\)/i) || [null, null])[2]) {
      case "deg":  filter["hue-rotate"] = {index: filterMatch.index, value: +filterMatch[1]};                   break;
      case "grad": filter["hue-rotate"] = {index: filterMatch.index, value:  filterMatch[1] * 0.9};             break;
      case "rad":  filter["hue-rotate"] = {index: filterMatch.index, value:  filterMatch[1] * MATH_RAD_TO_DEG}; break;
      case "turn": filter["hue-rotate"] = {index: filterMatch.index, value:  filterMatch[1] * 360.0};           break;
      default:     filter["hue-rotate"] = {index: -1,                value: 0.0}
    }

    switch ((filterMatch = filterValue.match(/\binvert\(\s*([-+]?(?:\d+(?:.\d*)?|.\d+)(?:[Ee][-+]?\d+)?)(|%)\s*\)/i) || [null, null])[2]) {
      case "":  filter["invert"] = {index: filterMatch.index, value: +filterMatch[1]};         break;
      case '%': filter["invert"] = {index: filterMatch.index, value:  filterMatch[1] / 100.0}; break;
      default:  filter["invert"] = {index: -1,                value: 0.0}
    }

    switch ((filterMatch = filterValue.match(/\bsaturate\(\s*([-+]?(?:\d+(?:.\d*)?|.\d+)(?:[Ee][-+]?\d+)?)(|%)\s*\)/i) || [null, null])[2]) {
      case "":  filter["saturate"] = {index: filterMatch.index, value: +filterMatch[1]};         break;
      case '%': filter["saturate"] = {index: filterMatch.index, value:  filterMatch[1] / 100.0}; break;
      default:  filter["saturate"] = {index: -1,                value: 0.0}
    }

    // ...
    return filter
  }

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

  /* ... */
  resolution();
  void poll(window, "load",   resolution, {"capture": true, "once": true,  "passive": true});
  void poll(window, "resize", resolution, {"capture": true, "once": false, "passive": true});

  if (typeof ResizeObserver === "function")
  (new ResizeObserver(resolution)).observe(document.documentElement);

  switch (BACKGROUND_REELS[Math.floor(BACKGROUND_REELS.length * Math.random())]) {
    case BACKGROUND_REEL_STARRY: {
      var COMET_CREATE_INTERVAL       = 5.0e3;
      var COMET_LENGTH_MAXIMUM        = 200;
      var COMET_SIZE                  = 3;
      var COMET_SPEED                 = 30.0;
      var PLANETOID_RIPPLE_FALLOFF    = 0.005; // ->> % percent per frame
      var STAR_COUNT_MAXIMUM          = 1200;
      var STAR_COUNT_MINIMUM          = 200;
      var STAR_PULSE_MINIMUM          = 0.10; // ->> % percent
      var STAR_PULSE_SPEED            = 0.01; // ->> % percent
      var STAR_RIPPLE_CLUSTER_MAXIMUM = 8;
      var STAR_RIPPLE_FALLOFF         = 0.1; // ->> per frame
      var STAR_RIPPLE_FORCE_MAXIMUM   = 30.0;
      var STAR_RIPPLE_SIZE            = 200;
      var STAR_SIZE_MAXIMUM           = 1.5;
      var STAR_SIZE_MINIMUM           = 0.5;
      var STAR_SPEED_MAXIMUM          = 0.25;
      var STAR_SPEED_MINIMUM          = 0.10;

      var cometCreateIntervalRate = 1.00;
      var comets                  = [];
      var planetoids              = [];
      var reelTimeDelta           = 0.0;
      var reelTimestamp           = timestamp();
      var starClusterIDIncrement  = 0;
      var ripplePosition          = {x: Math.round(BACKGROUND_ELEMENT.width / 2.0), y: Math.round(BACKGROUND_ELEMENT.height / 2.0)};
      var stars                   = [];

      /* ... */
      function createComets(position) {
        void comets.push({
          origin     : {x: position.x, y: position.y},
          position   : {x: position.x, y: position.y},
          '__proto__': null
        })
      }
        function createCometsAtRandomPosition() { return createComets({x: BACKGROUND_ELEMENT.width * Math.random(), y: BACKGROUND_ELEMENT.height * Math.random()}) }

      function createPlanetoids() {
        for (var count = Math.ceil(Math.random() * 7) + 2; count--; )
        void planetoids.push({
          position   : {x: BACKGROUND_ELEMENT.width * Math.random(), y: BACKGROUND_ELEMENT.height * Math.random()},
          ripple     : 0.0,
          speed      : Math.random() * 0.0005, // ->> % percent per frame
          size       : Math.min(BACKGROUND_ELEMENT.height, BACKGROUND_ELEMENT.width) * Math.random() * 0.3,
          '__proto__': null
        })
      }

      function createStars(position) {
        var direction       = {x: Math.random(), y: Math.random()};
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
              cluster    : starClusterIDIncrement,
              direction  : Math.random() > 0.8 ? {x: -direction.x + scatter, y: -direction.y + scatter} : {x: +direction.x + scatter, y: +direction.y + scatter},
              position   : {x: position.x + (radius * Math.cos((MATH_TAU * (offset + (index / count))))), y: position.y + (radius * Math.sin((MATH_TAU * (offset + (index / count)))))},
              pulse      : 0.0,
              ripple     : {x: 0.0, y: 0.0},
              size       : STAR_SIZE_MINIMUM + ((STAR_SIZE_MAXIMUM - STAR_SIZE_MINIMUM) * Math.random()),
              speed      : {x: STAR_SPEED_MINIMUM + ((STAR_SPEED_MAXIMUM - STAR_SPEED_MINIMUM) * Math.random()), y: STAR_SPEED_MINIMUM + ((STAR_SPEED_MAXIMUM - STAR_SPEED_MINIMUM) * Math.random())},
              '__proto__': null
            })
          }
        }
      }
        function createStarsAtRandomPosition() { return createStars({x: BACKGROUND_ELEMENT.width * Math.random(), y: BACKGROUND_ELEMENT.height * Math.random()}) }
        function createStarsAtRipplePosition() { return createStars(ripplePosition) }

      function ripplePlanetoids(force) {
        for (var index = planetoids.length; index--; ) {
          var planetoid = planetoids[index];
          planetoid.ripple = force * (1.0 - (distance2D(planetoid.position, ripplePosition) / (BACKGROUND_ELEMENT.height * BACKGROUND_ELEMENT.width)))
        }
      }

      function rippleStars(force) {
        var clusterCount = 0;
        var clusters     = [];

        // ... ->> Maybe partition into spatial grids to optimize
        for (var index = stars.length; index--; ) {
          var clusterUniqueCount = clusterCount;
          var star               = stars[index];
          var starDistance       = distance2D(star.position, ripplePosition);

          // ...
          for (var subindexA = clusterCount; subindexA--; )
          for (var subindexB = clusterCount; subindexB--; ) {
            if (subindexA > subindexB && clusters[subindexA].cluster === clusters[subindexB].cluster) {
              var clusterStarIndex = clusterCount;

              while (clusters[--clusterStarIndex].cluster !== clusters[subindexA].cluster) continue;
              if (clusterStarIndex === subindexA) --clusterUniqueCount
            }
          }

          if (starDistance > Math.pow(STAR_RIPPLE_SIZE, 2))
          continue;

          // ...
          if (STAR_RIPPLE_CLUSTER_MAXIMUM > clusterUniqueCount)
            clusterCount = clusters.push(star);

          else {
            var closestClusterStarDistance = -0.0;
            var closestClusterStarIndex    = -1;
            var starSharesCluster          = false;

            // ...
            for (var clusterStarIndex = clusterCount; clusterStarIndex--; ) {
              var clusterStar         = clusters[clusterStarIndex];
              var clusterStarDistance = distance2D(clusterStar.position, ripplePosition);

              // ...
              if (clusterStarDistance > starDistance) {
                if (clusterStar.cluster === star.cluster)
                starSharesCluster = true;

                if ((closestClusterStarIndex === -1 || closestClusterStarDistance > clusterStarDistance) && (!starSharesCluster || clusterStar.cluster === star.cluster)) {
                  closestClusterStarDistance = clusterStarDistance;
                  closestClusterStarIndex    = clusterStarIndex
                }
              }
            }

            if (closestClusterStarIndex !== -1)
            clusters[closestClusterStarIndex] = star
          }
        }

        // ...
        while (clusterCount--) {
          var clusterStar      = clusters.pop();
          var clusterStarForce = force * (1.0 - (distance2D(clusterStar.position, ripplePosition) / Math.pow(STAR_RIPPLE_SIZE, 2)));

          clusterStar.ripple.x = Math.min(+STAR_RIPPLE_FORCE_MAXIMUM, Math.max(-STAR_RIPPLE_FORCE_MAXIMUM, clusterStar.ripple.x + (clusterStarForce * (clusterStar.position.x > ripplePosition.x ? +1 : -1))));
          clusterStar.ripple.y = Math.min(+STAR_RIPPLE_FORCE_MAXIMUM, Math.max(-STAR_RIPPLE_FORCE_MAXIMUM, clusterStar.ripple.y + (clusterStarForce * (clusterStar.position.y > ripplePosition.y ? +1 : -1))))
        }
      }
        function rippleStarsActively () { return rippleStars(7.0) }
        function rippleStarsPassively() { return rippleStars(4.0) }

      // ...
      createPlanetoids();

      void poll(BACKGROUND_ELEMENT.parentNode, "click",     function(event) {                                  ripplePosition.x = event.clientX; ripplePosition.y = event.clientY; waitEvery(rippleStarsActively,  0.0e3); waitEvery(createStarsAtRipplePosition, 5.0e3); ripplePlanetoids(0.3) }, {"capture": true, "passive": true});
      void poll(BACKGROUND_ELEMENT.parentNode, "mousemove", function(event) { cometCreateIntervalRate += 1.00; ripplePosition.x = event.clientX; ripplePosition.y = event.clientY; waitEvery(rippleStarsPassively, 0.2e3) },                                                                       {"capture": true, "passive": true});
      void poll(window,                        "scroll",    function(event) { cometCreateIntervalRate += 2.00 },                                                                                                                                                                                   {"capture": true, "passive": true});

      void LOOP_PROCEDURES.push(function reel() {
        var reelPreviousTimestamp = reelTimestamp;
        var reelFilters           = filters();
        var starColor             = colorRGBInvertFilters({red: 0xFF, green: 0xFF, blue: 0xFF}, reelFilters);
        var planetoidRippleColor  = colorRGBInvertFilters({red: 0xFF, green: 0xFF, blue: 0xFF}, reelFilters);
        var cometLengthMaximum    = Math.max(BACKGROUND_ELEMENT.width * 0.35, COMET_LENGTH_MAXIMUM);
        var cometColor            = colorRGBInvertFilters({red: 0xFF, green: 0xFF, blue: 0xFF}, reelFilters);

        // ...
        BACKGROUND_CONTEXT.globalCompositeOperation = "source-over";
        reelTimestamp                               = timestamp();
        reelTimeDelta                               = reelTimestamp - reelPreviousTimestamp;
        cometCreateIntervalRate                     = Math.max(cometCreateIntervalRate - (cometCreateIntervalRate !== 1.00 ? 1.75 : 0.00), 1.00);

        BACKGROUND_CONTEXT.clearRect(0, 0, BACKGROUND_ELEMENT.width, BACKGROUND_ELEMENT.height);
        void waitEvery(createCometsAtRandomPosition, COMET_CREATE_INTERVAL / cometCreateIntervalRate);
        void waitEvery(createStarsAtRandomPosition,  stars.length ? 10.0e3 : 0.0e3);

        // ... ->> Comets
        for (var index = comets.length; index--; ) {
          var comet = comets[index];

          // ...
          if (comet.position.x <= 0.0 - cometLengthMaximum || BACKGROUND_ELEMENT.height <= comet.position.y - cometLengthMaximum) {
            comets[index] = comets[comets.length - 1];
            comets.length--
          }

          else {
            var cometSpeed  = {x: COMET_SPEED * 1.0,                 y: COMET_SPEED * 0.6};
            var cometLength = {x: comet.origin.x - comet.position.x, y: comet.position.y - comet.origin.y};
            var cometAngle  = Math.atan2(cometLength.y, -cometLength.x), cometTangentAngle = Math.asin(COMET_SIZE / Math.sqrt(Math.pow(cometLength.x, 2) + Math.pow(cometLength.y, 2)));

            // ...
            BACKGROUND_CONTEXT.fillStyle = BACKGROUND_CONTEXT.createLinearGradient(comet.origin.x, comet.origin.y, comet.position.x, comet.position.y);
            comet.origin.x              -= cometLengthMaximum < cometLength.x || cometLengthMaximum < cometLength.y ? cometSpeed.x : 0;
            comet.origin.y              += cometLengthMaximum < cometLength.x || cometLengthMaximum < cometLength.y ? cometSpeed.y : 0;
            comet.position.x            -= cometSpeed.x;
            comet.position.y            += cometSpeed.y;

            // ...
            BACKGROUND_CONTEXT.fillStyle.addColorStop(0.0, colorRGBAToString(cometColor, 0.0));
            BACKGROUND_CONTEXT.fillStyle.addColorStop(1.0, colorRGBAToString(cometColor, 0.6));

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (Math.floor(comet.origin  .x), Math.floor(comet.origin  .y));
            BACKGROUND_CONTEXT.arc      (Math.floor(comet.position.x), Math.floor(comet.position.y), COMET_SIZE, cometAngle - MATH_ETA - cometTangentAngle, cometAngle + MATH_ETA + cometTangentAngle, false);
            BACKGROUND_CONTEXT.closePath();
            BACKGROUND_CONTEXT.fill     ();

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (comet.position.x, comet.position.y);
            BACKGROUND_CONTEXT.arc      (Math.floor(comet.position.x), Math.floor(comet.position.y), Math.ceil(COMET_SIZE * 0.65), 0.0, MATH_TAU, false);
            BACKGROUND_CONTEXT.closePath();
            BACKGROUND_CONTEXT.fill     ()
          }
        }

        // ... ->> Stars
        for (var index = stars.length; index--; ) {
          var star = stars[index];

          // ...
          if ((BACKGROUND_ELEMENT.width <= star.position.x || star.position.x <= 0.0) || (BACKGROUND_ELEMENT.height <= star.position.y || star.position.y <= 0.0)) {
            stars[index] = stars[stars.length - 1];
            stars.length--
          }

          else {
            star.ripple.x                = STAR_RIPPLE_FALLOFF <= Math.abs(star.ripple.x) ? star.ripple.x - (STAR_RIPPLE_FALLOFF * (star.ripple.x > -0.0 ? +1 : -1)) : 0.0;
            star.ripple.y                = STAR_RIPPLE_FALLOFF <= Math.abs(star.ripple.y) ? star.ripple.y - (STAR_RIPPLE_FALLOFF * (star.ripple.y > -0.0 ? +1 : -1)) : 0.0;
            star.pulse                   = (star.pulse + (STAR_PULSE_SPEED * Math.random())) % 1.0;
            star.position.x             += (star.ripple.x ? Math.abs(star.direction.x) < Math.abs(star.ripple.x) ? star.ripple.x : (star.direction.x + star.ripple.x) / 2.0 : star.direction.x) * (star.speed.x * (((Math.abs(star.position.x - (BACKGROUND_ELEMENT.width  / 2.0)) / BACKGROUND_ELEMENT.width)  * 20.0) + 1.0));
            star.position.y             += (star.ripple.y ? Math.abs(star.direction.y) < Math.abs(star.ripple.y) ? star.ripple.y : (star.direction.y + star.ripple.y) / 2.0 : star.direction.y) * (star.speed.y * (((Math.abs(star.position.y - (BACKGROUND_ELEMENT.height / 2.0)) / BACKGROUND_ELEMENT.height) * 20.0) + 1.0));
            BACKGROUND_CONTEXT.fillStyle = colorRGBAToString(starColor, STAR_PULSE_MINIMUM + ((star.pulse > 0.5 ? 1.0 - star.pulse : star.pulse) * (1.0 - STAR_PULSE_MINIMUM) * 2.0));

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (star.position.x, star.position.y);
            BACKGROUND_CONTEXT.arc      (Math.floor(star.position.x), Math.floor(star.position.y), star.size, 0.0, MATH_TAU, false);
            BACKGROUND_CONTEXT.closePath();
            BACKGROUND_CONTEXT.fill     ()
          }
        }

        // ... ->> Planetoids (rippled in the dark)
        for (var index = planetoids.length; index--; ) {
          var planetoid       = planetoids[index];
          var planetoidRadius = planetoid.size / 2.0;

          // ...
          planetoid.position.x = BACKGROUND_ELEMENT.width > planetoid.position.x - planetoidRadius ? planetoid.position.x + (BACKGROUND_ELEMENT.width * planetoid.speed) : -planetoidRadius;
          planetoid.ripple     = Math.max(planetoid.ripple - PLANETOID_RIPPLE_FALLOFF, 0.0)
        }

        for (var index = planetoids.length; index--; ) {
          var planetoid = planetoids[index];

          // ... ->> Back-lighting
          if (planetoid.ripple) {
            var planetoidRadius   = planetoid.size / 2.0;
            var rippleAngle       = Math.atan2(ripplePosition.y - planetoid.position.y, ripplePosition.x - planetoid.position.x) + MATH_PI; // ->> ∠ radians
            var rippleAngleCosine = Math.cos(rippleAngle);
            var rippleAngleSine   = Math.sin(rippleAngle);
            var rippleCastLength  = Math.max(BACKGROUND_ELEMENT.height, BACKGROUND_ELEMENT.width);
            var rippleCastPoints  = [{x: 0, y: -planetoidRadius}, {x: 0, y: +planetoidRadius}, {x: rippleCastLength, y: +planetoidRadius * 6.0}, {x: rippleCastLength, y: -planetoidRadius * 6.0}];

            // ...
            BACKGROUND_CONTEXT.fillStyle = colorRGBAToString(planetoidRippleColor, planetoid.ripple * 0.4);

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (planetoid.position.x + (rippleAngleCosine * rippleCastPoints[0].x) - (rippleAngleSine * rippleCastPoints[0].y), planetoid.position.y + (rippleAngleSine * rippleCastPoints[0].x) + (rippleAngleCosine * rippleCastPoints[0].y));
            BACKGROUND_CONTEXT.lineTo   (planetoid.position.x + (rippleAngleCosine * rippleCastPoints[1].x) - (rippleAngleSine * rippleCastPoints[1].y), planetoid.position.y + (rippleAngleSine * rippleCastPoints[1].x) + (rippleAngleCosine * rippleCastPoints[1].y));
            BACKGROUND_CONTEXT.lineTo   (planetoid.position.x + (rippleAngleCosine * rippleCastPoints[2].x) - (rippleAngleSine * rippleCastPoints[2].y), planetoid.position.y + (rippleAngleSine * rippleCastPoints[2].x) + (rippleAngleCosine * rippleCastPoints[2].y));
            BACKGROUND_CONTEXT.lineTo   (planetoid.position.x + (rippleAngleCosine * rippleCastPoints[3].x) - (rippleAngleSine * rippleCastPoints[3].y), planetoid.position.y + (rippleAngleSine * rippleCastPoints[3].x) + (rippleAngleCosine * rippleCastPoints[3].y));
            BACKGROUND_CONTEXT.closePath();
            BACKGROUND_CONTEXT.fill     ()
          }
        }

        for (var index = planetoids.length; index--; ) {
          var planetoid       = planetoids[index];
          var planetoidRadius = planetoid.size / 2.0;

          // ... ->> Body
          BACKGROUND_CONTEXT.fillStyle                = "rgba(255, 255, 255, 1.0)";
          BACKGROUND_CONTEXT.globalCompositeOperation = "destination-out";

          BACKGROUND_CONTEXT.beginPath();
          BACKGROUND_CONTEXT.moveTo   (planetoid.position.x + planetoidRadius, planetoid.position.y);
          BACKGROUND_CONTEXT.arc      (Math.floor(planetoid.position.x), Math.floor(planetoid.position.y), planetoidRadius, 0.0, MATH_TAU, false);
          BACKGROUND_CONTEXT.closePath();
          BACKGROUND_CONTEXT.fill     ();

          // ... ->> Raycast
          BACKGROUND_CONTEXT.globalCompositeOperation = "source-over";

          if (planetoid.ripple) {
            var ripple                      = planetoid.ripple * planetoidRadius;
            var rippleAngle                 = Math.atan2(ripplePosition.y - planetoid.position.y, ripplePosition.x - planetoid.position.x); // ->> ∠ radians
            var rippleContactCirclePosition = {x: planetoid.position.x - (ripple * Math.cos(rippleAngle) * 1.0), y: planetoid.position.y - (ripple * Math.sin(rippleAngle) * 1.0)};
            var rippleMidpoint              = {x: planetoid.position.x - (ripple * Math.cos(rippleAngle) * 0.5), y: planetoid.position.y - (ripple * Math.sin(rippleAngle) * 0.5)}; // ->> Midpoint between `.position` and `rippleContactCirclePosition`
            var rippleMidpointDistance      = Math.sqrt(Math.pow(planetoidRadius, 2) - (Math.pow(ripple, 2) * 0.25));
            var rippleIntersections         = [
              {x: rippleMidpoint.x - (rippleMidpointDistance * +Math.sin(rippleAngle)), y: rippleMidpoint.y - (rippleMidpointDistance * -Math.cos(rippleAngle))},
              {x: rippleMidpoint.x + (rippleMidpointDistance * +Math.sin(rippleAngle)), y: rippleMidpoint.y + (rippleMidpointDistance * -Math.cos(rippleAngle))}
            ];

            // ...
            BACKGROUND_CONTEXT.fillStyle = BACKGROUND_CONTEXT.createLinearGradient(planetoid.position.x, planetoid.position.y, planetoid.position.x + (planetoidRadius * Math.cos(rippleAngle)), planetoid.position.y + (planetoidRadius * Math.sin(rippleAngle)));

            // ...
            BACKGROUND_CONTEXT.fillStyle.addColorStop(0.00, colorRGBAToString(planetoidRippleColor, 0.0));
            BACKGROUND_CONTEXT.fillStyle.addColorStop(1.00, colorRGBAToString(planetoidRippleColor, 0.4));

            BACKGROUND_CONTEXT.beginPath();
            BACKGROUND_CONTEXT.moveTo   (planetoid.position.x, planetoid.position.y);
            BACKGROUND_CONTEXT.arc      (planetoid.position.x,          planetoid.position.y,          planetoidRadius, Math.atan2(rippleIntersections[1].y - planetoid.position.y,          rippleIntersections[1].x - planetoid.position.x),          Math.atan2(rippleIntersections[0].y - planetoid.position.y,          rippleIntersections[0].x - planetoid.position.x),          false);
            BACKGROUND_CONTEXT.arc      (rippleContactCirclePosition.x, rippleContactCirclePosition.y, planetoidRadius, Math.atan2(rippleIntersections[0].y - rippleContactCirclePosition.y, rippleIntersections[0].x - rippleContactCirclePosition.x), Math.atan2(rippleIntersections[1].y - rippleContactCirclePosition.y, rippleIntersections[1].x - rippleContactCirclePosition.x), true);
            BACKGROUND_CONTEXT.fill     ();
            BACKGROUND_CONTEXT.closePath()
          }
        }

        // ... ->> Fade out
        BACKGROUND_CONTEXT.fillStyle                = "rgba(255, 255, 255, 1.0)";
        BACKGROUND_CONTEXT.globalCompositeOperation = "destination-out";

        BACKGROUND_CONTEXT.beginPath();
        BACKGROUND_CONTEXT.ellipse  (Math.floor(BACKGROUND_ELEMENT.width / 2.0), BACKGROUND_ELEMENT.height, BACKGROUND_ELEMENT.width / 2.0, BACKGROUND_ELEMENT.height * 0.2, 0.0, 0.0, MATH_TAU, false);
        BACKGROUND_CONTEXT.fill     ()
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
