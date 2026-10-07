/* =========================================================
   VYBE AI
   app.js
   YouTube + Direct Video URL Version
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
  window.SUPABASE_URL ||
  "https://wnhnjbrrszmybvxgtbin.supabase.co";

const SUPABASE_ANON_KEY =
  window.SUPABASE_ANON_KEY ||
  "sb_publishable_E0HAjFvs98-9lmEJtBzSzw_6ZYpXaAw";

let supabaseClient = null;

try {
  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  }
} catch (error) {
  console.error("Supabase initialization error:", error);
}


/* =========================================================
   DEMO VIDEOS
========================================================= */

let videos = [

  {
    id: 1,
    title: "Welcome to VYBE AI",
    channel: "VYBE AI",
    views: "12K views",
    date: "2 days ago",
    category: "Entertainment",
    duration: "04:25",
    description:
      "Welcome to VYBE AI — discover videos, creators and new experiences.",
    icon: "▶️",
    likes: 125,
    subscribers: "2.4K",
    videoUrl: ""
  },

  {
    id: 2,
    title: "Amazing Music Experience",
    channel: "VYBE Music",
    views: "45K views",
    date: "5 days ago",
    category: "Music",
    duration: "05:32",
    description:
      "Enjoy an amazing music experience on VYBE AI.",
    icon: "🎵",
    likes: 842,
    subscribers: "18K",
    videoUrl: ""
  },

  {
    id: 3,
    title: "Gaming Highlights",
    channel: "VYBE Gaming",
    views: "89K views",
    date: "1 week ago",
    category: "Gaming",
    duration: "08:14",
    description:
      "The best gaming highlights and exciting moments.",
    icon: "🎮",
    likes: 1542,
    subscribers: "32K",
    videoUrl: ""
  },

  {
    id: 4,
    title: "Learn Something New",
    channel: "VYBE Education",
    views: "23K views",
    date: "3 days ago",
    category: "Education",
    duration: "10:22",
    description:
      "Learn something new with VYBE AI.",
    icon: "🎓",
    likes: 632,
    subscribers: "11K",
    videoUrl: ""
  },

  {
    id: 5,
    title: "Latest News Update",
    channel: "VYBE News",
    views: "76K views",
    date: "1 day ago",
    category: "News",
    duration: "06:45",
    description:
      "Latest news and important updates.",
    icon: "📰",
    likes: 921,
    subscribers: "25K",
    videoUrl: ""
  },

  {
    id: 6,
    title: "Entertainment Tonight",
    channel: "VYBE Entertainment",
    views: "54K views",
    date: "4 days ago",
    category: "Entertainment",
    duration: "07:18",
    description:
      "Entertainment, fun and exciting content.",
    icon: "🎬",
    likes: 723,
    subscribers: "19K",
    videoUrl: ""
  },

  {
    id: 7,
    title: "Beautiful Travel Experience",
    channel: "VYBE Travel",
    views: "31K views",
    date: "6 days ago",
    category: "Entertainment",
    duration: "09:03",
    description:
      "Explore beautiful places and amazing experiences.",
    icon: "🌍",
    likes: 543,
    subscribers: "8.2K",
    videoUrl: ""
  },

  {
    id: 8,
    title: "Technology Explained",
    channel: "VYBE Tech",
    views: "67K views",
    date: "1 week ago",
    category: "Education",
    duration: "12:40",
    description:
      "Technology explained in a simple way.",
    icon: "💻",
    likes: 1043,
    subscribers: "21K",
    videoUrl: ""
  }

];


/* =========================================================
   SHORTS
========================================================= */

let shorts = [

  {
    id: "short-1",
    title: "Amazing Moment",
    channel: "VYBE Shorts",
    views: "120K views",
    icon: "🔥",
    videoUrl: ""
  },

  {
    id: "short-2",
    title: "Funny Video",
    channel: "Fun Zone",
    views: "89K views",
    icon: "😂",
    videoUrl: ""
  },

  {
    id: "short-3",
    title: "Music Vibes",
    channel: "VYBE Music",
    views: "220K views",
    icon: "🎵",
    videoUrl: ""
  },

  {
    id: "short-4",
    title: "Quick Knowledge",
    channel: "Learn Fast",
    views: "56K views",
    icon: "🧠",
    videoUrl: ""
  },

  {
    id: "short-5",
    title: "Gaming Moment",
    channel: "VYBE Gaming",
    views: "145K views",
    icon: "🎮",
    videoUrl: ""
  },

  {
    id: "short-6",
    title: "Beautiful World",
    channel: "VYBE Travel",
    views: "98K views",
    icon: "🌍",
    videoUrl: ""
  }

];


/* =========================================================
   STATE
========================================================= */

let currentVideo = null;

let selectedCategory = "All";

let likedVideos =
  JSON.parse(localStorage.getItem("vybe_liked_videos") || "[]");

let savedVideos =
  JSON.parse(localStorage.getItem("vybe_saved_videos") || "[]");

let history =
  JSON.parse(localStorage.getItem("vybe_history") || "[]");

let subscriptions =
  JSON.parse(localStorage.getItem("vybe_subscriptions") || "[]");

let comments =
  JSON.parse(localStorage.getItem("vybe_comments") || "{}");


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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

  checkSupabaseConnection();

});


/* =========================================================
   SAFE ELEMENT
========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  const toast = $("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.vybeToastTimer);

  window.vybeToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

}


/* =========================================================
   YOUTUBE URL DETECTION
========================================================= */

function getYouTubeId(url) {

  if (!url) return null;

  const value = String(url).trim();

  let match = null;

  /*
     Standard:
     https://www.youtube.com/watch?v=VIDEO_ID
  */

  match = value.match(
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    return match[1];
  }


  /*
     YouTube short:
     https://youtu.be/VIDEO_ID
  */

  match = value.match(
    /youtu\.be\/([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    return match[1];
  }


  /*
     YouTube embed:
     https://www.youtube.com/embed/VIDEO_ID
  */

  match = value.match(
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    return match[1];
  }


  /*
     Shorts:
     https://www.youtube.com/shorts/VIDEO_ID
  */

  match = value.match(
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    return match[1];
  }


  /*
     Music:
     https://music.youtube.com/watch?v=VIDEO_ID
  */

  match = value.match(
    /music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
  );

  if (match) {
    return match[1];
  }


  return null;
}


/* =========================================================
   YOUTUBE THUMBNAIL
========================================================= */

function getYouTubeThumbnail(url) {

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return null;
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}


/* =========================================================
   DIRECT VIDEO URL
========================================================= */

function isDirectVideoUrl(url) {

  if (!url) return false;

  const value = String(url).toLowerCase();

  return (
    value.includes(".mp4") ||
    value.includes(".webm") ||
    value.includes(".ogg") ||
    value.includes(".mov") ||
    value.includes(".m4v")
  );

}


/* =========================================================
   CREATE VIDEO CARD
========================================================= */

function createVideoCard(video) {

  const card = document.createElement("article");

  card.className = "video-card";

  card.dataset.videoId = video.id;


  /* THUMBNAIL */

  const thumbnail = document.createElement("div");

  thumbnail.className = "video-thumbnail";


  const youtubeThumbnail =
    getYouTubeThumbnail(video.videoUrl);


  if (youtubeThumbnail) {

    thumbnail.style.backgroundImage =
      `url("${youtubeThumbnail}")`;

    thumbnail.style.backgroundSize = "cover";

    thumbnail.style.backgroundPosition = "center";

  } else {

    const icon = document.createElement("div");

    icon.className = "thumbnail-icon";

    icon.textContent = video.icon || "🎬";

    thumbnail.appendChild(icon);

  }


  /* DURATION */

  if (video.duration) {

    const duration = document.createElement("span");

    duration.className = "video-duration";

    duration.textContent = video.duration;

    thumbnail.appendChild(duration);

  }


  /* INFO */

  const info = document.createElement("div");

  info.className = "video-card-info";


  const avatar = document.createElement("div");

  avatar.className = "video-avatar";

  avatar.textContent =
    getInitial(video.channel || "V");


  const text = document.createElement("div");

  text.className = "video-card-text";


  const title = document.createElement("h3");

  title.textContent =
    video.title || "Untitled Video";


  const channel = document.createElement("p");

  channel.textContent =
    video.channel || "VYBE AI";


  const meta = document.createElement("p");

  meta.textContent =
    `${video.views || "0 views"} • ${video.date || "Just now"}`;


  text.appendChild(title);

  text.appendChild(channel);

  text.appendChild(meta);


  info.appendChild(avatar);

  info.appendChild(text);


  card.appendChild(thumbnail);

  card.appendChild(info);


  card.addEventListener("click", () => {

    openVideo(video.id);

  });


  return card;

}


/* =========================================================
   INITIALS
========================================================= */

function getInitial(name) {

  if (!name) return "V";

  return String(name)
    .trim()
    .charAt(0)
    .toUpperCase();

}


/* =========================================================
   RENDER VIDEOS
========================================================= */

function renderVideos(list = null) {

  const grid = $("videoGrid");

  if (!grid) return;

  grid.innerHTML = "";

  let data =
    list ||
    videos.filter(video => {

      if (selectedCategory === "All") {
        return true;
      }

      return video.category === selectedCategory;

    });


  if (!data.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found.
      </div>
    `;

    return;

  }


  data.forEach(video => {

    grid.appendChild(
      createVideoCard(video)
    );

  });

}


/* =========================================================
   SHORTS
========================================================= */

function createShortCard(short) {

  const card = document.createElement("article");

  card.className = "short-card";


  const thumb = document.createElement("div");

  thumb.className = "short-thumbnail";


  const icon = document.createElement("div");

  icon.className = "short-icon";

  icon.textContent =
    short.icon || "▶️";


  thumb.appendChild(icon);


  const info = document.createElement("div");

  info.className = "short-info";


  const title = document.createElement("h3");

  title.textContent =
    short.title || "Short";


  const channel = document.createElement("p");

  channel.textContent =
    short.channel || "VYBE AI";


  const views = document.createElement("p");

  views.textContent =
    short.views || "0 views";


  info.appendChild(title);

  info.appendChild(channel);

  info.appendChild(views);


  card.appendChild(thumb);

  card.appendChild(info);


  if (short.videoUrl) {

    card.addEventListener("click", () => {

      const tempVideo = {

        id: short.id,

        title: short.title,

        channel: short.channel,

        views: short.views,

        date: "Just now",

        category: "Entertainment",

        duration: "",

        description: "",

        icon: short.icon,

        likes: 0,

        subscribers: "0",

        videoUrl: short.videoUrl

      };


      videos.push(tempVideo);

      openVideo(tempVideo.id);

    });

  }


  return card;

}


function renderShorts() {

  const grids = [

    $("shortsGrid"),

    $("shortsPageGrid")

  ];


  grids.forEach(grid => {

    if (!grid) return;

    grid.innerHTML = "";

    shorts.forEach(short => {

      grid.appendChild(
        createShortCard(short)
      );

    });

  });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  const navItems =
    document.querySelectorAll(".nav-item[data-page]");


  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const page =
        item.dataset.page;


      showPage(page);


      navItems.forEach(nav => {

        nav.classList.remove("active");

      });


      item.classList.add("active");

    });

  });


  const seeAll =
    $("seeAllBtn");

  if (seeAll) {

    seeAll.addEventListener("click", () => {

      selectedCategory = "All";

      showPage("home");

      renderVideos();

    });

  }


  const seeAllShorts =
    $("seeAllShortsBtn");

  if (seeAllShorts) {

    seeAllShorts.addEventListener("click", () => {

      showPage("shorts");

    });

  }

}


function showPage(page) {

  document
    .querySelectorAll(".page-view")
    .forEach(view => {

      view.classList.remove("active");

    });


  const target =
    $(page + "Page");


  if (target) {

    target.classList.add("active");

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  if (page === "history") {
    renderHistory();
  }

  if (page === "saved") {
    renderSaved();
  }

  if (page === "subscriptions") {
    renderSubscriptions();
  }

}


/* =========================================================
   CATEGORIES
========================================================= */

function setupCategories() {

  const buttons =
    document.querySelectorAll(
      ".category-btn"
    );


  buttons.forEach(button => {

    button.addEventListener("click", () => {

      selectedCategory =
        button.dataset.category || "All";


      buttons.forEach(btn => {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      renderVideos();

    });

  });


  document
    .querySelectorAll(".category-nav")
    .forEach(button => {

      button.addEventListener("click", () => {

        selectedCategory =
          button.dataset.category || "All";


        const categoryButtons =
          document.querySelectorAll(".category-btn");


        categoryButtons.forEach(btn => {

          btn.classList.remove("active");


          if (
            btn.dataset.category ===
            selectedCategory
          ) {

            btn.classList.add("active");

          }

        });


        showPage("home");

        renderVideos();

      });

    });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const input =
    $("searchInput");

  const button =
    $("searchBtn");


  if (!input) return;


  function performSearch() {

    const query =
      input.value.trim().toLowerCase();


    if (!query) {

      showPage("home");

      renderVideos();

      return;

    }


    const results =
      videos.filter(video => {

        return (

          String(video.title || "")
            .toLowerCase()
            .includes(query)

          ||

          String(video.channel || "")
            .toLowerCase()
            .includes(query)

          ||

          String(video.category || "")
            .toLowerCase()
            .includes(query)

          ||

          String(video.description || "")
            .toLowerCase()
            .includes(query)

        );

      });


    renderSearchResults(
      results,
      query
    );

  }


  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        performSearch();

      }

    }
  );


  if (button) {

    button.addEventListener(
      "click",
      performSearch
    );

  }

}


function renderSearchResults(
  results,
  query
) {

  showPage("search");


  const text =
    $("searchResultText");

  if (text) {

    text.textContent =
      `${results.length} result(s) for "${query}"`;

  }


  const grid =
    $("searchGrid");

  if (!grid) return;

  grid.innerHTML = "";


  if (!results.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found for "${escapeHtml(query)}".
      </div>
    `;

    return;

  }


  results.forEach(video => {

    grid.appendChild(
      createVideoCard(video)
    );

  });

}


/* =========================================================
   OPEN VIDEO
========================================================= */

function openVideo(id) {

  const video =
    videos.find(
      item => String(item.id) === String(id)
    );


  if (!video) {

    showToast("Video not found.");

    return;

  }


  currentVideo = video;


  /* HISTORY */

  history =
    history.filter(
      item => String(item) !== String(video.id)
    );


  history.unshift(video.id);


  if (history.length > 50) {

    history = history.slice(0, 50);

  }


  saveState();


  showPage("watch");


  populateWatchPage(video);

}


/* =========================================================
   POPULATE WATCH PAGE
========================================================= */

function populateWatchPage(video) {

  if (!video) return;


  const title =
    $("watchTitle");

  const views =
    $("watchViews");

  const date =
    $("watchDate");

  const channel =
    $("watchChannel");

  const subscribers =
    $("watchSubscribers");

  const description =
    $("watchDescription");

  const avatar =
    $("watchChannelAvatar");

  const likeCount =
    $("likeCount");


  if (title) {
    title.textContent =
      video.title || "Untitled Video";
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
      video.channel || "VYBE AI";
  }


  if (subscribers) {
    subscribers.textContent =
      `${video.subscribers || "0"} subscribers`;
  }


  if (description) {
    description.textContent =
      video.description || "";
  }


  if (avatar) {
    avatar.textContent =
      getInitial(video.channel);
  }


  if (likeCount) {

    likeCount.textContent =
      formatNumber(video.likes || 0);

  }


  updateLikeButton();

  updateSaveButton();

  updateSubscribeButton();

  renderComments();

  renderRecommended();


  loadVideoPlayer(video);

}


/* =========================================================
   VIDEO PLAYER
========================================================= */

function loadVideoPlayer(video) {

  const player =
    $("mainVideo");

  const youtubeContainer =
    $("youtubePlayer");

  const placeholder =
    $("playerPlaceholder");


  if (!player || !placeholder) return;


  /* RESET */

  try {
    player.pause();
  } catch (error) {
    console.warn(error);
  }


  player.removeAttribute("src");

  player.load();


  player.style.display = "none";


  if (youtubeContainer) {

    youtubeContainer.innerHTML = "";

    youtubeContainer.style.display = "none";

  }


  placeholder.style.display = "grid";


  const url =
    String(video.videoUrl || "").trim();


  if (!url) {

    return;

  }


  /* =======================================================
     YOUTUBE
  ======================================================= */

  const youtubeId =
    getYouTubeId(url);


  if (youtubeId) {

    if (!youtubeContainer) {

      showToast(
        "YouTube player is not available."
      );

      return;

    }


    const iframe =
      document.createElement("iframe");


    iframe.src =
      `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;


    iframe.title =
      video.title || "VYBE AI Video";


    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


    iframe.allowFullscreen = true;


    iframe.setAttribute(
      "frameborder",
      "0"
    );


    iframe.style.width =
      "100%";


    iframe.style.height =
      "100%";


    iframe.style.border =
      "0";


    youtubeContainer.appendChild(
      iframe
    );


    youtubeContainer.style.display =
      "block";


    placeholder.style.display =
      "none";


    return;

  }


  /* =======================================================
     DIRECT VIDEO
  ======================================================= */

  if (isDirectVideoUrl(url)) {

    player.src = url;

    player.style.display =
      "block";


    placeholder.style.display =
      "none";


    player.load();


    return;

  }


  /* =======================================================
     UNKNOWN URL
  ======================================================= */

  placeholder.innerHTML = `
    <div class="play-big">⚠️</div>
    <p>Unsupported video URL</p>
  `;

  placeholder.style.display =
    "grid";

}


/* =========================================================
   WATCH ACTIONS
========================================================= */

function setupWatchActions() {

  const likeBtn =
    $("likeBtn");

  const saveBtn =
    $("saveBtn");

  const shareBtn =
    $("shareBtn");

  const subscribeBtn =
    $("subscribeBtn");

  const commentBtn =
    $("commentBtn");


  if (likeBtn) {

    likeBtn.addEventListener(
      "click",
      toggleLike
    );

  }


  if (saveBtn) {

    saveBtn.addEventListener(
      "click",
      toggleSave
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
      toggleSubscribe
    );

  }


  if (commentBtn) {

    commentBtn.addEventListener(
      "click",
      addComment
    );

  }


  const commentInput =
    $("commentInput");


  if (commentInput) {

    commentInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          event.preventDefault();

          addComment();

        }

      }
    );

  }

}


/* =========================================================
   LIKE
========================================================= */

function toggleLike() {

  if (!currentVideo) return;


  const id =
    String(currentVideo.id);


  const index =
    likedVideos.indexOf(id);


  if (index === -1) {

    likedVideos.push(id);

    currentVideo.likes =
      Number(currentVideo.likes || 0) + 1;

    showToast("Video liked.");

  } else {

    likedVideos.splice(index, 1);

    currentVideo.likes =
      Math.max(
        0,
        Number(currentVideo.likes || 0) - 1
      );

    showToast("Like removed.");

  }


  const count =
    $("likeCount");


  if (count) {

    count.textContent =
      formatNumber(currentVideo.likes);

  }


  updateLikeButton();

  saveState();

}


function updateLikeButton() {

  const button =
    $("likeBtn");

  if (!button || !currentVideo) return;


  const liked =
    likedVideos.includes(
      String(currentVideo.id)
    );


  button.classList.toggle(
    "active",
    liked
  );

}


/* =========================================================
   SAVE
========================================================= */

function toggleSave() {

  if (!currentVideo) return;


  const id =
    String(currentVideo.id);


  const index =
    savedVideos.indexOf(id);


  if (index === -1) {

    savedVideos.push(id);

    showToast("Video saved.");

  } else {

    savedVideos.splice(index, 1);

    showToast("Video removed from saved.");

  }


  updateSaveButton();

  saveState();

}


function updateSaveButton() {

  const button =
    $("saveBtn");

  if (!button || !currentVideo) return;


  const saved =
    savedVideos.includes(
      String(currentVideo.id)
    );


  button.classList.toggle(
    "active",
    saved
  );


  button.innerHTML =
    saved
      ? "💾 Saved"
      : "💾 Save";

}


/* =========================================================
   SHARE
========================================================= */

async function shareCurrentVideo() {

  if (!currentVideo) return;


  const shareData = {

    title:
      currentVideo.title || "VYBE AI",

    text:
      currentVideo.description ||
      currentVideo.title ||
      "Watch this video on VYBE AI.",

    url:
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


    if (
      navigator.clipboard
    ) {

      await navigator.clipboard.writeText(
        window.location.href
      );

      showToast(
        "Video link copied."
      );

      return;

    }


    showToast(
      "Copy this page URL to share."
    );

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {

      return;

    }

    console.error(error);

  }

}


/* =========================================================
   SUBSCRIBE
========================================================= */

function toggleSubscribe() {

  if (!currentVideo) return;


  const channel =
    currentVideo.channel ||
    "VYBE AI";


  const index =
    subscriptions.indexOf(channel);


  if (index === -1) {

    subscriptions.push(channel);

    showToast(
      `Subscribed to ${channel}.`
    );

  } else {

    subscriptions.splice(index, 1);

    showToast(
      `Unsubscribed from ${channel}.`
    );

  }


  updateSubscribeButton();

  saveState();

}


function updateSubscribeButton() {

  const button =
    $("subscribeBtn");

  if (!button || !currentVideo) return;


  const channel =
    currentVideo.channel ||
    "VYBE AI";


  const subscribed =
    subscriptions.includes(channel);


  button.textContent =
    subscribed
      ? "Subscribed"
      : "Subscribe";


  button.classList.toggle(
    "active",
    subscribed
  );

}


/* =========================================================
   COMMENTS
========================================================= */

function renderComments() {

  if (!currentVideo) return;


  const list =
    $("commentsList");

  const count =
    $("commentCount");


  if (!list) return;


  const id =
    String(currentVideo.id);


  const data =
    comments[id] || [];


  if (count) {

    count.textContent =
      data.length;

  }


  list.innerHTML = "";


  if (!data.length) {

    list.innerHTML = `
      <div class="empty-state">
        No comments yet. Be the first to comment.
      </div>
    `;

    return;

  }


  data.forEach(comment => {

    const item =
      document.createElement("div");


    item.className =
      "comment-item";


    item.innerHTML = `
      <div class="comment-avatar">
        ${escapeHtml(
          getInitial(comment.user || "Y")
        )}
      </div>

      <div class="comment-content">

        <strong>
          ${escapeHtml(
            comment.user || "You"
          )}
        </strong>

        <p>
          ${escapeHtml(
            comment.text || ""
          )}
        </p>

        <small>
          ${escapeHtml(
            comment.date || "Just now"
          )}
        </small>

      </div>
    `;


    list.appendChild(item);

  });

}


function addComment() {

  if (!currentVideo) return;


  const input =
    $("commentInput");


  if (!input) return;


  const text =
    input.value.trim();


  if (!text) {

    showToast(
      "Please write a comment."
    );

    return;

  }


  const id =
    String(currentVideo.id);


  if (!comments[id]) {

    comments[id] = [];

  }


  comments[id].unshift({

    user: "You",

    text: text,

    date: "Just now"

  });


  input.value = "";


  saveState();

  renderComments();

  showToast(
    "Comment added."
  );

}


/* =========================================================
   RECOMMENDED
========================================================= */

function renderRecommended() {

  const list =
    $("recommendedList");


  if (!list) return;


  list.innerHTML = "";


  const recommended =
    videos
      .filter(video => {

        if (!currentVideo) return true;

        return (
          String(video.id) !==
          String(currentVideo.id)
        );

      })
      .slice(0, 8);


  recommended.forEach(video => {

    const item =
      document.createElement("div");


    item.className =
      "recommended-item";


    const thumb =
      document.createElement("div");


    thumb.className =
      "recommended-thumb";


    const youtubeThumbnail =
      getYouTubeThumbnail(
        video.videoUrl
      );


    if (youtubeThumbnail) {

      thumb.style.backgroundImage =
        `url("${youtubeThumbnail}")`;

      thumb.style.backgroundSize =
        "cover";

      thumb.style.backgroundPosition =
        "center";

    } else {

      thumb.textContent =
        video.icon || "🎬";

    }


    const info =
      document.createElement("div");


    info.className =
      "recommended-info";


    info.innerHTML = `
      <h3>
        ${escapeHtml(
          video.title || "Untitled"
        )}
      </h3>

      <p>
        ${escapeHtml(
          video.channel || "VYBE AI"
        )}
      </p>

      <small>
        ${escapeHtml(
          video.views || "0 views"
        )}
      </small>
    `;


    item.appendChild(thumb);

    item.appendChild(info);


    item.addEventListener(
      "click",
      () => {

        openVideo(video.id);

      }
    );


    list.appendChild(item);

  });

}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

  const grid =
    $("historyGrid");

  if (!grid) return;


  grid.innerHTML = "";


  const data =
    history
      .map(id => {

        return videos.find(
          video =>
            String(video.id) ===
            String(id)
        );

      })
      .filter(Boolean);


  if (!data.length) {

    grid.innerHTML = `
      <div class="empty-state">
        Your watch history is empty.
      </div>
    `;

    return;

  }


  data.forEach(video => {

    grid.appendChild(
      createVideoCard(video)
    );

  });

}


/* =========================================================
   SAVED
========================================================= */

function renderSaved() {

  const grid =
    $("savedGrid");

  if (!grid) return;


  grid.innerHTML = "";


  const data =
    savedVideos
      .map(id => {

        return videos.find(
          video =>
            String(video.id) ===
            String(id)
        );

      })
      .filter(Boolean);


  if (!data.length) {

    grid.innerHTML = `
      <div class="empty-state">
        You have no saved videos.
      </div>
    `;

    return;

  }


  data.forEach(video => {

    grid.appendChild(
      createVideoCard(video)
    );

  });

}


/* =========================================================
   SUBSCRIPTIONS
========================================================= */

function renderSubscriptions() {

  const grid =
    $("subscriptionsGrid");

  if (!grid) return;


  grid.innerHTML = "";


  const data =
    videos.filter(video => {

      return subscriptions.includes(
        video.channel
      );

    });


  if (!data.length) {

    grid.innerHTML = `
      <div class="empty-state">
        You haven't subscribed to any channels yet.
      </div>
    `;

    return;

  }


  data.forEach(video => {

    grid.appendChild(
      createVideoCard(video)
    );

  });

}


/* =========================================================
   UPLOAD / ADD VIDEO
========================================================= */

function setupUpload() {

  const uploadBtn =
    $("uploadBtn");

  const creatorUploadBtn =
    $("creatorUploadBtn");

  const modal =
    $("uploadModal");

  const closeBtn =
    $("closeUploadModal");

  const form =
    $("uploadForm");


  function openUploadModal() {

    if (!modal) return;

    modal.classList.add("show");

  }


  function closeUploadModal() {

    if (!modal) return;

    modal.classList.remove("show");

  }


  if (uploadBtn) {

    uploadBtn.addEventListener(
      "click",
      openUploadModal
    );

  }


  if (creatorUploadBtn) {

    creatorUploadBtn.addEventListener(
      "click",
      openUploadModal
    );

  }


  if (closeBtn) {

    closeBtn.addEventListener(
      "click",
      closeUploadModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeUploadModal();

        }

      }
    );

  }


  if (!form) return;


  form.addEventListener(
    "submit",
    handleAddVideo
  );

}


function handleAddVideo(event) {

  event.preventDefault();


  const urlInput =
    $("videoUrl");

  const titleInput =
    $("videoTitle");

  const descriptionInput =
    $("videoDescription");

  const categoryInput =
    $("videoCategory");


  const videoUrl =
    urlInput
      ? urlInput.value.trim()
      : "";


  const title =
    titleInput
      ? titleInput.value.trim()
      : "";


  const description =
    descriptionInput
      ? descriptionInput.value.trim()
      : "";


  const category =
    categoryInput
      ? categoryInput.value
      : "Entertainment";


  if (!videoUrl) {

    showToast(
      "Please paste a video URL."
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


  const directVideo =
    isDirectVideoUrl(videoUrl);


  if (
    !youtubeId &&
    !directVideo
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


  /* RESET FORM */

  const form =
    $("uploadForm");


  if (form) {

    form.reset();

  }


  /* CLOSE MODAL */

  const modal =
    $("uploadModal");


  if (modal) {

    modal.classList.remove(
      "show"
    );

  }


  /* REFRESH */

  selectedCategory = "All";

  renderVideos();

  renderShorts();


  /* OPEN VIDEO */

  openVideo(
    newVideo.id
  );


  showToast(
    "Video added successfully."
  );

}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

  const loginBtn =
    $("loginBtn");

  const modal =
    $("loginModal");

  const closeBtn =
    $("closeLoginModal");

  const form =
    $("loginForm");


  if (loginBtn) {

    loginBtn.addEventListener(
      "click",
      () => {

        if (modal) {

          modal.classList.add(
            "show"
          );

        }

      }
    );

  }


  if (closeBtn) {

    closeBtn.addEventListener(
      "click",
      () => {

        if (modal) {

          modal.classList.remove(
            "show"
          );

        }

      }
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      event => {

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


  if (!form) return;


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const email =
        $("loginEmail")
          ?.value
          .trim();


      const password =
        $("loginPassword")
          ?.value;


      if (!email || !password) {

        showToast(
          "Please enter email and password."
        );

        return;

      }


      if (!supabaseClient) {

        showToast(
          "Supabase connection is unavailable."
        );

        return;

      }


      try {

        const {
          data,
          error
        } =
          await supabaseClient.auth.signInWithPassword({

            email:
              email,

            password:
              password

          });


        if (error) {

          throw error;

        }


        if (data && data.user) {

          showToast(
            "Login successful."
          );


          if (modal) {

            modal.classList.remove(
              "show"
            );

          }


          updateLoginButton();

        }

      } catch (error) {

        console.error(
          "Login error:",
          error
        );


        showToast(
          error.message ||
          "Login failed."
        );

      }

    }
  );


  updateLoginButton();

}


async function updateLoginButton() {

  const button =
    $("loginBtn");


  if (!button) return;


  if (!supabaseClient) {

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

      button.onclick =
        logoutUser;

    } else {

      button.textContent =
        "Login";

      button.onclick =
        null;

    }

  } catch (error) {

    console.warn(
      "Session check failed:",
      error
    );

  }

}


async function logoutUser() {

  if (!supabaseClient) return;


  try {

    await supabaseClient.auth.signOut();

    showToast(
      "Logged out."
    );


    updateLoginButton();

  } catch (error) {

    console.error(error);

  }

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function setupNotifications() {

  const button =
    $("notificationBtn");

  const panel =
    $("notificationPanel");

  const close =
    $("closeNotification");


  if (button && panel) {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        panel.classList.toggle(
          "show"
        );

      }
    );

  }


  if (close && panel) {

    close.addEventListener(
      "click",
      () => {

        panel.classList.remove(
          "show"
        );

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      if (
        panel &&
        !panel.contains(event.target) &&
        event.target !== button
      ) {

        panel.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

  const button =
    $("menuBtn");

  const sidebar =
    $("sidebar");


  if (!button || !sidebar) return;


  button.addEventListener(
    "click",
    () => {

      sidebar.classList.toggle(
        "open"
      );

    }
  );


  sidebar
    .querySelectorAll("button")
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          sidebar.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =========================================================
   BACK BUTTON
========================================================= */

function setupBackButton() {

  const button =
    $("backToHomeBtn");


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      showPage("home");

    }
  );

}


/* =========================================================
   LOGO
========================================================= */

function setupLogo() {

  const logo =
    $("logoBtn");


  if (!logo) return;


  logo.addEventListener(
    "click",
    () => {

      showPage("home");

      selectedCategory =
        "All";

      renderVideos();

    }
  );


  logo.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        showPage("home");

      }

    }
  );

}


/* =========================================================
   SUPABASE CONNECTION
========================================================= */

async function checkSupabaseConnection() {

  if (!supabaseClient) {

    console.warn(
      "Supabase client not initialized."
    );

    return;

  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("videos")
        .select("id")
        .limit(1);


    if (error) {

      console.warn(
        "Supabase videos table check:",
        error.message
      );

      return;

    }


    console.log(
      "Supabase connection successful.",
      data
    );

  } catch (error) {

    console.warn(
      "Supabase connection error:",
      error
    );

  }

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

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
    JSON.stringify(history)
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


/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(number) {

  const value =
    Number(number || 0);


  if (value >= 1000000) {

    return (
      (value / 1000000)
        .toFixed(1)
        .replace(".0", "")
      + "M"
    );

  }


  if (value >= 1000) {

    return (
      (value / 1000)
        .toFixed(1)
        .replace(".0", "")
      + "K"
    );

  }


  return String(value);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

  return String(value || "")
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


/* =========================================================
   SUPABASE AUTH STATE
========================================================= */

if (
  window.supabase &&
  SUPABASE_URL &&
  SUPABASE_ANON_KEY
) {

  try {

    const client =
      supabaseClient;


    if (client) {

      client.auth.onAuthStateChange(
        (event, session) => {

          console.log(
            "Auth state:",
            event
          );


          updateLoginButton();

        }
      );

    }

  } catch (error) {

    console.warn(
      "Auth listener error:",
      error
    );

  }

}


/* =========================================================
   GLOBAL DEBUG
========================================================= */

window.VYBE = {

  videos,

  shorts,

  openVideo,

  getYouTubeId,

  getYouTubeThumbnail,

  addVideo: handleAddVideo

};
