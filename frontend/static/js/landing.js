/* ============================================================
   TripSage AI — landing page
   Theme toggle (shared key with the planner) + a live read of
   GET /api/config so the status chip reflects reality.
   ============================================================ */
(function () {
  "use strict";

  var THEME_KEY = "tripsage.theme";

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    document.documentElement.setAttribute("data-theme", stored || "light");
  }

  initTheme();

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  var statusBtn = document.getElementById("apiStatus");
  if (statusBtn) {
    var statusText = statusBtn.querySelector(".status-text");

    function setStatus(state, text) {
      statusBtn.setAttribute("data-state", state);
      statusText.textContent = text;
    }

    statusBtn.addEventListener("click", function () {
      window.location.href = "/planner";
    });

    fetch("/api/config")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setStatus(data && data.ready ? "ok" : "setup", data && data.ready ? "API connected" : "Setup needed");
      })
      .catch(function () {
        setStatus("down", "API unreachable");
      });
  }

})();
