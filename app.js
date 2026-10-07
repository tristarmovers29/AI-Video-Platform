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
    duration: "04:25",
    description:
      "Welcome to VYBE AI. Discover videos and creators.",
    icon: "🎬",
    likes: 120,
    subscribers: "12K",
    videoUrl: ""
  },

  {
    id: 2,
    title: "Future of Artificial Intelligence",
    channel: "Tech Vision",
    views: "45K views",
    date: "1 week ago",
    category: "Education",
    duration: "08:40",
    description:
      "Explore the future of artificial intelligence.",
    icon: "🤖",
    likes: 430,
    subscribers: "28K",
    videoUrl: ""
  },

  {
    id: 3,
    title: "Best Music Vibes",
    channel: "VYBE Music",
    views: "89K views",
    date: "3 days ago",
    category: "Music",
    duration: "05:20",
    description:
      "Relax and enjoy the latest music vibes.",
    icon: "🎵",
    likes: 900,
    subscribers: "55K",
    videoUrl: ""
  },

  {
    id: 4,
    title: "Gaming Highlights",
    channel: "Game Zone",
    views: "76K views",
    date: "5 days ago",
    category: "Gaming",
    duration: "10:15",
    description:
      "Amazing gaming highlights and moments.",
    icon: "🎮",
    likes: 760,
    subscribers: "42K",
    videoUrl: ""
  },

  {
    id: 5,
    title: "Latest News Update",
    channel: "VYBE News",
    views: "31K views",
    date: "Today",
    category: "News",
    duration: "06:10",
    description:
      "Latest news and important updates.",
    icon: "📰",
    likes: 310,
    subscribers: "20K",
    videoUrl: ""
  },

  {
    id: 6,
    title: "Learn Something New",
    channel: "Learn Hub",
    views: "21K views",
    date: "4 days ago",
    category: "Education",
    duration: "07:30",
    description:
      "Learn something useful and interesting.",
    icon: "📚",
    likes: 210,
    subscribers: "18K",
    videoUrl: ""
  },

  {
    id: 7,
    title: "Entertainment Tonight",
    channel: "VYBE Entertainment",
    views: "64K views",
    date: "Yesterday",
    category: "Entertainment",
    duration: "09:00",
    description:
      "Entertainment highlights from VYBE AI.",
    icon: "✨",
    likes: 640,
    subscribers: "35K",
    videoUrl: ""
  },

  {
    id: 8,
    title: "Amazing Technology",
    channel: "Future Tech",
    views: "52K views",
    date: "6 days ago",
    category: "Education",
    duration: "11:20",
    description:
      "Interesting technology and innovation.",
    icon: "💡",
    likes: 520,
    subscribers: "31K",
    videoUrl: ""
  }

];


let shorts = [

  {
    id: 101,
    title: "Quick VYBE",
    channel: "VYBE AI",
    icon: "⚡",
    videoUrl: ""
  },

  {
    id: 102,
    title: "Amazing Moment",
    channel: "VYBE",
    icon: "🔥",
    videoUrl: ""
  },

  {
    id: 103,
    title: "Music Short",
    channel: "VYBE Music",
    icon: "🎵",
    videoUrl: ""
  },

  {
    id: 104,
    title: "Gaming Short",
    channel: "Game Zone",
    icon: "🎮",
    videoUrl: ""
  },

  {
    id: 105,
    title: "Tech Short",
    channel: "Tech Vision",
    icon: "🤖",
    videoUrl: ""
  },

  {
    id: 106,
    title: "Daily VYBE",
    channel: "VYBE AI",
    icon: "✨",
    videoUrl: ""
  }

];


/* ==========================================
   LOCAL STATE
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

let currentVideo = null;
let currentCategory = "All";


/* ==========================================
   DOM READY
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

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

  }
);


/* ==========================================
   YOUTUBE HELPERS
========================================== */

function getYouTubeId(url) {

  if (!url) {
    return null;
  }

  try {

    const value =
      String(url).trim();

    const patterns = [

      /youtube\.com\/watch\?v=([^&]+)/i,

      /youtu\.be\/([^?&/]+)/i,

      /youtube\.com\/embed\/([^?&/]+)/i,

      /youtube\.com\/shorts\/([^?&/]+)/i,

      /music\.youtube\.com\/watch\?v=([^&]+)/i

    ];

    for (const pattern of patterns) {

      const match =
        value.match(pattern);

      if (match && match[1]) {

        const id =
          match[1].substring(0, 11);

        if (id.length === 11) {
          return id;
        }
      }
    }

  } catch (error) {
    console.error(
      "YouTube ID error:",
      error
    );
  }

  return null;
}


function getYouTubeThumbnail(url) {

  const id =
    getYouTubeId(url);

  if (!id) {
    return "";
  }

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}


function isDirectVideoUrl(url) {

  if (!url) {
    return false;
  }

  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i
    .test(
      String(url).trim()
    );
}


/* ==========================================
   VIDEO CARDS
========================================== */

function createVideoCard(video) {

  const card =
    document.createElement("div");

  card.className =
    "video-card";

  const thumbnail =
    getYouTubeThumbnail(
      video.videoUrl
    );

  let thumbnailHTML = "";

  if (thumbnail) {

    thumbnailHTML = `
      <img
        src="${escapeHtml(thumbnail)}"
        alt="${escapeHtml(video.title)}"
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
        ${escapeHtml(video.duration || "00:00")}
      </span>

    </div>

    <div class="video-info">

      <div class="mini-avatar">
        ${escapeHtml(
          (video.channel || "V").charAt(0).toUpperCase()
        )}
      </div>

      <div>

        <div class="video-title">
          ${escapeHtml(video.title)}
        </div>

        <div class="video-channel">
          ${escapeHtml(video.channel || "VYBE AI")}
        </div>

        <div class="video-meta">
          ${escapeHtml(video.views || "0 views")}
          •
          ${escapeHtml(video.date || "Just now")}
        </div>

      </div>

    </div>
  `;

  card.addEventListener(
    "click",
    () => openVideo(video.id)
  );

  return card;
}


function renderVideos(
  list = videos
) {

  const grid =
    document.getElementById(
      "videoGrid"
    );

  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  const filtered =
    currentCategory === "All"
      ? list
      : list.filter(
          video =>
            video.category ===
            currentCategory
        );

  if (!filtered.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found.
      </div>
    `;

    return;
  }

  filtered.forEach(
    video =>
      grid.appendChild(
        createVideoCard(video)
      )
  );
}


/* ==========================================
   SHORTS
========================================== */

function createShortCard(short) {

  const card =
    document.createElement("div");

  card.className =
    "short-card";

  card.innerHTML = `

    <div class="short-thumb">

      <span>
        ${short.icon || "🎬"}
      </span>

    </div>

    <div class="short-title">
      ${escapeHtml(short.title)}
    </div>

  `;

  if (short.videoUrl) {

    card.addEventListener(
      "click",
      () => {

        const id =
          getYouTubeId(
            short.videoUrl
          );

        if (id) {

          const found =
            videos.find(
              video =>
                getYouTubeId(
                  video.videoUrl
                ) === id
            );

          if (found) {
            openVideo(found.id);
          }

        } else if (
          isDirectVideoUrl(
            short.videoUrl
          )
        ) {

          const video = {
            ...short,
            id: `short-${short.id}`,
            title: short.title,
            channel: short.channel,
            views: "0 views",
            date: "Just now",
            category: "Entertainment",
            duration: "00:00",
            description: "",
            likes: 0,
            subscribers: "0",
            videoUrl: short.videoUrl
          };

          videos.unshift(video);

          openVideo(
            video.id
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

function setupNavigation() {

  document
    .querySelectorAll(
      ".nav-item[data-page]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            showPage(
              button.dataset.page
            );

            document
              .querySelectorAll(
                ".nav-item"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );

            button.classList.add(
              "active"
            );

            closeSidebar();

            if (
              button.dataset.page ===
              "historyPage"
            ) {
              renderHistory();
            }

            if (
              button.dataset.page ===
              "savedPage"
            ) {
              renderSaved();
            }

            if (
              button.dataset.page ===
              "subscriptionsPage"
            ) {
              renderSubscriptions();
            }

          }
        );

      }
    );

}


function showPage(pageId) {

  document
    .querySelectorAll(
      ".page-view"
    )
    .forEach(
      page =>
        page.classList.remove(
          "active"
        )
    );

  const page =
    document.getElementById(
      pageId
    );

  if (page) {

    page.classList.add(
      "active"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


function setupBackButton() {

  document
    .querySelectorAll(
      "[data-back]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => showPage("homePage")
        );

      }
    );

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
          () => {

            currentCategory =
              button.dataset.category ||
              "All";

            document
              .querySelectorAll(
                ".category"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );

            button.classList.add(
              "active"
            );

            showPage(
              "homePage"
            );

            renderVideos();

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
          () => {

            currentCategory =
              button.dataset.category;

            document
              .querySelectorAll(
                ".category"
              )
              .forEach(
                item => {

                  item.classList.toggle(
                    "active",
                    item.dataset.category ===
                    currentCategory
                  );

                }
              );

            showPage(
              "homePage"
            );

            renderVideos();

            closeSidebar();

          }
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

  if (input) {

    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Enter"
        ) {

          performSearch(
            input.value
          );

        }

      }
    );

  }

  if (button) {

    button.addEventListener(
      "click",
      () =>
        performSearch(
          input ? input.value : ""
        )
    );

  }

}


function performSearch(query) {

  const value =
    String(query || "")
      .trim()
      .toLowerCase();

  showPage(
    "searchPage"
  );

  const grid =
    document.getElementById(
      "searchGrid"
    );

  const text =
    document.getElementById(
      "searchResultText"
    );

  if (!grid) {
    return;
  }

  const results =
    videos.filter(
      video => {

        const combined =
          `${video.title} ${video.channel} ${video.description} ${video.category}`
            .toLowerCase();

        return combined.includes(
          value
        );

      }
    );

  if (text) {

    text.textContent =
      value
        ? `${results.length} result(s) for "${query}"`
        : "Search VYBE AI.";

  }

  grid.innerHTML = "";

  if (!value) {

    grid.innerHTML = `
      <div class="empty-state">
        Enter a search term.
      </div>
    `;

    return;
  }

  if (!results.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No videos found for "${escapeHtml(query)}".
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
   WATCH VIDEO
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

  currentVideo =
    video;

  showPage(
    "watchPage"
  );

  loadVideoPlayer(
    video
  );

  updateWatchInfo(
    video
  );

  addToHistory(
    video
  );

  renderComments();

  renderRecommended();

  updateWatchButtons();

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

  if (!mainVideo ||
      !youtubePlayer ||
      !placeholder) {
    return;
  }

  mainVideo.pause();

  mainVideo.removeAttribute(
    "src"
  );

  mainVideo.load();

  mainVideo.style.display =
    "none";

  youtubePlayer.innerHTML =
    "";

  youtubePlayer.style.display =
    "none";

  placeholder.style.display =
    "grid";


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
      `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;

    iframe.title =
      video.title;

    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen =
      true;

    youtubePlayer.appendChild(
      iframe
    );

    youtubePlayer.style.display =
      "block";

    placeholder.style.display =
      "none";

    return;
  }


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

    mainVideo.load();

    return;
  }


  placeholder.innerHTML = `
    <div class="play-big">▶</div>
    <p>
      Add a YouTube or direct video URL
    </p>
  `;

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

  if (title)
    title.textContent =
      video.title;

  if (views)
    views.textContent =
      video.views ||
      "0 views";

  if (date)
    date.textContent =
      video.date ||
      "Just now";

  if (channel)
    channel.textContent =
      video.channel ||
      "VYBE AI";

  if (subscribers)
    subscribers.textContent =
      `${video.subscribers || "0"} subscribers`;

  if (description)
    description.textContent =
      video.description ||
      "No description available.";

  if (avatar)
    avatar.textContent =
      (
        video.channel ||
        "V"
      )
      .charAt(0)
      .toUpperCase();

}


/* ==========================================
   WATCH ACTIONS
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

  const commentInput =
    document.getElementById(
      "commentInput"
    );

  const watchBackBtn =
    document.getElementById(
      "watchBackBtn"
    );


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
      shareVideo
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


  if (commentInput) {

    commentInput.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Enter"
        ) {

          event.preventDefault();

          addComment();

        }

      }
    );

  }


  if (watchBackBtn) {

    watchBackBtn.addEventListener(
      "click",
      () =>
        showPage("homePage")
    );

  }

}


function toggleLike() {

  if (!currentVideo) {
    return;
  }

  const id =
    String(
      currentVideo.id
    );

  if (
    likedVideos.includes(id)
  ) {

    likedVideos =
      likedVideos.filter(
        item => item !== id
      );

    showToast(
      "Removed Like"
    );

  } else {

    likedVideos.push(id);

    showToast(
      "Video Liked 👍"
    );

  }

  localStorage.setItem(
    "vybe_liked_videos",
    JSON.stringify(
      likedVideos
    )
  );

  updateWatchButtons();

}


function toggleSave() {

  if (!currentVideo) {
    return;
  }

  const id =
    String(
      currentVideo.id
    );

  if (
    savedVideos.includes(id)
  ) {

    savedVideos =
      savedVideos.filter(
        item => item !== id
      );

    showToast(
      "Removed from Saved"
    );

  } else {

    savedVideos.push(id);

    showToast(
      "Video Saved 🔖"
    );

  }

  localStorage.setItem(
    "vybe_saved_videos",
    JSON.stringify(
      savedVideos
    )
  );

  updateWatchButtons();

}


async function shareVideo() {

  if (!currentVideo) {
    return;
  }

  const url =
    currentVideo.videoUrl ||
    window.location.href;

  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title:
          currentVideo.title,
        text:
          `Watch ${currentVideo.title} on VYBE AI`,
        url
      });

    } else {

      await navigator.clipboard.writeText(
        url
      );

      showToast(
        "Video link copied."
      );

    }

  } catch (error) {

    console.log(
      "Share cancelled."
    );

  }

}


function toggleSubscribe() {

  if (!currentVideo) {
    return;
  }

  const channel =
    currentVideo.channel ||
    "VYBE AI";

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
      "Unsubscribed"
    );

  } else {

    subscriptions.push(
      channel
    );

    showToast(
      "Subscribed ✓"
    );

  }

  localStorage.setItem(
    "vybe_subscriptions",
    JSON.stringify(
      subscriptions
    )
  );

  updateWatchButtons();

}


function updateWatchButtons() {

  if (!currentVideo) {
    return;
  }

  const id =
    String(
      currentVideo.id
    );

  const likeBtn =
    document.getElementById(
      "likeBtn"
    );

  const saveBtn =
    document.getElementById(
      "saveBtn"
    );

  const subscribeBtn =
    document.getElementById(
      "subscribeBtn"
    );


  if (likeBtn) {

    likeBtn.textContent =
      likedVideos.includes(id)
        ? "👍 Liked"
        : "👍 Like";

  }


  if (saveBtn) {

    saveBtn.textContent =
      savedVideos.includes(id)
        ? "🔖 Saved"
        : "🔖 Save";

  }


  if (subscribeBtn) {

    subscribeBtn.textContent =
      subscriptions.includes(
        currentVideo.channel
      )
        ? "Subscribed"
        : "Subscribe";

  }

}


/* ==========================================
   HISTORY
========================================== */

function addToHistory(video) {

  const id =
    String(video.id);

  watchHistory =
    watchHistory.filter(
      item =>
        String(item.id) !==
        id
    );

  watchHistory.unshift(
    video
  );

  watchHistory =
    watchHistory.slice(
      0,
      50
    );

  localStorage.setItem(
    "vybe_history",
    JSON.stringify(
      watchHistory
    )
  );

}


function renderHistory() {

  const grid =
    document.getElementById(
      "historyGrid"
    );

  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  if (!watchHistory.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No watch history yet.
      </div>
    `;

    return;
  }

  watchHistory.forEach(
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

  if (!grid) {
    return;
  }

  const saved =
    videos.filter(
      video =>
        savedVideos.includes(
          String(video.id)
        )
    );

  grid.innerHTML = "";

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

  if (!grid) {
    return;
  }

  const subscribed =
    videos.filter(
      video =>
        subscriptions.includes(
          video.channel
        )
    );

  grid.innerHTML = "";

  if (!subscribed.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No subscriptions yet.
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

function renderComments() {

  const list =
    document.getElementById(
      "commentsList"
    );

  if (!list ||
      !currentVideo) {
    return;
  }

  const id =
    String(
      currentVideo.id
    );

  const videoComments =
    comments[id] || [];

  list.innerHTML = "";

  if (!videoComments.length) {

    list.innerHTML = `
      <div class="notification-empty">
        No comments yet.
      </div>
    `;

    return;
  }

  videoComments.forEach(
    comment => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "comment";

      div.innerHTML = `

        <div class="mini-avatar">
          ${escapeHtml(
            comment.name
              .charAt(0)
              .toUpperCase()
          )}
        </div>

        <div>
          <strong>
            ${escapeHtml(
              comment.name
            )}
          </strong>

          <p>
            ${escapeHtml(
              comment.text
            )}
          </p>
        </div>

      `;

      list.appendChild(
        div
      );

    }
  );

}


function addComment() {

  if (!currentVideo) {
    return;
  }

  const input =
    document.getElementById(
      "commentInput"
    );

  if (!input) {
    return;
  }

  const text =
    input.value.trim();

  if (!text) {

    showToast(
      "Write a comment first."
    );

    return;
  }

  const id =
    String(
      currentVideo.id
    );

  if (!comments[id]) {
    comments[id] = [];
  }

  comments[id].unshift({
    name: "You",
    text
  });

  localStorage.setItem(
    "vybe_comments",
    JSON.stringify(
      comments
    )
  );

  input.value = "";

  renderComments();

  showToast(
    "Comment added."
  );

}


/* ==========================================
   RECOMMENDED
========================================== */

function renderRecommended() {

  const grid =
    document.getElementById(
      "recommendedGrid"
    );

  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  const recommended =
    videos
      .filter(
        video =>
          !currentVideo ||
          String(video.id) !==
          String(currentVideo.id)
      )
      .slice(
        0,
        8
      );

  recommended.forEach(
    video => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "recommended-card";

      const thumbnail =
        getYouTubeThumbnail(
          video.videoUrl
        );

      card.innerHTML = `

        <div class="recommended-thumb">

          ${
            thumbnail
              ? `
                <img
                  src="${escapeHtml(thumbnail)}"
                  alt=""
                  style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:8px;
                  "
                >
              `
              : `
                <span>
                  ${video.icon || "🎬"}
                </span>
              `
          }

        </div>

        <div>

          <div class="recommended-title">
            ${escapeHtml(video.title)}
          </div>

          <div class="recommended-meta">
            ${escapeHtml(video.channel)}
          </div>

          <div class="recommended-meta">
            ${escapeHtml(video.views)}
          </div>

        </div>

      `;

      card.addEventListener(
        "click",
        () =>
          openVideo(
            video.id
          )
      );

      grid.appendChild(
        card
      );

    }
  );

}


/* ==========================================
   ADD VIDEO
========================================== */

function setupUpload() {

  const createBtn =
    document.getElementById(
      "createBtn"
    );

  const heroCreateBtn =
    document.getElementById(
      "heroCreateBtn"
    );

  const creatorAddBtn =
    document.getElementById(
      "creatorAddBtn"
    );

  const heroExploreBtn =
    document.getElementById(
      "heroExploreBtn"
    );

  const form =
    document.getElementById(
      "uploadForm"
    );


  [
    createBtn,
    heroCreateBtn,
    creatorAddBtn
  ].forEach(
    button => {

      if (button) {

        button.addEventListener(
          "click",
          () =>
            openModal(
              "uploadModal"
            )
        );

      }

    }
  );


  if (heroExploreBtn) {

    heroExploreBtn.addEventListener(
      "click",
      () =>
        document.getElementById(
          "videoGrid"
        )?.scrollIntoView({
          behavior: "smooth"
        })
    );

  }


  if (form) {

    form.addEventListener(
      "submit",
      handleAddVideo
    );

  }


  document
    .querySelectorAll(
      "[data-close]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () =>
            closeModal(
              button.dataset.close
            )
        );

      }
    );

}


function handleAddVideo(event) {

  event.preventDefault();

  const url =
    document.getElementById(
      "videoUrl"
    ).value.trim();

  const title =
    document.getElementById(
      "videoTitle"
    ).value.trim();

  const description =
    document.getElementById(
      "videoDescription"
    ).value.trim();

  const category =
    document.getElementById(
      "videoCategory"
    ).value;


  const youtubeId =
    getYouTubeId(url);

  const direct =
    isDirectVideoUrl(url);


  if (!youtubeId &&
      !direct) {

    showToast(
      "Please enter a valid YouTube or direct video URL."
    );

    return;
  }


  if (!title) {

    showToast(
      "Video title is required."
    );

    return;
  }


  const newVideo = {

    id:
      Date.now(),

    title,

    channel:
      "You",

    views:
      "0 views",

    date:
      "Just now",

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
      url

  };


  videos.unshift(
    newVideo
  );


  event.target.reset();

  closeModal(
    "uploadModal"
  );

  renderVideos();

  showToast(
    "Video added successfully."
  );

  setTimeout(
    () =>
      openVideo(
        newVideo.id
      ),
    150
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

  const form =
    document.getElementById(
      "loginForm"
    );


  if (loginBtn) {

    loginBtn.addEventListener(
      "click",
      async () => {

        if (
          supabaseClient
        ) {

          try {

            const {
              data
            } =
              await supabaseClient
                .auth
                .getUser();

            if (
              data &&
              data.user
            ) {

              await supabaseClient
                .auth
                .signOut();

              updateLoginButton();

              showToast(
                "Logged out."
              );

              return;

            }

          } catch (error) {

            console.error(
              error
            );

          }

        }

        openModal(
          "loginModal"
        );

      }
    );

  }


  if (form) {

    form.addEventListener(
      "submit",
      handleLogin
    );

  }

}


async function handleLogin(event) {

  event.preventDefault();

  if (!supabaseClient) {

    showToast(
      "Supabase is not configured."
    );

    return;
  }

  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    ).value;


  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .auth
        .signInWithPassword({
          email,
          password
        });


    if (error) {
      throw error;
    }


    closeModal(
      "loginModal"
    );

    updateLoginButton();

    showToast(
      "Login successful."
    );


    if (
      data &&
      data.user
    ) {

      console.log(
        "Logged in:",
        data.user.email
      );

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


async function updateLoginButton() {

  const button =
    document.getElementById(
      "loginBtn"
    );

  if (!button) {
    return;
  }

  if (!supabaseClient) {

    button.textContent =
      "Login";

    return;
  }

  try {

    const {
      data
    } =
      await supabaseClient
        .auth
        .getUser();

    button.textContent =
      data &&
      data.user
        ? "Logout"
        : "Login";

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
      () =>
        panel.classList.remove(
          "show"
        )
    );

  }


  document.addEventListener(
    "click",
    event => {

      if (
        panel &&
        !panel.contains(
          event.target
        ) &&
        event.target !== button
      ) {

        panel.classList.remove(
          "show"
        );

      }

    }
  );

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


  if (!button ||
      !sidebar) {
    return;
  }


  button.addEventListener(
    "click",
    () =>
      sidebar.classList.toggle(
        "open"
      )
  );

}


function closeSidebar() {

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
   LOGO
========================================== */

function setupLogo() {

  const logo =
    document.getElementById(
      "logoBtn"
    );

  if (logo) {

    logo.addEventListener(
      "click",
      () => {

        showPage(
          "homePage"
        );

        currentCategory =
          "All";

        document
          .querySelectorAll(
            ".category"
          )
          .forEach(
            item =>
              item.classList.toggle(
                "active",
                item.dataset.category ===
                "All"
              )
          );

        renderVideos();

      }
    );

  }

}


/* ==========================================
   MODALS
========================================== */

function openModal(id) {

  const modal =
    document.getElementById(
      id
    );

  if (modal) {

    modal.classList.add(
      "show"
    );

  }

}


function closeModal(id) {

  const modal =
    document.getElementById(
      id
    );

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


document.addEventListener(
  "click",
  event => {

    if (
      event.target.classList.contains(
        "modal"
      )
    ) {

      event.target.classList.remove(
        "show"
      );

    }

  }
);


/* ==========================================
   TOAST
========================================== */

let toastTimer = null;

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  if (!toast) {
    return;
  }

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () =>
        toast.classList.remove(
          "show"
        ),
      2500
    );

}


/* ==========================================
   SUPABASE CHECK
========================================== */

async function checkSupabaseConnection() {

  if (!supabaseClient) {

    console.warn(
      "Supabase client is not available."
    );

    return;
  }


  try {

    const {
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
      "Supabase connection OK."
    );

  } catch (error) {

    console.warn(
      "Supabase connection check failed:",
      error
    );

  }


  updateLoginButton();

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHtml(value) {

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

  addVideo(video) {

    if (!video) {
      return;
    }

    videos.unshift(
      video
    );

    renderVideos();

  }

};
