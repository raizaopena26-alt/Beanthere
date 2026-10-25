/* =====================================================
   BEAN THERE: script.js
   1. MENU DATA  <- edit names, descriptions, prices and photos here
   2. Menu drawing code (you don't need to edit this part)
   3. Category bar, mobile menu, floor tabs
   4. Free pastry promo status + countdown (Philippine time)
   5. Reminder form + social links
   ===================================================== */
(function () {
  "use strict";

  /* =====================================================
     1. MENU DATA
     - Prices are SAMPLE prices in pesos. Change the numbers freely.
     - Drinks: prices: [Small, Medium, Large]. Food: price: one number.
     - temps: ["hot", "iced"] shows a Hot/Iced switch. ["hot"] or ["iced"] shows a single label.
     - tone: the drink color shown in the illustration (any hex color).
     - image: OPTIONAL photo, e.g. image: "assets/menu/americano.jpg".
       Leave it out (or leave the file missing) and the drawn illustration is used instead.
     ===================================================== */
  var MENU = [
    {
      id: "coffee", title: "Coffee", kind: "drink",
      blurb: "Espresso classics, made hot or iced the way you like them.",
      items: [
        { name: "Americano", desc: "Bold espresso with hot water. Clean, strong and simple.", temps: ["hot", "iced"], prices: [80, 95, 110], tone: "#3A2A12" },
        { name: "Café Latte", desc: "Smooth espresso with silky steamed milk.", temps: ["hot", "iced"], prices: [100, 115, 130], tone: "#A0764A" },
        { name: "Cappuccino", desc: "Espresso topped with a thick cloud of velvety foam.", temps: ["hot"], prices: [100, 115, 130], tone: "#B58A5C" },
        { name: "Spanish Latte", desc: "Espresso and milk sweetened with creamy condensed milk.", temps: ["hot", "iced"], prices: [110, 125, 140], tone: "#C29A68" },
        { name: "Mocha", desc: "Espresso, steamed milk and rich chocolate in every sip.", temps: ["hot", "iced"], prices: [110, 125, 140], tone: "#6B4429" },
        { name: "Caramel Macchiato", desc: "Vanilla milk, espresso and a buttery caramel drizzle.", temps: ["hot", "iced"], prices: [115, 130, 145], tone: "#C28A3E" }
      ]
    },
    {
      id: "frappes", title: "Frappes", kind: "drink",
      blurb: "Icy, creamy blended drinks. Always served cold.",
      items: [
        { name: "Mocha Frappe", desc: "Blended chocolate and coffee topped with whipped cream.", temps: ["iced"], prices: [130, 150, 170], tone: "#7A5230", cold: "frappe" },
        { name: "Caramel Frappe", desc: "Sweet caramel blended with coffee and ice, finished with a drizzle.", temps: ["iced"], prices: [130, 150, 170], tone: "#D0A05A", cold: "frappe" },
        { name: "Cookies & Cream Frappe", desc: "Crushed chocolate cookies swirled into a creamy, frosty treat.", temps: ["iced"], prices: [135, 155, 175], tone: "#EDE3D3", cold: "frappe" },
        { name: "Java Chip Frappe", desc: "Coffee, chocolate chips and ice blended into a crunchy-creamy cup.", temps: ["iced"], prices: [140, 160, 180], tone: "#5A3D27", cold: "frappe" }
      ]
    },
    {
      id: "matcha", title: "Matcha Series", kind: "drink",
      blurb: "Earthy, smooth and a little sweet.",
      items: [
        { name: "Matcha Latte", desc: "Ceremonial-style matcha whisked with fresh milk.", temps: ["hot", "iced"], prices: [120, 135, 150], tone: "#9AA66B" },
        { name: "Strawberry Matcha", desc: "Matcha over sweet strawberry milk for a pretty layered sip.", temps: ["iced"], prices: [130, 145, 160], tone: "#D68B93" },
        { name: "Dirty Matcha", desc: "Matcha with a shot of espresso for a bold, grassy kick.", temps: ["hot", "iced"], prices: [130, 145, 160], tone: "#7A8556" },
        { name: "Matcha Frappe", desc: "Blended matcha and ice, creamy and refreshing.", temps: ["iced"], prices: [140, 155, 170], tone: "#A7B07C", cold: "frappe" }
      ]
    },
    {
      id: "refreshers", title: "Refreshers", kind: "drink",
      blurb: "Fruity, fizzy and cold. Great after class.",
      items: [
        { name: "Strawberry Lemonade", desc: "Fresh lemonade with sweet strawberry. Tangy and bright.", temps: ["iced"], prices: [90, 105, 120], tone: "#E7788A" },
        { name: "Blueberry Lemonade", desc: "Zesty lemonade mixed with juicy blueberry.", temps: ["iced"], prices: [90, 105, 120], tone: "#7C74B8" },
        { name: "Lychee Soda", desc: "Sparkling soda with floral, lightly sweet lychee.", temps: ["iced"], prices: [90, 105, 120], tone: "#F0DCE0" },
        { name: "Green Apple Soda", desc: "Crisp green apple with a fizzy, tart finish.", temps: ["iced"], prices: [90, 105, 120], tone: "#A9CF6B" }
      ]
    },
    {
      id: "pastries", title: "Pastries", kind: "food", unit: "per piece",
      blurb: "Baked goods that go with any drink. Prices are per piece.",
      items: [
        { name: "Butter Croissant", desc: "Flaky, golden and buttery. Lovely warm.", price: 75, icon: "croissant" },
        { name: "Chocolate Chip Cookie", desc: "Soft in the middle, crisp at the edges, loaded with chocolate.", price: 60, icon: "cookie" },
        { name: "Brownie", desc: "Fudgy, rich and chocolatey with a crackly top.", price: 70, icon: "brownie" },
        { name: "Cinnamon Roll", desc: "A soft swirl of cinnamon sugar with sweet icing.", price: 85, icon: "roll" }
      ]
    },
    {
      id: "cakes", title: "Cakes", kind: "food", unit: "per slice",
      blurb: "Treat yourself. Prices are per slice.",
      items: [
        { name: "Chocolate Cake", desc: "Moist chocolate layers with creamy chocolate frosting.", price: 120, icon: "cake", colors: ["#4A2C1A", "#7A4A2A", "#E5D7C4"] },
        { name: "Red Velvet Cake", desc: "Velvety red layers with tangy cream cheese frosting.", price: 130, icon: "cake", colors: ["#9B2D30", "#F5F0E8", "#9B2D30"] },
        { name: "Blueberry Cheesecake", desc: "Creamy cheesecake on a buttery crust, topped with blueberries.", price: 140, icon: "cake", colors: ["#EAD9B5", "#F5F0E8", "#4B4A8A"] },
        { name: "Carrot Cake", desc: "Spiced, moist cake with a sweet cream cheese topping.", price: 125, icon: "cake", colors: ["#D9843C", "#F5F0E8", "#D9843C"] }
      ]
    }
  ];

  /* =====================================================
     2. MENU DRAWING CODE
     ===================================================== */
  var SIZE_NAMES = ["Small", "Medium", "Large"];
  var PESO = "\u20B1";

  // Small helper that wraps drawing code in an <svg>
  function svg(viewBox, inner) {
    return '<svg viewBox="' + viewBox + '" aria-hidden="true" focusable="false">' + inner + "</svg>";
  }

  // Picks the original logo color that is easiest to read on the drink color:
  // cream logo (assets/logo.png) on dark drinks, dark green logo (assets/logo-green.png) on light drinks.
  function brightness(hex) {
    var n = parseInt(hex.slice(1), 16), out = [];
    [n >> 16, (n >> 8) & 255, n & 255].forEach(function (v) {
      v = v / 255;
      out.push(v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    });
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2];
  }
  function logoFile(tone) {
    var drink = brightness(tone);
    var creamContrast = (0.88 + 0.05) / (drink + 0.05);   // cream logo
    var greenContrast = (drink + 0.05) / (0.04 + 0.05);   // dark green logo
    return creamContrast >= greenContrast ? "assets/logo.png" : "assets/logo-green.png";
  }
  // The ORIGINAL Bean There logo printed on the cup (no background box)
  function logoLabel(x, y, tone) {
    return '<image href="' + logoFile(tone) + '" x="' + x + '" y="' + y + '" width="34" height="30" preserveAspectRatio="xMidYMid meet"/>';
  }

  // Hot cup: clear (see-through) cup with a dark green sip lid and no straw,
  // so customers can see the drink color. "tone" is the drink color.
  function hotCup(tone) {
    return svg("0 -20 100 140",
      '<path d="M40 -3c-5-6 5-9 0-15M58 -3c-5-6 5-9 0-15" fill="none" stroke="#889063" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M22 24h56l-7 82a6 6 0 0 1-6 5H35a6 6 0 0 1-6-5z" fill="#F5F0E8" fill-opacity=".6" stroke="#4C3D19" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M23 36h54l-5.4 67a5 5 0 0 1-5 4.6H33.4a5 5 0 0 1-5-4.6z" fill="' + tone + '"/>' +
      '<path d="M30 40l-3 58" stroke="#fff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round"/>' +
      logoLabel(33, 58, tone) +
      '<rect x="26" y="4" width="48" height="9" rx="4" fill="#354024"/>' +
      '<rect x="18" y="12" width="64" height="12" rx="5" fill="#354024"/>' +
      '<ellipse cx="62" cy="8.5" rx="6" ry="2" fill="#E5D7C4"/>');
  }

  // Cold cup: clear cup with ice, flat lid and straw. kind "frappe" adds a whipped cream dome.
  function coldCup(tone, kind) {
    var top = kind === "frappe"
      ? '<rect x="16" y="14" width="68" height="9" rx="4" fill="#354024"/>' +
        '<path d="M22 14c0-26 56-26 56 0z" fill="#F5F0E8" stroke="#4C3D19" stroke-width="2"/>' +
        '<path d="M34 5c10-8 22-8 32 0" fill="none" stroke="#CFBB99" stroke-width="3" stroke-linecap="round"/>'
      : '<rect x="16" y="14" width="68" height="10" rx="4" fill="#354024"/>';
    return svg("0 -28 100 148",
      '<path d="M20 22h60l-8 84a6 6 0 0 1-6 5H34a6 6 0 0 1-6-5z" fill="#F5F0E8" fill-opacity=".65" stroke="#4C3D19" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M22.2 44h55.6L72.4 103a5 5 0 0 1-5 4.6H32.6a5 5 0 0 1-5-4.6z" fill="' + tone + '"/>' +
      '<rect x="34" y="50" width="16" height="16" rx="4" fill="#fff" fill-opacity=".5" transform="rotate(-12 42 58)"/>' +
      '<rect x="54" y="64" width="15" height="15" rx="4" fill="#fff" fill-opacity=".45" transform="rotate(14 61 71)"/>' +
      '<rect x="38" y="80" width="14" height="14" rx="4" fill="#fff" fill-opacity=".4" transform="rotate(-6 45 87)"/>' +
      logoLabel(33, 58, tone) +
      top +
      '<rect x="58" y="-26" width="6" height="50" rx="3" fill="#889063" transform="rotate(8 61 0)"/>');
  }

  // Simple food illustrations
  function foodIcon(item) {
    var s = '<g stroke="#4C3D19" stroke-width="3" stroke-linejoin="round">';
    if (item.icon === "croissant") {
      return svg("0 0 100 100", s +
        '<path d="M8 68C14 38 34 24 50 24s36 14 42 44c-8-4-14-4-20 2-6-8-14-10-22-10s-16 2-22 10c-6-6-12-6-20-2z" fill="#D9A55F"/></g>' +
        '<path d="M36 32l6 22M50 26v26M64 32l-6 22" stroke="#4C3D19" stroke-width="2.5" stroke-linecap="round" fill="none"/>');
    }
    if (item.icon === "cookie") {
      return svg("0 0 100 100", s + '<circle cx="50" cy="50" r="36" fill="#C99A5B"/></g>' +
        '<g fill="#4C3D19"><circle cx="38" cy="38" r="5"/><circle cx="60" cy="34" r="5"/><circle cx="66" cy="56" r="5"/><circle cx="44" cy="62" r="5"/><circle cx="30" cy="54" r="4"/><circle cx="54" cy="48" r="4"/></g>');
    }
    if (item.icon === "brownie") {
      return svg("0 0 100 100", s + '<rect x="14" y="26" width="72" height="52" rx="9" fill="#5A3A1E"/></g>' +
        '<rect x="14" y="26" width="72" height="16" rx="9" fill="#7A5230"/>' +
        '<path d="M30 54l10 6M58 50l12 8M44 68l8-4" stroke="#CFBB99" stroke-width="2.5" stroke-linecap="round" fill="none"/>');
    }
    if (item.icon === "roll") {
      return svg("0 0 100 100", s + '<circle cx="50" cy="50" r="38" fill="#D9A55F"/></g>' +
        '<path d="M50 50m-4 0a4 4 0 1 1 8 0a8 8 0 1 1 -16 0a12 12 0 1 1 24 0a16 16 0 1 1 -32 0a20 20 0 1 1 40 0" fill="none" stroke="#8A5A2B" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M26 34c10 6 18-6 28 0s16 4 22-4" fill="none" stroke="#F5F0E8" stroke-width="6" stroke-linecap="round"/>');
    }
    // cake slice: colors = [sponge, filling/frosting, topping]
    var c = item.colors;
    return svg("0 0 100 100", s +
      '<path d="M10 42h80v36a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8z" fill="' + c[0] + '"/>' +
      '<rect x="10" y="58" width="80" height="8" fill="' + c[1] + '" stroke="none"/></g>' +
      '<path d="M8 42c0-14 8-20 22-20h40c14 0 22 6 22 20-6 6-10-2-16 4-6-6-10 4-16-2-6 6-10-4-16 2-6-6-10 2-16-4z" fill="' + c[1] + '" stroke="#4C3D19" stroke-width="3" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="20" r="6" fill="' + c[2] + '" stroke="#4C3D19" stroke-width="2"/>');
  }

  // Picks the right illustration: sip-lid cup for hot, cold cup for iced and frappes
  function visualFor(item, kind, mode) {
    if (kind === "food") { return foodIcon(item); }
    return mode === "hot" ? hotCup(item.tone) : coldCup(item.tone, item.cold);
  }

  function cardHTML(cat, item, i) {
    var mode = item.temps ? item.temps[0] : "";
    var h = '<li class="card" data-cat="' + cat.id + '" data-i="' + i + '">' +
      '<div class="card__visual">' + visualFor(item, cat.kind, mode) + "</div>" +
      '<div class="card__body"><h4 class="card__name">' + item.name + "</h4>" +
      '<p class="card__desc">' + item.desc + "</p>";

    if (cat.kind === "drink") {
      if (item.temps.length > 1) {
        h += '<div class="temp" role="group" aria-label="Choose hot or iced for ' + item.name + '">' +
          '<button type="button" data-temp="hot" aria-pressed="true">Hot</button>' +
          '<button type="button" data-temp="iced" aria-pressed="false">Iced</button></div>';
      } else {
        h += '<span class="temp-only">' + (mode === "hot" ? "Served hot" : "Served cold") + "</span>";
      }
      h += '<ul class="prices" aria-label="Prices by size">';
      item.prices.forEach(function (p, n) {
        h += "<li><span>" + SIZE_NAMES[n] + "</span><strong>" + PESO + p + "</strong></li>";
      });
      h += "</ul>";
    } else {
      h += '<p class="price-one"><strong>' + PESO + item.price + "</strong> " + cat.unit + "</p>";
    }
    return h + "</div></li>";
  }

  // Turn an item name into a file name: "Café Latte" -> "cafe-latte", "Cookies & Cream Frappe" -> "cookies-and-cream-frappe"
  var USE_MENU_PHOTOS = true;   // set to false to always show the drawings
  function slugify(name) {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var root = document.getElementById("menu-root");

  function renderMenu() {
    var html = "";
    MENU.forEach(function (cat) {
      html += '<section class="menu-cat" id="cat-' + cat.id + '" aria-labelledby="h-' + cat.id + '">' +
        '<h3 id="h-' + cat.id + '">' + cat.title + "</h3>" +
        '<p class="menu-cat__blurb">' + cat.blurb + "</p>" +
        '<ul class="menu-grid">';
      cat.items.forEach(function (item, i) { html += cardHTML(cat, item, i); });
      html += "</ul></section>";
    });
    root.innerHTML = html;

    // PHOTOS: if a file named after the item exists in assets/menu/, it replaces the drawing.
    // Example: "Café Latte" -> assets/menu/cafe-latte.jpg. No file = the drawing stays (never a broken image).
    if (USE_MENU_PHOTOS) {
      MENU.forEach(function (cat) {
        cat.items.forEach(function (item, i) {
          var file = item.image || "assets/menu/" + slugify(item.name) + ".jpg";
          var test = new Image();
          test.onload = function () {
            var card = root.querySelector('[data-cat="' + cat.id + '"][data-i="' + i + '"]');
            var box = card.querySelector(".card__visual");
            box.innerHTML = '<img src="' + file + '" alt="' + item.name + ' in a Bean There cup" loading="lazy">';
            box.classList.add("is-photo");
            card.dataset.photo = "yes";
          };
          test.src = file;
        });
      });
    }
  }

  // Hot / Iced switch: swaps the cup picture
  root.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-temp]");
    if (!btn) { return; }
    var card = btn.closest(".card");
    var cat = MENU.filter(function (c) { return c.id === card.dataset.cat; })[0];
    var item = cat.items[card.dataset.i];
    card.querySelectorAll("[data-temp]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });
    if (!card.dataset.photo) {
      card.querySelector(".card__visual").innerHTML = visualFor(item, cat.kind, btn.dataset.temp);
    }
  });

  renderMenu();

  /* =====================================================
     3. Category bar, mobile menu, floor tabs
     ===================================================== */

  // Category bar: highlight the section you are reading and keep its button in view
  var catScroll = document.querySelector(".catnav__scroll");
  var catLinks = Array.prototype.slice.call(document.querySelectorAll("#catnav a"));
  function setActive(id) {
    catLinks.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.setAttribute("aria-current", String(on));
      if (on) {
        // scroll only the bar itself, never the page
        catScroll.scrollTo({ left: a.offsetLeft - (catScroll.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
      }
    });
  }
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { setActive(en.target.id); } });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".menu-cat").forEach(function (s) { spy.observe(s); });
  }

  // Mobile navigation button
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });

  // Floor tabs (ground floor / second floor)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); selectTab(tabs[(i + 1) % tabs.length]); }
      if (e.key === "ArrowLeft") { e.preventDefault(); selectTab(tabs[(i - 1 + tabs.length) % tabs.length]); }
    });
  });

  /* =====================================================
     4. Free pastry promo status (Philippine time)
     ===================================================== */
  var YEAR = 2026, MONTH = 10;           // November (months start at 0)
  var FIRST_DAY = 3, LAST_DAY = 30;      // Nov 3 to Nov 30
  var REDEEM_DOWS = [1, 3, 5];           // Mon, Wed, Fri
  var START_H = 13, START_M = 0;         // 1:00 PM
  var END_H = 15, END_M = 30;            // 3:30 PM
  var DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Build every redeem window as a start/end time
  var windows = [];
  for (var d = FIRST_DAY; d <= LAST_DAY; d++) {
    var dow = new Date(Date.UTC(YEAR, MONTH, d)).getUTCDay();
    if (REDEEM_DOWS.indexOf(dow) !== -1) {
      windows.push({ start: Date.UTC(YEAR, MONTH, d, START_H, START_M), end: Date.UTC(YEAR, MONTH, d, END_H, END_M) });
    }
  }

  // "Now" as Manila wall-clock time, so visitors anywhere see the right status
  function manilaNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila", hourCycle: "h23",
      year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"
    }).formatToParts(new Date());
    var p = {};
    parts.forEach(function (x) { p[x.type] = parseInt(x.value, 10); });
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  }
  function fmtDay(ts) {
    return new Date(ts).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
  }

  var el = {
    pill: document.getElementById("status-pill"), title: document.getElementById("status-title"),
    detail: document.getElementById("status-detail"), count: document.getElementById("countdown"),
    d: document.getElementById("cd-d"), h: document.getElementById("cd-h"),
    m: document.getElementById("cd-m"), s: document.getElementById("cd-s"),
    week: document.getElementById("week")
  };
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function setCountdown(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    el.d.textContent = Math.floor(total / 86400);
    el.h.textContent = pad(Math.floor((total % 86400) / 3600));
    el.m.textContent = pad(Math.floor((total % 3600) / 60));
    el.s.textContent = pad(total % 60);
  }
  function renderWeek(nowTs) {
    var today = new Date(nowTs).getUTCDay();
    el.week.innerHTML = "";
    [1, 2, 3, 4, 5, 6, 0].forEach(function (n) {
      var span = document.createElement("span");
      span.className = "day";
      span.setAttribute("role", "listitem");
      span.textContent = DAY_NAMES[n];
      if (REDEEM_DOWS.indexOf(n) !== -1) { span.classList.add("is-redeem"); span.title = "Free pastry day"; }
      if (n === today) { span.classList.add("is-today"); }
      el.week.appendChild(span);
    });
  }
  function update() {
    var now = manilaNow();
    var active = windows.filter(function (w) { return now >= w.start && now < w.end; })[0];
    var next = windows.filter(function (w) { return w.start > now; })[0];
    el.pill.classList.remove("is-open");
    if (active) {
      el.pill.classList.add("is-open");
      el.pill.textContent = "Open now";
      el.title.textContent = "Free pastry is on right now!";
      el.detail.textContent = "Order any drink and show our promo post at the counter. Time left today:";
      el.count.hidden = false;
      setCountdown(active.end - now);
    } else if (next) {
      var started = windows[0].start <= now;
      el.pill.textContent = started ? "Next redeem day" : "Starts soon";
      el.title.textContent = fmtDay(next.start) + ", 1:00 PM";
      el.detail.textContent = started ? "The next free pastry window opens in:" : "Our launch promo kicks off in:";
      el.count.hidden = false;
      setCountdown(next.start - now);
    } else {
      el.pill.textContent = "Promo ended";
      el.title.textContent = "Thanks for visiting us!";
      el.detail.textContent = "The launch promo ran until November 30, 2026. Follow us for what’s next.";
      el.count.hidden = true;
    }
    renderWeek(now);
  }
  update();
  setInterval(update, 1000);

  /* =====================================================
     5. Reminder form (demo only) + social links
     ===================================================== */
  var form = document.getElementById("notify");
  var nameInput = document.getElementById("name");
  var msg = document.getElementById("notify-msg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    if (!name) {
      nameInput.classList.add("invalid");
      msg.className = "notify__msg is-error";
      msg.textContent = "Please enter your name so we know who to save a seat for.";
      nameInput.focus();
      return;
    }
    nameInput.classList.remove("invalid");
    msg.className = "notify__msg";
    msg.textContent = "\u2713 Thanks, " + name + "! We saved you a seat on " + document.getElementById("day").value + ". See you from 1:00 to 3:30 PM.";
    msg.scrollIntoView({ block: "nearest", behavior: "smooth" });
    form.reset();
  });
  nameInput.addEventListener("input", function () { nameInput.classList.remove("invalid"); });

  // Paste your real page links between the quotes
  var SOCIALS = {
    facebook: "",   // e.g. "https://facebook.com/beanthere"
    instagram: ""   // e.g. "https://instagram.com/beanthere"
  };
  document.querySelectorAll("[data-social]").forEach(function (a) {
    var url = SOCIALS[a.dataset.social];
    if (url) { a.href = url; a.target = "_blank"; }
    else { a.addEventListener("click", function (e) { e.preventDefault(); }); }
  });
  // ===== Hero: falling beans (background only) =====
  (function () {
    var box = document.getElementById("beans");
    var nav = document.querySelector(".nav");
    if (nav) {
      var solid = function () { nav.classList.toggle("is-solid", window.scrollY > 40); };
      solid(); window.addEventListener("scroll", solid, { passive: true });
    }
    if (!box) { return; }

    // size = bean width in px at desktop, x = left %, blur = soft depth bean.
    // Big beans hug the edges; the middle (about 30% to 70%) stays clear for the logo.
    var DESKTOP = [
      { x: 1,  s: 150, blur: 0 }, { x: 8,  s: 96,  blur: 0 }, { x: 14, s: 190, blur: 7 },
      { x: 21, s: 70,  blur: 0 }, { x: 26, s: 120, blur: 3 }, { x: 74, s: 110, blur: 3 },
      { x: 79, s: 66,  blur: 0 }, { x: 85, s: 200, blur: 8 }, { x: 91, s: 100, blur: 0 },
      { x: 96, s: 160, blur: 0 }, { x: 4,  s: 56,  blur: 0 }, { x: 93, s: 54,  blur: 0 },
      { x: 11, s: 64,  blur: 0 }, { x: 17, s: 110, blur: 4 }, { x: 23, s: 48,  blur: 0 },
      { x: 28, s: 84,  blur: 2 }, { x: 33, s: 44,  blur: 0 }, { x: 67, s: 46,  blur: 0 },
      { x: 72, s: 90,  blur: 2 }, { x: 77, s: 130, blur: 5 }, { x: 82, s: 58,  blur: 0 },
      { x: 88, s: 76,  blur: 0 }, { x: 94, s: 120, blur: 4 }, { x: 98, s: 80,  blur: 0 },
      { x: -2, s: 110, blur: 3 }, { x: 6,  s: 170, blur: 6 }, { x: 19, s: 52,  blur: 0 },
      { x: 81, s: 150, blur: 6 }, { x: 89, s: 44,  blur: 0 }, { x: 3,  s: 88,  blur: 0 }
    ];
    // Phones: fewer, smaller beans pushed to the sides
    var MOBILE = [
      { x: -4, s: 74, blur: 0 }, { x: 4,  s: 46, blur: 0 }, { x: 10, s: 90, blur: 5 },
      { x: 84, s: 80, blur: 5 }, { x: 90, s: 50, blur: 0 }, { x: 96, s: 70, blur: 0 },
      { x: 0,  s: 56, blur: 0 }, { x: 14, s: 40, blur: 0 }, { x: 18, s: 64, blur: 4 },
      { x: 78, s: 42, blur: 0 }, { x: 88, s: 96, blur: 6 }, { x: 94, s: 44, blur: 0 }
    ];

    var mqMobile = window.matchMedia("(max-width: 860px)");
    var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }  // steady layout between visits

    function build() {
      seed = 7; box.innerHTML = "";
      var list = mqMobile.matches ? MOBILE : DESKTOP;
      var still = mqReduce.matches;
      box.classList.toggle("is-static", still);
      list.forEach(function (b, i) {
        var el = document.createElement("div");
        el.className = "bean" + (b.blur ? " bean--blur" : "");
        var big = b.s / 200;
        el.style.setProperty("--x", b.x + "%");
        el.style.setProperty("--s", b.s + "px");
        el.style.setProperty("--blur", b.blur + "px");
        el.style.setProperty("--o", b.blur ? ".85" : "1");
        el.style.setProperty("--fall", (26 + rnd() * 18 - big * 6).toFixed(1) + "s");   // big beans fall a bit faster (closer)
        el.style.setProperty("--delay", (-rnd() * 40).toFixed(1) + "s");
        el.style.setProperty("--spin", (14 + rnd() * 10).toFixed(1) + "s");
        el.style.setProperty("--r0", Math.round(rnd() * 360) + "deg");
        el.style.setProperty("--turn", Math.round(50 + rnd() * 70) * (rnd() > .5 ? 1 : -1) + "deg");
        el.style.setProperty("--drift", Math.round((rnd() - .5) * 60) + "px");
        el.style.setProperty("--y", Math.round(6 + rnd() * 78) + "vh");
        var img = new Image();
        img.src = "assets/beans/bean-" + ((i % 4) + 1) + (b.blur ? "-blur" : "") + ".png";
        img.alt = ""; img.width = 240; img.height = 347; img.decoding = "async";
        img.addEventListener("error", function () { el.remove(); });   // missing image: just skip it
        el.appendChild(img);
        box.appendChild(el);
      });
    }
    build();
    var onChange = function () { build(); };
    [mqMobile, mqReduce].forEach(function (m) {
      if (m.addEventListener) { m.addEventListener("change", onChange); } else if (m.addListener) { m.addListener(onChange); }
    });
    // Pause the animation when the hero is off screen (saves battery)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        box.style.visibility = en[0].isIntersecting ? "visible" : "hidden";
      }).observe(box.parentNode);
    }
    // Optional video: respect reduced motion
    var vid = document.querySelector(".hero__video");
    if (vid && mqReduce.matches) { vid.pause(); vid.removeAttribute("autoplay"); }
  })();

})();
