/* ==========================================
   VYBE AI
   Main Application
========================================== */

const SUPABASE_URL =
  window.SUPABASE_URL ||
  "https://wnhnjbrrszmybvxgtbin.supabase.co";

const SUPABASE_ANON_KEY =
  window.SUPABASE_ANON_KEY ||
  "sb_publishable_E0HAjFvs98-9lmEJtBzSzw_6ZYpXaAw";

let supabaseClient = null;

try {
  if (
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_ANON_KEY
  ) {
    supabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );
  }
} catch (error) {
  console.error(
    "Supabase initialization error:",
    error
  );
}


/* ==========================================
   DEMO VIDEOS
========================================== */

let videos = [

  {
    id: 1,
    title: "Welcome to VYBE AI",
    channel: "VYBE AI",
    views: "12K views",
    date: "2 days ago",
    category: "Entertainment",
    duration: "04:32",
    description:
      "Welcome to VYBE AI — a new generation video platform.",
    icon: "🎬",
    likes: 1200,
    subscribers: "12K",
    videoUrl: ""
  },

  {
    id: 2,
    title: "Future of Artificial Intelligence",
    channel: "Tech Vision",
    views: "24K views",
    date: "1 week ago",
    category: "Education",
    duration: "08:15",
    description:
      "Exploring the future of artificial intelligence.",
    icon: "🤖",
    likes: 2400,
    subscribers: "45K",
    videoUrl: ""
  },

  {
    id: 3,
    title: "Amazing Music Experience",
    channel: "VYBE Music",
    views: "56K views",
    date: "3 days ago",
    category: "Music",
    duration: "05:20",
    description:
      "Enjoy an amazing music experience.",
    icon: "🎵",
    likes: 5600,
    subscribers: "85K",
    videoUrl: ""
  },

  {
    id: 4,
    title: "Gaming World",
    channel: "Game Zone",
    views: "89K views",
    date: "5 days ago",
    category: "Gaming",
    duration: "12:44",
    description:
      "Latest gaming content and entertainment.",
    icon: "🎮",
    likes: 8900,
    subscribers: "120K",
    videoUrl: ""
  },

  {
    id: 5,
    title: "Latest News Update",
    channel: "VYBE News",
    views: "35K views",
    date: "Today",
    category: "News",
    duration: "06:18",
    description:
      "Latest news and important updates.",
    icon: "📰",
    likes: 3500,
    subscribers: "70K",
    videoUrl: ""
  },

  {
    id: 6,
    title: "Learn Something New",
    channel: "Learn Daily",
    views: "18K views",
    date: "4 days ago",
    category: "Education",
    duration: "10:21",
    description:
      "Learn useful things every day.",
    icon: "🎓",
    likes: 1800,
    subscribers: "32K",
    videoUrl: ""
  },

  {
    id: 7,
    title: "Entertainment Tonight",
    channel: "VYBE Entertainment",
    views: "44K views",
    date: "1 day ago",
    category: "Entertainment",
    duration: "07:55",
    description:
      "Entertainment highlights from VYBE AI.",
    icon: "✨",
    likes: 4400,
    subscribers: "91K",
    videoUrl: ""
  },

  {
    id: 8,
    title: "Digital Future",
    channel: "Future Lab",
    views: "31K views",
    date: "6 days ago",
    category: "Education",
    duration: "09:10",
    description:
      "Understanding the digital future.",
    icon: "🌐",
    likes: 3100,
    subscribers: "50K",
    videoUrl: ""
  }

];


/* ==========================================
   SHORTS
========================================== */

let shorts = [

  {
    id: 101,
    title: "Amazing Moment",
    channel: "VYBE AI",
    icon: "✨",
    videoUrl: ""
  },

  {
    id: 102,
    title: "Quick Tech Tip",
    channel: "Tech Vision",
    icon: "💡",
    videoUrl: ""
  },

  {
    id: 103,
    title: "Music VYBE",
    channel: "VYBE Music",
    icon: "🎵",
    videoUrl: ""
  },

  {
    id: 104,
    title: "Gaming Moment",
    channel: "Game Zone",
    icon: "🎮",
    videoUrl: ""
  },

  {
    id: 105,
    title: "Daily News",
    channel: "VYBE News",
    icon: "📰",
    videoUrl: ""
  },

  {
    id: 106,
    title: "Learn Fast",
    channel: "Learn Daily",
    icon: "🎓",
    videoUrl: ""
  }

];


/* ==========================================
   STATE
========================================== */

let likedVideos =
  JSON.parse(
    localStorage.getItem("vybe_liked_videos") || "[]"
  );

let savedVideos =
  JSON.parse(
    localStorage.getItem("vybe_saved_videos") || "[]"
  );

let watchHistory =
  JSON.parse(
    localStorage.getItem("vybe_history") || "[]"
  );

let subscriptions =
  JSON.parse(
    localStorage.getItem("vybe_subscriptions") || "[]"
  );

let comments =
  JSON.parse(
    localStorage.getItem("vybe_comments") || "{}"
  );

let currentVideoId = null;
let currentCategory = "All";


/* ==========================================
   DOM READY
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderVideos();
    renderShorts();

    setupNavigation();
    setupCategories();
    setupSearch();
    setupUpload();
    setupLogin();
    setupNotifications();
    setupMobileMenu();
    setupWatchActions();
    setupBackButton();
    setupLogo();
    setupHeroButtons();

    renderSubscriptions();
    renderHistory();
    renderSaved();

    checkSupabaseConnection();

  }
);


/* ==========================================
   HELPERS
========================================== */

function saveState() {

  localStorage.setItem(
    "vybe_liked_videos",
    JSON.stringify(likedVideos)
  );

  localStorage.setItem(
    "vybe_saved_videos",
    JSON.stringify(savedVideos)
  );

  localStorage.setItem(
    "vybe_history",
    JSON.stringify(watchHistory)
  );

  localStorage.setItem(
    "vybe_subscriptions",
    JSON.stringify(subscriptions)
  );

  localStorage.setItem(
    "vybe_comments",
    JSON.stringify(comments)
  );
}


function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(
      function () {
        toast.classList.remove("show");
      },
      2500
    );
}


/* ==========================================
   YOUTUBE
========================================== */

function getYouTubeId(url) {

  if (!url) return null;

  try {

    const parsed =
      new URL(url);

    const host =
      parsed.hostname.toLowerCase();

    if (
      host.includes("youtube.com") ||
      host.includes("youtube-nocookie.com")
    ) {

      if (
        parsed.pathname === "/watch"
      ) {
        return parsed.searchParams.get("v");
      }

      const parts =
        parsed.pathname
          .split("/")
          .filter(Boolean);

      if (
        parts[0] === "embed" &&
        parts[1]
      ) {
        return parts[1];
      }

      if (
        parts[0] === "shorts" &&
        parts[1]
      ) {
        return parts[1];
      }
    }

    if (
      host === "youtu.be" &&
      parsed.pathname
    ) {

      return parsed.pathname
        .replace("/", "")
        .split("/")[0];

    }

  } catch (error) {

    console.warn(
      "Invalid YouTube URL:",
      url
    );

  }

  return null;
}


function getYouTubeThumbnail(url) {

  const id =
    getYouTubeId(url);

  if (!id) return "";

  return (
    "https://img.youtube.com/vi/" +
    id +
    "/hqdefault.jpg"
  );
}


/* ==========================================
   DIRECT VIDEO
========================================== */

function isDirectVideoUrl(url) {

  if (!url) return false;

  const lower =
    url.toLowerCase();

  return (
    lower.includes(".mp4") ||
    lower.includes(".webm") ||
    lower.includes(".ogg") ||
    lower.includes(".mov") ||
    lower.includes(".m4v")
  );
}


/* ==========================================
   VIDEO CARD
========================================== */

function createVideoCard(video) {

  const card =
    document.createElement("article");

  card.className = "video-card";

  let thumbnailHTML = "";

  const youtubeId =
    getYouTubeId(video.videoUrl);

  if (youtubeId) {

    thumbnailHTML = `
      <img
        src="https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg"
        alt="${escapeHTML(video.title)}"
        loading="lazy"
      >
    `;

  } else {

    thumbnailHTML = `
      <div class="thumbnail-gradient">
        ${video.icon || "🎬"}
      </div>
    `;

  }

  card.innerHTML = `

    <div class="thumbnail">

      ${thumbnailHTML}

      <span class="duration">
        ${escapeHTML(video.duration || "00:00")}
      </span>

    </div>

    <div class="video-info">

      <div class="mini-avatar">
        ${getInitial(video.channel)}
      </div>

      <div>

        <div class="video-title">
          ${escapeHTML(video.title)}
        </div>

        <div class="video-channel">
          ${escapeHTML(video.channel)}
        </div>

        <div class="video-meta">
          ${escapeHTML(video.views || "0 views")}
          •
          ${escapeHTML(video.date || "Just now")}
        </div>

      </div>

    </div>

  `;

  card.addEventListener(
    "click",
    function () {
      openVideo(video.id);
    }
  );

  return card;
}


function renderVideos(
  category = currentCategory
) {

  const grid =
    document.getElementById("videoGrid");

  if (!grid) return;

  grid.innerHTML = "";

  let list = [...videos];

  if (
    category &&
    category !== "All"
  ) {

    list =
      list.filter(
        video =>
          video.category === category
      );

  }

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found.
      </div>
    `;

    return;
  }

  list.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );
}


/* ==========================================
   SHORT CARDS
========================================== */

function createShortCard(short) {

  const card =
    document.createElement("article");

  card.className = "short-card";

  let thumb = "";

  const youtubeId =
    getYouTubeId(short.videoUrl);

  if (youtubeId) {

    thumb = `
      <img
        src="https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg"
        alt="${escapeHTML(short.title)}"
        loading="lazy"
      >
    `;

  } else {

    thumb = `
      <span>
        ${short.icon || "▶"}
      </span>
    `;

  }

  card.innerHTML = `

    <div class="short-thumb">
      ${thumb}
    </div>

    <div class="short-title">
      ${escapeHTML(short.title)}
    </div>

  `;

  if (short.videoUrl) {

    card.addEventListener(
      "click",
      function () {

        const video =
          findVideoByUrl(
            short.videoUrl
          );

        if (video) {
          openVideo(video.id);
        } else {

          openExternalVideo(
            short.videoUrl,
            short.title
          );

        }

      }
    );

  }

  return card;
}


function renderShorts() {

  const grid =
    document.getElementById(
      "shortsGrid"
    );

  const pageGrid =
    document.getElementById(
      "shortsPageGrid"
    );

  if (grid) {

    grid.innerHTML = "";

    shorts.forEach(
      short =>
        grid.appendChild(
          createShortCard(short)
        )
    );

  }

  if (pageGrid) {

    pageGrid.innerHTML = "";

    shorts.forEach(
      short =>
        pageGrid.appendChild(
          createShortCard(short)
        )
    );

  }

}


/* ==========================================
   NAVIGATION
========================================== */

function getPages() {

  return {

    home:
      document.getElementById("homePage"),

    shorts:
      document.getElementById("shortsPage"),

    subscriptions:
      document.getElementById(
        "subscriptionsPage"
      ),

    history:
      document.getElementById(
        "historyPage"
      ),

    saved:
      document.getElementById(
        "savedPage"
      ),

    search:
      document.getElementById(
        "searchPage"
      ),

    watch:
      document.getElementById(
        "watchPage"
      )

  };

}


function showPage(pageName) {

  const pages =
    getPages();

  Object.keys(pages)
    .forEach(
      key => {

        if (!pages[key]) return;

        pages[key].style.display =
          key === pageName
            ? ""
            : "none";

      }
    );

  document
    .querySelectorAll(".nav-item")
    .forEach(
      item => {

        item.classList.remove(
          "active"
        );

        if (
          item.dataset.page ===
          pageName
        ) {
          item.classList.add(
            "active"
          );
        }

      }
    );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function setupNavigation() {

  document
    .querySelectorAll(
      ".nav-item[data-page]"
    )
    .forEach(
      item => {

        item.addEventListener(
          "click",
          function () {

            showPage(
              item.dataset.page
            );

            closeMobileMenu();

            if (
              item.dataset.page ===
              "subscriptions"
            ) {
              renderSubscriptions();
            }

            if (
              item.dataset.page ===
              "history"
            ) {
              renderHistory();
            }

            if (
              item.dataset.page ===
              "saved"
            ) {
              renderSaved();
            }

          }
        );

      }
    );

  document
    .querySelectorAll(
      ".back-btn[data-page]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {
            showPage(
              button.dataset.page
            );
          }
        );

      }
    );

  const viewAll =
    document.getElementById(
      "viewAllVideos"
    );

  if (viewAll) {

    viewAll.addEventListener(
      "click",
      function () {

        currentCategory = "All";

        setActiveCategory("All");

        renderVideos();

        showPage("home");

      }
    );

  }

  const viewAllShorts =
    document.getElementById(
      "viewAllShorts"
    );

  if (viewAllShorts) {

    viewAllShorts.addEventListener(
      "click",
      function () {

        showPage("shorts");

      }
    );

  }

}


/* ==========================================
   CATEGORIES
========================================== */

function setupCategories() {

  document
    .querySelectorAll(
      ".category"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            const category =
              button.dataset.category ||
              "All";

            currentCategory =
              category;

            setActiveCategory(
              category
            );

            renderVideos(
              category
            );

            showPage("home");

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".nav-item[data-category]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            const category =
              button.dataset.category;

            currentCategory =
              category;

            setActiveCategory(
              category
            );

            renderVideos(
              category
            );

            showPage("home");

            closeMobileMenu();

          }
        );

      }
    );

}


function setActiveCategory(
  category
) {

  document
    .querySelectorAll(
      ".category"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.category ===
            category
        );

      }
    );

}


/* ==========================================
   SEARCH
========================================== */

function setupSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );

  const button =
    document.getElementById(
      "searchBtn"
    );

  if (!input || !button) return;

  function doSearch() {

    const query =
      input.value.trim();

    if (!query) {

      showToast(
        "Please enter a search."
      );

      return;

    }

    const results =
      videos.filter(
        video => {

          const text =
            (
              video.title +
              " " +
              video.channel +
              " " +
              video.category +
              " " +
              video.description
            ).toLowerCase();

          return text.includes(
            query.toLowerCase()
          );

        }
      );

    renderSearchResults(
      results,
      query
    );

    showPage("search");

  }

  button.addEventListener(
    "click",
    doSearch
  );

  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {
        doSearch();
      }

    }
  );

}


function renderSearchResults(
  results,
  query
) {

  const grid =
    document.getElementById(
      "searchGrid"
    );

  const text =
    document.getElementById(
      "searchResultText"
    );

  if (!grid) return;

  grid.innerHTML = "";

  if (text) {

    text.textContent =
      `${results.length} result(s) for "${query}"`;

  }

  if (!results.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found for "${escapeHTML(query)}".
      </div>
    `;

    return;
  }

  results.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );

}


/* ==========================================
   WATCH
========================================== */

function openVideo(id) {

  const video =
    videos.find(
      item =>
        String(item.id) ===
        String(id)
    );

  if (!video) {

    showToast(
      "Video not found."
    );

    return;

  }

  currentVideoId =
    video.id;

  showPage("watch");

  updateWatchInfo(video);

  loadVideoPlayer(video);

  addToHistory(video.id);

  renderComments(video.id);

  renderRecommended(video.id);

  updateWatchButtons(video);

}


function updateWatchInfo(video) {

  const title =
    document.getElementById(
      "watchTitle"
    );

  const views =
    document.getElementById(
      "watchViews"
    );

  const date =
    document.getElementById(
      "watchDate"
    );

  const channel =
    document.getElementById(
      "watchChannel"
    );

  const subscribers =
    document.getElementById(
      "watchSubscribers"
    );

  const description =
    document.getElementById(
      "watchDescription"
    );

  const avatar =
    document.getElementById(
      "watchChannelAvatar"
    );

  if (title) {
    title.textContent =
      video.title;
  }

  if (views) {
    views.textContent =
      video.views || "0 views";
  }

  if (date) {
    date.textContent =
      video.date || "Just now";
  }

  if (channel) {
    channel.textContent =
      video.channel || "You";
  }

  if (subscribers) {
    subscribers.textContent =
      `${video.subscribers || "0"} subscribers`;
  }

  if (description) {
    description.textContent =
      video.description ||
      "No description.";
  }

  if (avatar) {
    avatar.textContent =
      getInitial(
        video.channel
      );
  }

}


function loadVideoPlayer(video) {

  const mainVideo =
    document.getElementById(
      "mainVideo"
    );

  const youtubePlayer =
    document.getElementById(
      "youtubePlayer"
    );

  const placeholder =
    document.getElementById(
      "playerPlaceholder"
    );

  if (
    !mainVideo ||
    !youtubePlayer ||
    !placeholder
  ) {
    return;
  }


  /* RESET */

  try {
    mainVideo.pause();
  } catch (error) {}

  mainVideo.removeAttribute(
    "src"
  );

  mainVideo.load();

  mainVideo.style.display =
    "none";

  youtubePlayer.style.display =
    "none";

  youtubePlayer.innerHTML =
    "";

  placeholder.style.display =
    "grid";


  /* YOUTUBE */

  const youtubeId =
    getYouTubeId(
      video.videoUrl
    );

  if (youtubeId) {

    const iframe =
      document.createElement(
        "iframe"
      );

    iframe.src =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(
        youtubeId
      ) +
      "?rel=0&modestbranding=1";

    iframe.title =
      video.title || "VYBE AI Video";

    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen =
      true;

    iframe.referrerPolicy =
      "strict-origin-when-cross-origin";

    youtubePlayer.appendChild(
      iframe
    );

    youtubePlayer.style.display =
      "block";

    placeholder.style.display =
      "none";

    return;
  }


  /* DIRECT VIDEO */

  if (
    isDirectVideoUrl(
      video.videoUrl
    )
  ) {

    mainVideo.src =
      video.videoUrl;

    mainVideo.style.display =
      "block";

    placeholder.style.display =
      "none";

    return;
  }


  /* NO VIDEO URL */

  placeholder.innerHTML = `
    <div class="play-big">
      ▶
    </div>

    <p>
      Video URL is not available.
    </p>
  `;

}


/* ==========================================
   LIKE / SAVE / SHARE / SUBSCRIBE
========================================== */

function setupWatchActions() {

  const likeBtn =
    document.getElementById(
      "likeBtn"
    );

  const saveBtn =
    document.getElementById(
      "saveBtn"
    );

  const shareBtn =
    document.getElementById(
      "shareBtn"
    );

  const subscribeBtn =
    document.getElementById(
      "subscribeBtn"
    );

  const commentBtn =
    document.getElementById(
      "commentBtn"
    );


  if (likeBtn) {

    likeBtn.addEventListener(
      "click",
      function () {

        if (
          currentVideoId === null
        ) return;

        toggleLike(
          currentVideoId
        );

      }
    );

  }


  if (saveBtn) {

    saveBtn.addEventListener(
      "click",
      function () {

        if (
          currentVideoId === null
        ) return;

        toggleSave(
          currentVideoId
        );

      }
    );

  }


  if (shareBtn) {

    shareBtn.addEventListener(
      "click",
      shareCurrentVideo
    );

  }


  if (subscribeBtn) {

    subscribeBtn.addEventListener(
      "click",
      toggleSubscription
    );

  }


  if (commentBtn) {

    commentBtn.addEventListener(
      "click",
      addComment
    );

  }

}


function toggleLike(id) {

  if (
    likedVideos.includes(id)
  ) {

    likedVideos =
      likedVideos.filter(
        item => item !== id
      );

    showToast(
      "Removed from liked videos."
    );

  } else {

    likedVideos.push(id);

    showToast(
      "Video liked."
    );

  }

  saveState();

  if (
    currentVideoId !== null
  ) {

    updateWatchButtons(
      findVideo(currentVideoId)
    );

  }

}


function toggleSave(id) {

  if (
    savedVideos.includes(id)
  ) {

    savedVideos =
      savedVideos.filter(
        item => item !== id
      );

    showToast(
      "Removed from saved videos."
    );

  } else {

    savedVideos.push(id);

    showToast(
      "Video saved."
    );

  }

  saveState();

  updateWatchButtons(
    findVideo(id)
  );

  renderSaved();

}


async function shareCurrentVideo() {

  const video =
    findVideo(
      currentVideoId
    );

  if (!video) return;

  const shareData = {

    title:
      video.title,

    text:
      video.description ||
      "Watch this video on VYBE AI.",

    url:
      video.videoUrl ||
      window.location.href

  };

  try {

    if (
      navigator.share
    ) {

      await navigator.share(
        shareData
      );

      return;

    }

    await navigator.clipboard.writeText(
      shareData.url
    );

    showToast(
      "Video link copied."
    );

  } catch (error) {

    console.log(
      "Share cancelled."
    );

  }

}


function toggleSubscription() {

  const video =
    findVideo(
      currentVideoId
    );

  if (!video) return;

  const channel =
    video.channel;

  if (
    subscriptions.includes(
      channel
    )
  ) {

    subscriptions =
      subscriptions.filter(
        item =>
          item !== channel
      );

    showToast(
      "Unsubscribed."
    );

  } else {

    subscriptions.push(
      channel
    );

    showToast(
      "Subscribed."
    );

  }

  saveState();

  updateSubscribeButton(
    video
  );

  renderSubscriptions();

}


function updateWatchButtons(
  video
) {

  if (!video) return;

  const likeBtn =
    document.getElementById(
      "likeBtn"
    );

  const saveBtn =
    document.getElementById(
      "saveBtn"
    );

  if (likeBtn) {

    likeBtn.textContent =
      likedVideos.includes(
        video.id
      )
        ? "👍 Liked"
        : "👍 Like";

  }

  if (saveBtn) {

    saveBtn.textContent =
      savedVideos.includes(
        video.id
      )
        ? "🔖 Saved"
        : "🔖 Save";

  }

  updateSubscribeButton(
    video
  );

}


function updateSubscribeButton(
  video
) {

  const button =
    document.getElementById(
      "subscribeBtn"
    );

  if (!button || !video) {
    return;
  }

  button.textContent =
    subscriptions.includes(
      video.channel
    )
      ? "Subscribed"
      : "Subscribe";

}


/* ==========================================
   HISTORY
========================================== */

function addToHistory(id) {

  watchHistory =
    watchHistory.filter(
      item =>
        String(item) !==
        String(id)
    );

  watchHistory.unshift(id);

  watchHistory =
    watchHistory.slice(
      0,
      50
    );

  saveState();

  renderHistory();

}


function renderHistory() {

  const grid =
    document.getElementById(
      "historyGrid"
    );

  if (!grid) return;

  grid.innerHTML = "";

  const historyVideos =
    watchHistory
      .map(
        id =>
          findVideo(id)
      )
      .filter(Boolean);

  if (!historyVideos.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No watch history yet.
      </div>
    `;

    return;

  }

  historyVideos.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );

}


/* ==========================================
   SAVED
========================================== */

function renderSaved() {

  const grid =
    document.getElementById(
      "savedGrid"
    );

  if (!grid) return;

  grid.innerHTML = "";

  const saved =
    savedVideos
      .map(
        id =>
          findVideo(id)
      )
      .filter(Boolean);

  if (!saved.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No saved videos yet.
      </div>
    `;

    return;

  }

  saved.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );

}


/* ==========================================
   SUBSCRIPTIONS
========================================== */

function renderSubscriptions() {

  const grid =
    document.getElementById(
      "subscriptionsGrid"
    );

  if (!grid) return;

  grid.innerHTML = "";

  const subscribed =
    videos.filter(
      video =>
        subscriptions.includes(
          video.channel
        )
    );

  if (!subscribed.length) {

    grid.innerHTML = `
      <div class="empty-state">
        You have no subscriptions yet.
      </div>
    `;

    return;

  }

  subscribed.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );

}


/* ==========================================
   COMMENTS
========================================== */

function renderComments(
  videoId
) {

  const list =
    document.getElementById(
      "commentsList"
    );

  if (!list) return;

  list.innerHTML = "";

  const videoComments =
    comments[videoId] || [];

  if (!videoComments.length) {

    list.innerHTML = `
      <div class="notification-empty">
        No comments yet. Be the first to comment.
      </div>
    `;

    return;

  }

  videoComments.forEach(
    comment => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "comment";

      item.innerHTML = `

        <div class="mini-avatar">
          ${getInitial(
            comment.name || "You"
          )}
        </div>

        <div>

          <strong>
            ${escapeHTML(
              comment.name || "You"
            )}
          </strong>

          <p>
            ${escapeHTML(
              comment.text
            )}
          </p>

        </div>

      `;

      list.appendChild(
        item
      );

    }
  );

}


function addComment() {

  if (
    currentVideoId === null
  ) {
    return;
  }

  const input =
    document.getElementById(
      "commentInput"
    );

  if (!input) return;

  const text =
    input.value.trim();

  if (!text) {

    showToast(
      "Please write a comment."
    );

    return;

  }

  if (
    !comments[currentVideoId]
  ) {
    comments[currentVideoId] = [];
  }

  comments[currentVideoId].unshift({

    name: "You",

    text: text,

    date:
      new Date().toISOString()

  });

  input.value = "";

  saveState();

  renderComments(
    currentVideoId
  );

  showToast(
    "Comment added."
  );

}


/* ==========================================
   RECOMMENDED
========================================== */

function renderRecommended(
  currentId
) {

  const container =
    document.getElementById(
      "recommendedList"
    );

  if (!container) return;

  container.innerHTML = "";

  videos
    .filter(
      video =>
        String(video.id) !==
        String(currentId)
    )
    .slice(0, 8)
    .forEach(
      video => {

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "recommended-card";

        const youtubeId =
          getYouTubeId(
            video.videoUrl
          );

        let thumbnail = "";

        if (youtubeId) {

          thumbnail = `
            <img
              src="https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg"
              alt="${escapeHTML(video.title)}"
              style="width:100%;height:100%;object-fit:cover;border-radius:8px;"
            >
          `;

        } else {

          thumbnail =
            video.icon ||
            "🎬";

        }

        card.innerHTML = `

          <div class="recommended-thumb">
            ${thumbnail}
          </div>

          <div>

            <div class="recommended-title">
              ${escapeHTML(
                video.title
              )}
            </div>

            <div class="recommended-meta">
              ${escapeHTML(
                video.channel
              )}
              •
              ${escapeHTML(
                video.views
              )}
            </div>

          </div>

        `;

        card.addEventListener(
          "click",
          function () {
            openVideo(
              video.id
            );
          }
        );

        container.appendChild(
          card
        );

      }
    );

}


/* ==========================================
   UPLOAD / ADD VIDEO
========================================== */

function setupUpload() {

  const uploadBtn =
    document.getElementById(
      "uploadBtn"
    );

  const creatorBtn =
    document.getElementById(
      "creatorCtaBtn"
    );

  const form =
    document.getElementById(
      "uploadForm"
    );

  const modal =
    document.getElementById(
      "uploadModal"
    );


  function openUploadModal() {

    if (!modal) return;

    modal.classList.add(
      "show"
    );

  }


  if (uploadBtn) {

    uploadBtn.addEventListener(
      "click",
      openUploadModal
    );

  }

  if (creatorBtn) {

    creatorBtn.addEventListener(
      "click",
      openUploadModal
    );

  }


  document
    .querySelectorAll(
      '[data-close="uploadModal"]'
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            modal.classList.remove(
              "show"
            );

          }
        );

      }
    );


  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "show"
          );

        }

      }
    );

  }


  if (form) {

    form.addEventListener(
      "submit",
      handleAddVideo
    );

  }

}


function handleAddVideo(
  event
) {

  event.preventDefault();

  const urlInput =
    document.getElementById(
      "videoUrl"
    );

  const titleInput =
    document.getElementById(
      "videoTitle"
    );

  const descriptionInput =
    document.getElementById(
      "videoDescription"
    );

  const categoryInput =
    document.getElementById(
      "videoCategory"
    );

  const videoUrl =
    urlInput.value.trim();

  const title =
    titleInput.value.trim();

  const description =
    descriptionInput.value.trim();

  const category =
    categoryInput.value;


  if (!videoUrl) {

    showToast(
      "Please enter a video URL."
    );

    return;

  }

  if (!title) {

    showToast(
      "Please enter a video title."
    );

    return;

  }


  const youtubeId =
    getYouTubeId(videoUrl);

  const direct =
    isDirectVideoUrl(
      videoUrl
    );


  if (
    !youtubeId &&
    !direct
  ) {

    showToast(
      "Please enter a valid YouTube or direct video URL."
    );

    return;

  }


  const newVideo = {

    id:
      Date.now(),

    title:
      title,

    channel:
      "You",

    views:
      "0 views",

    date:
      "Just now",

    category:
      category,

    duration:
      "00:00",

    description:
      description ||
      "Added to VYBE AI.",

    icon:
      "🎬",

    likes:
      0,

    subscribers:
      "0",

    videoUrl:
      videoUrl

  };


  videos.unshift(
    newVideo
  );


  const form =
    document.getElementById(
      "uploadForm"
    );

  if (form) {
    form.reset();
  }


  const modal =
    document.getElementById(
      "uploadModal"
    );

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }


  currentCategory =
    "All";

  setActiveCategory(
    "All"
  );

  renderVideos();

  showToast(
    "Video added successfully."
  );

  openVideo(
    newVideo.id
  );

}


/* ==========================================
   LOGIN
========================================== */

function setupLogin() {

  const loginBtn =
    document.getElementById(
      "loginBtn"
    );

  const modal =
    document.getElementById(
      "loginModal"
    );

  const form =
    document.getElementById(
      "loginForm"
    );


  if (loginBtn) {

    loginBtn.addEventListener(
      "click",
      async function () {

        if (
          supabaseClient
        ) {

          const {
            data
          } =
            await supabaseClient.auth.getUser();

          if (
            data &&
            data.user
          ) {

            await supabaseClient.auth.signOut();

            updateLoginButton();

            showToast(
              "Logged out."
            );

            return;

          }

        }

        if (modal) {

          modal.classList.add(
            "show"
          );

        }

      }
    );

  }


  document
    .querySelectorAll(
      '[data-close="loginModal"]'
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            modal.classList.remove(
              "show"
            );

          }
        );

      }
    );


  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "show"
          );

        }

      }
    );

  }


  if (form) {

    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        const email =
          document.getElementById(
            "loginEmail"
          ).value.trim();

        const password =
          document.getElementById(
            "loginPassword"
          ).value;


        if (
          !supabaseClient
        ) {

          showToast(
            "Supabase is not connected."
          );

          return;

        }


        const {
          error
        } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password
          });


        if (error) {

          console.error(
            error
          );

          showToast(
            error.message ||
            "Login failed."
          );

          return;

        }


        modal.classList.remove(
          "show"
        );

        updateLoginButton();

        showToast(
          "Login successful."
        );

      }
    );

  }


  updateLoginButton();

}


async function updateLoginButton() {

  const button =
    document.getElementById(
      "loginBtn"
    );

  if (!button) return;

  if (
    !supabaseClient
  ) {

    button.textContent =
      "Login";

    return;

  }


  try {

    const {
      data
    } =
      await supabaseClient.auth.getUser();

    if (
      data &&
      data.user
    ) {

      button.textContent =
        "Logout";

    } else {

      button.textContent =
        "Login";

    }

  } catch (error) {

    button.textContent =
      "Login";

  }

}


/* ==========================================
   NOTIFICATIONS
========================================== */

function setupNotifications() {

  const button =
    document.getElementById(
      "notificationBtn"
    );

  const panel =
    document.getElementById(
      "notificationPanel"
    );

  const close =
    document.getElementById(
      "closeNotification"
    );


  if (button && panel) {

    button.addEventListener(
      "click",
      function () {

        panel.classList.toggle(
          "show"
        );

      }
    );

  }


  if (close && panel) {

    close.addEventListener(
      "click",
      function () {

        panel.classList.remove(
          "show"
        );

      }
    );

  }

}


/* ==========================================
   MOBILE MENU
========================================== */

function setupMobileMenu() {

  const button =
    document.getElementById(
      "menuBtn"
    );

  const sidebar =
    document.getElementById(
      "sidebar"
    );


  if (!button || !sidebar) {
    return;
  }


  button.addEventListener(
    "click",
    function () {

      sidebar.classList.toggle(
        "open"
      );

    }
  );

}


function closeMobileMenu() {

  const sidebar =
    document.getElementById(
      "sidebar"
    );

  if (sidebar) {

    sidebar.classList.remove(
      "open"
    );

  }

}


/* ==========================================
   BACK BUTTON
========================================== */

function setupBackButton() {

  const button =
    document.getElementById(
      "watchBackBtn"
    );

  if (!button) return;

  button.addEventListener(
    "click",
    function () {

      showPage("home");

    }
  );

}


/* ==========================================
   LOGO
========================================== */

function setupLogo() {

  const logo =
    document.getElementById(
      "logoBtn"
    );

  if (!logo) return;

  logo.addEventListener(
    "click",
    function () {

      currentCategory =
        "All";

      setActiveCategory(
        "All"
      );

      renderVideos();

      showPage("home");

    }
  );

}


/* ==========================================
   HERO BUTTONS
========================================== */

function setupHeroButtons() {

  const explore =
    document.getElementById(
      "heroExploreBtn"
    );

  const create =
    document.getElementById(
      "heroCreateBtn"
    );


  if (explore) {

    explore.addEventListener(
      "click",
      function () {

        document
          .getElementById(
            "videoGrid"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  }


  if (create) {

    create.addEventListener(
      "click",
      function () {

        document
          .getElementById(
            "uploadBtn"
          )
          ?.click();

      }
    );

  }


  const cta =
    document.getElementById(
      "creatorCtaBtn"
    );

  if (cta) {

    cta.addEventListener(
      "click",
      function () {

        document
          .getElementById(
            "uploadBtn"
          )
          ?.click();

      }
    );

  }

}


/* ==========================================
   SUPABASE CONNECTION
========================================== */

async function checkSupabaseConnection() {

  if (
    !supabaseClient
  ) {

    console.warn(
      "Supabase client is not available."
    );

    return;

  }


  try {

    /*
      IMPORTANT:
      This check does NOT modify
      your database.
    */

    const {
      error
    } =
      await supabaseClient
        .from("videos")
        .select("id")
        .limit(1);


    if (error) {

      console.warn(
        "Supabase videos table is not ready yet:",
        error.message
      );

      return;

    }

    console.log(
      "Supabase connection successful."
    );

  } catch (error) {

    console.warn(
      "Supabase connection check failed:",
      error
    );

  }

}


/* ==========================================
   UTILITIES
========================================== */

function findVideo(id) {

  return videos.find(
    video =>
      String(video.id) ===
      String(id)
  );

}


function findVideoByUrl(
  url
) {

  return videos.find(
    video =>
      video.videoUrl === url
  );

}


function getInitial(
  name
) {

  if (!name) {
    return "V";
  }

  return name
    .trim()
    .charAt(0)
    .toUpperCase();

}


function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function openExternalVideo(
  url,
  title
) {

  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  showToast(
    title
      ? `Opening ${title}`
      : "Opening video."
  );

}


/* ==========================================
   GLOBAL API
========================================== */

window.VYBE = {

  get videos() {
    return videos;
  },

  get shorts() {
    return shorts;
  },

  openVideo,

  getYouTubeId,

  getYouTubeThumbnail,

  isDirectVideoUrl,

  addVideo: function (data) {

    if (
      !data ||
      !data.videoUrl ||
      !data.title
    ) {

      return false;

    }

    const newVideo = {

      id:
        Date.now(),

      title:
        data.title,

      channel:
        data.channel ||
        "You",

      views:
        data.views ||
        "0 views",

      date:
        data.date ||
        "Just now",

      category:
        data.category ||
        "Entertainment",

      duration:
        data.duration ||
        "00:00",

      description:
        data.description ||
        "Added to VYBE AI.",

      icon:
        data.icon ||
        "🎬",

      likes:
        Number(
          data.likes || 0
        ),

      subscribers:
        data.subscribers ||
        "0",

      videoUrl:
        data.videoUrl

    };

    videos.unshift(
      newVideo
    );

    renderVideos();

    return newVideo;

  }

};
