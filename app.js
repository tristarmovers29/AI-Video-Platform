/* =========================================================
   VYBE AI — AI VIDEO PLATFORM
   VERSION 1 FRONTEND
========================================================= */

"use strict";

/* =========================================================
   DEMO DATA
========================================================= */

const videos = [
  {
    id: 1,
    title: "The Future of AI Is Already Here",
    channel: "AI Labs",
    avatar: "A",
    category: "AI",
    views: "2.4M views",
    date: "2 days ago",
    duration: "12:42",
    description:
      "A look at how artificial intelligence is changing the way people work, create and build businesses.",
    thumbnail: "thumb-one",
    liked: false,
    subscribed: false
  },
  {
    id: 2,
    title: "Build a Business From Zero in 2026",
    channel: "Startup Hub",
    avatar: "S",
    category: "Business",
    views: "841K views",
    date: "5 days ago",
    duration: "18:24",
    description:
      "Practical ideas for building a modern online business from the ground up.",
    thumbnail: "thumb-two",
    liked: false,
    subscribed: false
  },
  {
    id: 3,
    title: "Pakistan's Most Beautiful Hidden Places",
    channel: "Explore PK",
    avatar: "E",
    category: "Travel",
    views: "529K views",
    date: "1 week ago",
    duration: "21:17",
    description:
      "Explore some of Pakistan's incredible destinations away from the usual tourist routes.",
    thumbnail: "thumb-three",
    liked: false,
    subscribed: false
  },
  {
    id: 4,
    title: "How Money Actually Works",
    channel: "Money Mind",
    avatar: "M",
    category: "Education",
    views: "1.1M views",
    date: "3 days ago",
    duration: "14:55",
    description:
      "A simple explanation of money, markets and how modern financial systems work.",
    thumbnail: "thumb-four",
    liked: false,
    subscribed: false
  },
  {
    id: 5,
    title: "10 AI Tools You Should Know",
    channel: "Tech Vision",
    avatar: "T",
    category: "Technology",
    views: "738K views",
    date: "4 days ago",
    duration: "10:08",
    description:
      "Ten useful artificial intelligence tools that can improve productivity and creativity.",
    thumbnail: "thumb-five",
    liked: false,
    subscribed: false
  },
  {
    id: 6,
    title: "Create Your Own AI Assistant",
    channel: "Code Factory",
    avatar: "C",
    category: "Technology",
    views: "394K views",
    date: "6 days ago",
    duration: "26:40",
    description:
      "Learn the core concepts behind building a useful AI assistant.",
    thumbnail: "thumb-six",
    liked: false,
    subscribed: false
  },
  {
    id: 7,
    title: "The New Era of Gaming",
    channel: "Game World",
    avatar: "G",
    category: "Gaming",
    views: "912K views",
    date: "1 day ago",
    duration: "16:33",
    description:
      "What the next generation of gaming could look like.",
    thumbnail: "thumb-seven",
    liked: false,
    subscribed: false
  },
  {
    id: 8,
    title: "How Successful People Think",
    channel: "Mindset Daily",
    avatar: "D",
    category: "Education",
    views: "1.7M views",
    date: "2 weeks ago",
    duration: "11:31",
    description:
      "A practical discussion about habits, decision-making and long-term thinking.",
    thumbnail: "thumb-eight",
    liked: false,
    subscribed: false
  },
  {
    id: 9,
    title: "AI Agents Explained Simply",
    channel: "AI Labs",
    avatar: "A",
    category: "AI",
    views: "623K views",
    date: "3 days ago",
    duration: "13:20",
    description:
      "Understand AI agents without complicated technical language.",
    thumbnail: "thumb-six",
    liked: false,
    subscribed: false
  },
  {
    id: 10,
    title: "The Future of Remote Work",
    channel: "Business Daily",
    avatar: "B",
    category: "Business",
    views: "284K views",
    date: "5 days ago",
    duration: "09:45",
    description:
      "How remote work and distributed companies are evolving.",
    thumbnail: "thumb-five",
    liked: false,
    subscribed: false
  },
  {
    id: 11,
    title: "Karachi After Dark",
    channel: "City Stories",
    avatar: "K",
    category: "Travel",
    views: "176K views",
    date: "1 week ago",
    duration: "08:19",
    description:
      "A cinematic look at Karachi after sunset.",
    thumbnail: "thumb-two",
    liked: false,
    subscribed: false
  },
  {
    id: 12,
    title: "Mastering Productivity",
    channel: "Better Life",
    avatar: "L",
    category: "Education",
    views: "492K views",
    date: "4 days ago",
    duration: "15:22",
    description:
      "Simple productivity principles that can improve your daily routine.",
    thumbnail: "thumb-one",
    liked: false,
    subscribed: false
  }
];

const shorts = [
  {
    id: 101,
    title: "AI in 30 seconds",
    views: "2.8M views",
    gradient: "short-gradient-1"
  },
  {
    id: 102,
    title: "One business idea",
    views: "1.4M views",
    gradient: "short-gradient-2"
  },
  {
    id: 103,
    title: "Amazing Pakistan",
    views: "927K views",
    gradient: "short-gradient-3"
  },
  {
    id: 104,
    title: "Tech you need to know",
    views: "812K views",
    gradient: "short-gradient-4"
  },
  {
    id: 105,
    title: "Think differently",
    views: "643K views",
    gradient: "short-gradient-5"
  },
  {
    id: 106,
    title: "Future technology",
    views: "511K views",
    gradient: "short-gradient-6"
  }
];

/* =========================================================
   STATE
========================================================= */

let currentVideo = null;
let currentCategory = "All";

let user = {
  loggedIn: false,
  name: "Guest",
  email: "",
  avatar: "G"
};

let comments = {};

/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  renderVideos(videos);
  renderShorts();
  setupNavigation();
  setupSearch();
  setupModals();
  setupUpload();
  setupWatchActions();
  setupNotifications();
  setupVoiceSearch();
  setupProfile();
  setupCategoryButtons();

});

/* =========================================================
   VIDEO CARD
========================================================= */

function createVideoCard(video) {

  return `
    <article
      class="video-card"
      data-video-id="${video.id}"
      onclick="openVideo(${video.id})"
    >

      <div class="thumbnail">

        <div class="thumbnail-bg ${video.thumbnail}">
          <div class="play-overlay">
            ▶
          </div>
        </div>

        <span class="duration">
          ${video.duration}
        </span>

      </div>

      <div class="video-info">

        <div class="channel-mini">
          ${escapeHTML(video.avatar)}
        </div>

        <div class="video-text">

          <h3 class="video-title">
            ${escapeHTML(video.title)}
          </h3>

          <div class="video-channel">
            ${escapeHTML(video.channel)}
          </div>

          <div class="video-meta">
            <span>${escapeHTML(video.views)}</span>
            <span>•</span>
            <span>${escapeHTML(video.date)}</span>
          </div>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   RENDER VIDEOS
========================================================= */

function renderVideos(list) {

  const grid = $("#videoGrid");

  if (!grid) {
    return;
  }

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty-state">
        <strong>No videos found</strong>
        <p>Try another search or category.</p>
      </div>
    `;

    return;
  }

  grid.innerHTML = list
    .map(createVideoCard)
    .join("");
}

/* =========================================================
   SHORTS
========================================================= */

function renderShorts() {

  const grid = $("#shortsGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML = shorts.map(short => {

    return `
      <article class="short-card">

        <div
          class="short-thumb ${short.gradient}"
          onclick="showToast('Shorts player will be connected soon.')"
        >

          <div class="short-play">
            ▶
          </div>

        </div>

        <div class="short-info">

          <div class="short-title">
            ${escapeHTML(short.title)}
          </div>

          <div class="short-views">
            ${escapeHTML(short.views)}
          </div>

        </div>

      </article>
    `;

  }).join("");
}

/* =========================================================
   OPEN VIDEO
========================================================= */

function openVideo(id) {

  const video = videos.find(item => item.id === Number(id));

  if (!video) {
    return;
  }

  currentVideo = video;

  $("#watchTitle").textContent = video.title;
  $("#watchViews").textContent = video.views;
  $("#watchDate").textContent = video.date;
  $("#watchChannel").textContent = video.channel;
  $("#watchAvatar").textContent = video.avatar;
  $("#watchDescription").textContent = video.description;

  renderRecommended(video.id);
  renderComments(video.id);

  showPage("watchPage");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   RECOMMENDED
========================================================= */

function renderRecommended(excludeId) {

  const container = $("#recommendedList");

  if (!container) {
    return;
  }

  const recommended = videos
    .filter(video => video.id !== excludeId)
    .slice(0, 6);

  container.innerHTML = recommended.map(video => {

    return `
      <div
        class="recommended-card"
        onclick="openVideo(${video.id})"
      >

        <div class="recommended-thumb ${video.thumbnail}"></div>

        <div class="recommended-info">

          <strong>
            ${escapeHTML(video.title)}
          </strong>

          <small>
            ${escapeHTML(video.channel)} • ${escapeHTML(video.views)}
          </small>

        </div>

      </div>
    `;

  }).join("");
}

/* =========================================================
   COMMENTS
========================================================= */

function renderComments(videoId) {

  const list = $("#commentsList");
  const count = $("#commentCount");

  if (!list || !count) {
    return;
  }

  const videoComments = comments[videoId] || [];

  count.textContent = videoComments.length;

  if (!videoComments.length) {

    list.innerHTML = `
      <div style="color:var(--muted);font-size:11px;padding:10px 0;">
        Be the first to comment.
      </div>
    `;

    return;
  }

  list.innerHTML = videoComments.map(comment => {

    return `
      <div class="comment">

        <div class="comment-avatar">
          ${escapeHTML(comment.avatar)}
        </div>

        <div class="comment-body">

          <strong>
            ${escapeHTML(comment.name)}
          </strong>

          <p>
            ${escapeHTML(comment.text)}
          </p>

        </div>

      </div>
    `;

  }).join("");
}

/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  $$(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.page;

      if (!page) {
        return;
      }

      if (page === "home") {
        showHome();
        closeSidebar();
        return;
      }

      if (page === "studio") {
        openUpload();
        closeSidebar();
        return;
      }

      openDynamicPage(page);

      closeSidebar();

    });

  });

  $$("[data-page-link]").forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.pageLink;

      openDynamicPage(page);

    });

  });

  $("#backHome")?.addEventListener("click", showHome);

  $("#watchBack")?.addEventListener("click", showHome);

  $("#exploreButton")?.addEventListener("click", () => {

    document.querySelector(".section-header")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

}

/* =========================================================
   SHOW HOME
========================================================= */

function showHome() {

  showPage("homePage");

  currentCategory = "All";

  $$(".category").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );

  });

  renderVideos(videos);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(pageId) {

  $$(".page").forEach(page => {

    page.classList.remove("active");

  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
  }

  updateNavigation(pageId);
}

/* =========================================================
   NAV ACTIVE STATE
========================================================= */

function updateNavigation(pageId) {

  $$(".nav-item").forEach(item => {

    item.classList.remove("active");

  });

  if (pageId === "homePage") {

    document
      .querySelector('[data-page="home"]')
      ?.classList.add("active");

  }

}

/* =========================================================
   DYNAMIC PAGES
========================================================= */

function openDynamicPage(page) {

  const title = $("#dynamicTitle");
  const subtitle = $("#dynamicSubtitle");
  const grid = $("#dynamicVideoGrid");

  let list = videos;

  if (page === "trending") {

    title.textContent = "Trending";
    subtitle.textContent = "The videos everyone is watching";

    list = videos;

  } else if (page === "shorts") {

    title.textContent = "Shorts";
    subtitle.textContent = "Quick videos. Big ideas.";

    showPage("dynamicPage");

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
        gap:15px;
      ">
        ${shorts.map(short => `
          <div class="short-card">

            <div
              class="short-thumb ${short.gradient}"
              onclick="showToast('Short player will be connected soon.')"
            >
              <div class="short-play">▶</div>
            </div>

            <div class="short-info">
              <div class="short-title">
                ${escapeHTML(short.title)}
              </div>

              <div class="short-views">
                ${escapeHTML(short.views)}
              </div>
            </div>

          </div>
        `).join("")}
      </div>
    `;

    return;

  } else if (page === "subscriptions") {

    title.textContent = "Subscriptions";
    subtitle.textContent = "Latest videos from channels you follow";

    list = videos.slice(0, 6);

  } else if (page === "history") {

    title.textContent = "History";
    subtitle.textContent = "Videos you recently watched";

    list = videos.slice(0, 5);

  } else if (page === "watchlater") {

    title.textContent = "Watch later";
    subtitle.textContent = "Videos saved for later";

    list = videos.slice(2, 7);

  } else if (page === "liked") {

    title.textContent = "Liked videos";
    subtitle.textContent = "Videos you liked";

    list = videos.filter(video => video.liked);

  }

  grid.innerHTML = list.length
    ? list.map(createVideoCard).join("")
    : `
      <div style="
        grid-column:1/-1;
        padding:70px 20px;
        text-align:center;
        color:var(--muted);
      ">
        <div style="font-size:35px;margin-bottom:12px;">♡</div>
        <strong style="color:white;">Nothing here yet</strong>
        <p style="margin-top:5px;">Your activity will appear here.</p>
      </div>
    `;

  showPage("dynamicPage");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const input = $("#searchInput");
  const button = $("#searchButton");
  const clear = $("#clearSearch");

  function performSearch() {

    const query = input.value
      .trim()
      .toLowerCase();

    if (!query) {

      showHome();

      clear.style.display = "none";

      return;

    }

    const results = videos.filter(video => {

      return (
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );

    });

    $("#dynamicTitle").textContent =
      `Search results for "${input.value.trim()}"`;

    $("#dynamicSubtitle").textContent =
      `${results.length} video${results.length === 1 ? "" : "s"} found`;

    $("#dynamicVideoGrid").innerHTML = results.length
      ? results.map(createVideoCard).join("")
      : `
        <div style="
          grid-column:1/-1;
          padding:70px 20px;
          text-align:center;
          color:var(--muted);
        ">
          <div style="font-size:35px;margin-bottom:12px;">⌕</div>
          <strong style="color:white;">No videos found</strong>
          <p style="margin-top:5px;">
            Try searching for something else.
          </p>
        </div>
      `;

    showPage("dynamicPage");

    clear.style.display = "block";

  }

  button?.addEventListener("click", performSearch);

  input?.addEventListener("keydown", event => {

    if (event.key === "Enter") {
      performSearch();
    }

  });

  input?.addEventListener("input", () => {

    clear.style.display =
      input.value ? "block" : "none";

  });

  clear?.addEventListener("click", () => {

    input.value = "";

    clear.style.display = "none";

    showHome();

    input.focus();

  });

}

/* =========================================================
   CATEGORIES
========================================================= */

function setupCategoryButtons() {

  $$(".category").forEach(button => {

    button.addEventListener("click", () => {

      $$(".category").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const category = button.dataset.category;

      currentCategory = category;

      if (category === "All") {

        renderVideos(videos);

        return;

      }

      const filtered = videos.filter(video =>
        video.category === category
      );

      renderVideos(filtered);

      document.querySelector("#videoGrid")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    });

  });

}

/* =========================================================
   MODALS
========================================================= */

function setupModals() {

  $$(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal(modal.id);
      }

    });

  });

  $$("[data-close-modal]").forEach(button => {

    button.addEventListener("click", () => {

      closeModal(button.dataset.closeModal);

    });

  });

}

/* =========================================================
   OPEN / CLOSE MODAL
========================================================= */

function openModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("show");
  }

}

function closeModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }

}

/* =========================================================
   UPLOAD
========================================================= */

function setupUpload() {

  $("#uploadButton")?.addEventListener("click", openUpload);

  $("#heroUpload")?.addEventListener("click", openUpload);

  $("#creatorUpload")?.addEventListener("click", openUpload);

  $("#sidebarUpload")?.addEventListener("click", openUpload);

  $("#videoFile")?.addEventListener("change", event => {

    const file = event.target.files[0];

    const selected = $("#selectedFile");

    if (!file) {

      selected.textContent = "";

      return;

    }

    selected.textContent =
      `Selected: ${file.name} (${formatFileSize(file.size)})`;

  });

  $("#publishButton")?.addEventListener("click", publishDemoVideo);

}

/* =========================================================
   OPEN UPLOAD
========================================================= */

function openUpload() {

  if (!user.loggedIn) {

    showToast("Please sign in before uploading.");

    openModal("loginModal");

    return;

  }

  openModal("uploadModal");

}

/* =========================================================
   PUBLISH DEMO VIDEO
========================================================= */

function publishDemoVideo() {

  const file = $("#videoFile")?.files[0];
  const title = $("#uploadTitle").value.trim();
  const description = $("#uploadDescription").value.trim();
  const category = $("#uploadCategory").value;

  if (!file) {

    showToast("Please choose a video file.");

    return;

  }

  if (!title) {

    showToast("Please enter a video title.");

    $("#uploadTitle").focus();

    return;

  }

  const newVideo = {

    id: Date.now(),

    title,

    channel: user.name || "Your Channel",

    avatar: user.avatar || "G",

    category,

    views: "0 views",

    date: "Just now",

    duration: "00:00",

    description:
      description ||
      "A new video published on VYBE AI.",

    thumbnail: "thumb-one",

    liked: false,

    subscribed: false

  };

  videos.unshift(newVideo);

  closeModal("uploadModal");

  $("#videoFile").value = "";
  $("#uploadTitle").value = "";
  $("#uploadDescription").value = "";

  $("#selectedFile").textContent = "";

  renderVideos(videos);

  showHome();

  showToast(
    "Video added to your channel. Cloud publishing comes next."
  );

}

/* =========================================================
   WATCH ACTIONS
========================================================= */

function setupWatchActions() {

  $("#watchLike")?.addEventListener("click", () => {

    if (!currentVideo) {
      return;
    }

    currentVideo.liked = !currentVideo.liked;

    const button = $("#watchLike");

    if (currentVideo.liked) {

      button.innerHTML = "♥ <span>Liked</span>";

      showToast("Added to liked videos.");

    } else {

      button.innerHTML = "♡ <span>Like</span>";

    }

  });

  $("#watchSubscribe")?.addEventListener("click", () => {

    if (!currentVideo) {
      return;
    }

    currentVideo.subscribed =
      !currentVideo.subscribed;

    const button = $("#watchSubscribe");

    if (currentVideo.subscribed) {

      button.textContent = "Subscribed";

      button.classList.add("subscribed");

      showToast(
        `Subscribed to ${currentVideo.channel}`
      );

    } else {

      button.textContent = "Subscribe";

      button.classList.remove("subscribed");

    }

  });

  $("#commentButton")?.addEventListener("click", addComment);

  $("#commentInput")?.addEventListener("keydown", event => {

    if (event.key === "Enter") {
      addComment();
    }

  });

}

/* =========================================================
   ADD COMMENT
========================================================= */

function addComment() {

  if (!currentVideo) {
    return;
  }

  const input = $("#commentInput");

  const text = input.value.trim();

  if (!text) {
    return;
  }

  if (!comments[currentVideo.id]) {
    comments[currentVideo.id] = [];
  }

  comments[currentVideo.id].push({

    name: user.name || "Guest",
    avatar: user.avatar || "G",
    text

  });

  input.value = "";

  renderComments(currentVideo.id);

  showToast("Comment added.");

}

/* =========================================================
   LOGIN
========================================================= */

function setupProfile() {

  $("#profileButton")?.addEventListener("click", () => {

    if (user.loggedIn) {

      openChannel();

    } else {

      openModal("loginModal");

    }

  });

  $("#loginButton")?.addEventListener("click", loginDemo);

  $("#signupSwitch")?.addEventListener("click", () => {

    showToast(
      "Signup will be connected to the database in the next stage."
    );

  });

}

/* =========================================================
   DEMO LOGIN
========================================================= */

function loginDemo() {

  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;

  if (!email) {

    showToast("Please enter your email.");

    return;

  }

  if (!password) {

    showToast("Please enter your password.");

    return;

  }

  const namePart =
    email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .trim();

  user.loggedIn = true;

  user.email = email;

  user.name =
    namePart
      ? capitalizeWords(namePart)
      : "Creator";

  user.avatar =
    user.name.charAt(0).toUpperCase();

  $("#profileAvatar").textContent =
    user.avatar;

  closeModal("loginModal");

  showToast(
    `Welcome, ${user.name}!`
  );

}

/* =========================================================
   CHANNEL
========================================================= */

function openChannel() {

  $("#channelName").textContent =
    user.name || "Your Channel";

  $("#channelHandle").textContent =
    "@" +
    (user.name || "yourchannel")
      .toLowerCase()
      .replace(/\s+/g, "");

  $("#channelAvatar").textContent =
    user.avatar || "G";

  const userVideos = videos.filter(video =>
    video.channel === user.name
  );

  $("#channelVideoGrid").innerHTML =
    userVideos.length
      ? userVideos.map(createVideoCard).join("")
      : `
        <div style="
          grid-column:1/-1;
          padding:60px 20px;
          text-align:center;
          color:var(--muted);
        ">
          <strong style="color:white;">
            Your channel is ready.
          </strong>

          <p style="margin-top:6px;">
            Upload your first video.
          </p>

          <button
            class="primary-button"
            style="margin-top:16px;"
            onclick="openUpload()"
          >
            Upload video
          </button>
        </div>
      `;

  showPage("channelPage");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function setupNotifications() {

  $("#notificationButton")?.addEventListener("click", () => {

    $("#notificationPanel")
      .classList.toggle("show");

  });

  $("#closeNotifications")?.addEventListener("click", () => {

    $("#notificationPanel")
      .classList.remove("show");

  });

  document.addEventListener("click", event => {

    const panel = $("#notificationPanel");

    const button = $("#notificationButton");

    if (
      panel &&
      panel.classList.contains("show") &&
      !panel.contains(event.target) &&
      !button.contains(event.target)
    ) {

      panel.classList.remove("show");

    }

  });

}

/* =========================================================
   VOICE SEARCH
========================================================= */

function setupVoiceSearch() {

  const button = $("#voiceSearch");

  if (!button) {
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    button.addEventListener("click", () => {

      showToast(
        "Voice search is not supported in this browser."
      );

    });

    return;

  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  button.addEventListener("click", () => {

    try {

      recognition.start();

      showToast("Listening...");

    } catch (error) {

      showToast("Voice search is already active.");

    }

  });

  recognition.onresult = event => {

    const transcript =
      event.results[0][0].transcript;

    $("#searchInput").value = transcript;

    $("#searchButton").click();

  };

  recognition.onerror = () => {

    showToast("Voice search could not be completed.");

  };

}

/* =========================================================
   SIDEBAR MOBILE
========================================================= */

$("#menuButton")?.addEventListener("click", () => {

  $("#sidebar")?.classList.add("open");

  $("#mobileOverlay")?.classList.add("show");

});

$("#closeSidebar")?.addEventListener(
  "click",
  closeSidebar
);

$("#mobileOverlay")?.addEventListener(
  "click",
  closeSidebar
);

function closeSidebar() {

  $("#sidebar")?.classList.remove("open");

  $("#mobileOverlay")?.classList.remove("show");

}

/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

  const toast = $("#toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}

/* =========================================================
   HELPERS
========================================================= */

function formatFileSize(bytes) {

  if (!bytes) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];

  const index =
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

  return (
    parseFloat(
      (bytes / Math.pow(1024, index))
        .toFixed(2)
    ) +
    " " +
    units[index]
  );

}

function capitalizeWords(text) {

  return text
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");

}

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* =========================================================
   GLOBAL HELPERS
========================================================= */

window.openVideo = openVideo;
window.openUpload = openUpload;
window.showHome = showHome;
window.showToast = showToast;
window.closeModal = closeModal;
window.openChannel = openChannel;
