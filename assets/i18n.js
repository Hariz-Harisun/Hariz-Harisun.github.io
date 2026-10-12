/* BM/EN language switcher — static i18n (no backend).
   Dictionaries served from assets/i18n/, choice persisted in localStorage. */
(function ()
{
  var STORE = "hh-lang";
  var HTML_LANG = { en: "en-GB", bm: "ms" };

  var BASE = "";
  if (document.currentScript && document.currentScript.src)
  {
    BASE = document.currentScript.src.replace(/assets\/i18n\.js.*$/, "");
  }

  var dicts = {};
  var current = "en";

  function loadDict(lang)
  {
    if (dicts[lang]) return Promise.resolve(dicts[lang]);
    return fetch(BASE + "assets/i18n/" + lang + ".json")
      .then(function (r) { return r.json(); })
      .then(function (d) { dicts[lang] = d; return d; })
      .catch(function () { return {}; });
  }

  function setText(el, str)
  {
    if (!el || str == null) return;
    if (el.tagName.toLowerCase() === "section") return;

    // Check if element has child elements
    var p = el.querySelector("p");
    if (p && el.children.length === 1)
    {
      p.textContent = str;
      return;
    }

    // For headings with anchorjs-link, preserve anchor link
    var anchor = el.querySelector("a.anchorjs-link");
    if (anchor)
    {
      var textNode = Array.from(el.childNodes).find(function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (textNode) { textNode.textContent = str; return; }
    }

    if (!el.children.length)
    {
      el.textContent = str;
    }
  }

  function pageKey()
  {
    var rel = location.pathname;
    if (BASE)
    {
      var basePath = new URL(BASE).pathname;
      if (rel.indexOf(basePath) === 0) rel = rel.slice(basePath.length);
    }
    rel = rel.replace(/^\//, "").replace(/\/$/, "").toLowerCase();
    if (rel === "" || rel === "index.html") return "page.about";
    if (rel === "blog.html") return "page.blog";
    if (rel === "project.html" || rel === "projects.html") return "page.projects";
    return null;
  }

  function apply(lang)
  {
    return loadDict(lang).then(function (dict)
    {
      if (!dict || !Object.keys(dict).length) return;
      document.documentElement.setAttribute("lang", HTML_LANG[lang] || lang);

      // content blocks marked in markdown
      document.querySelectorAll("[data-i18n]").forEach(function (el)
      {
        setText(el, dict[el.getAttribute("data-i18n")]);
      });

      // TOC headings / abbreviations
      document.querySelectorAll("[data-i18n-toc]").forEach(function (el)
      {
        var key = el.getAttribute("data-i18n-toc");
        var val = dict[key];
        if (val != null)
        {
          el.setAttribute("data-toc-text", val);
          var id = el.id || (el.querySelector("[id]") && el.querySelector("[id]").id);
          if (id)
          {
            var tocLink = document.querySelector('nav#TOC a[data-scroll-target="#' + id + '"], nav#TOC a[href="#' + id + '"]');
            if (tocLink) tocLink.textContent = val;
          }
        }
      });

      // navbar left links — normalize pathname to match across relative and absolute URLs
      document.querySelectorAll("ul.navbar-nav a.nav-link").forEach(function (a)
      {
        var norm = "";
        try
        {
          norm = new URL(a.href, location.href).pathname.replace(/^\//, "").replace(/\/$/, "").toLowerCase();
        }
        catch (e)
        {
          norm = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
        }
        var menuSpan = a.querySelector(".menu-text") || a;
        if (norm === "" || norm === "index.html")
        {
          setText(menuSpan, dict["nav.home"]);
        }
        else if (norm === "blog.html")
        {
          setText(menuSpan, dict["nav.blog"]);
        }
        else if (norm === "project.html" || norm === "projects.html")
        {
          setText(menuSpan, dict["nav.projects"]);
        }
      });

      // page title (top-level pages only) + browser tab title
      var key = pageKey();
      if (key && dict[key])
      {
        setText(document.querySelector("h1.title"), dict[key]);
        var parts = document.title.split(" | ");
        if (parts.length > 1) document.title = dict[key] + " | " + parts.slice(1).join(" | ");
      }

      // TOC title
      var tocH = document.querySelector("#TOC .toc-heading, #TOC .toc-title, #TOC h2, nav#TOC h2");
      if (tocH) setText(tocH, dict["toc.contents"]);

      // search placeholder
      document.querySelectorAll(".search-input, input[type='search']").forEach(function (inp)
      {
        if (dict["search.placeholder"]) inp.setAttribute("placeholder", dict["search.placeholder"]);
      });

      updateButton();
    });
  }

  function updateButton()
  {
    var btn = document.getElementById("lang-switch");
    if (!btn) return;
    btn.textContent = current === "en" ? "BM" : "EN";
    btn.setAttribute("aria-label",
      current === "en" ? "Tukar ke Bahasa Melayu" : "Switch to English");
  }

  function mountButton()
  {
    if (document.getElementById("lang-switch")) return;
    var ul = document.querySelector("ul.navbar-nav.navbar-nav-scroll.ms-auto");
    if (!ul) return;
    var li = document.createElement("li");
    li.className = "nav-item";
    var btn = document.createElement("button");
    btn.id = "lang-switch";
    btn.type = "button";
    btn.addEventListener("click", function ()
    {
      current = current === "en" ? "bm" : "en";
      try { localStorage.setItem(STORE, current); } catch (e) { }
      apply(current);
    });
    li.appendChild(btn);
    ul.insertBefore(li, ul.firstChild);
    updateButton();
  }

  function init()
  {
    var stored = null;
    try { stored = localStorage.getItem(STORE); } catch (e) { }
    current = stored === "bm" || stored === "en" ? stored : "en";

    mountButton();
    apply(current);

    if (document.readyState === "loading")
    {
      document.addEventListener("DOMContentLoaded", function ()
      {
        mountButton();
        apply(current);
      });
    }
    setTimeout(function () { apply(current); }, 600);
    window.addEventListener("load", function ()
    {
      mountButton();
      apply(current);
    });
  }

  init();
})();
