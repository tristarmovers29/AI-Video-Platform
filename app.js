/* =====================================================
   VYBE AI
   Main Application
   Step 4 - Supabase Connection
===================================================== */


/* =====================================================
   SUPABASE CONNECTION
===================================================== */

const SUPABASE_URL =
  "https://wnhnjbrrszmybvxgtbin.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_E0HAjFvs98-9lmEJtBzSzw_6ZYpXaAw";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

console.log(
  "VYBE AI → Supabase connected"
);


/* =====================================================
   DEMO VIDEO DATA
===================================================== */

let videos = [

  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    channel: "VYBE AI",
    views: "1.2M",
    date: "2 days ago",
    category: "AI",
    duration: "10:24",
    description:
      "Discover how artificial intelligence is changing the world and what the future may look like.",
    icon: "🤖",
    likes: 15200,
    subscribers: "245K",
    videoUrl: ""
  },

  {
    id: 2,
    title: "Build Your First AI App",
    channel: "Tech Vision",
    views: "845K",
    date: "5 days ago",
    category: "Technology",
    duration: "18:42",
    description:
      "A simple introduction to building powerful AI applications.",
    icon: "💻",
    likes: 8900,
    subscribers: "182K",
    videoUrl: ""
  },

  {
    id: 3,
    title: "Amazing Future Technology",
    channel: "Future Lab",
    views: "2.1M",
    date: "1 week ago",
    category: "Technology",
    duration: "12:30",
    description:
      "Explore the technologies that could define the next decade.",
    icon: "🚀",
    likes: 24100,
    subscribers: "510K",
    videoUrl: ""
  },

  {
    id: 4,
    title: "Top Gaming Moments",
    channel: "Game Zone",
    views: "3.4M",
    date: "3 days ago",
    category: "Gaming",
    duration: "14:08",
    description:
      "The most exciting gaming moments collected in one video.",
    icon: "🎮",
    likes: 31000,
    subscribers: "720K",
    videoUrl: ""
  },

  {
    id: 5,
    title: "How Successful Businesses Think",
    channel: "Business Daily",
    views: "620K",
    date: "4 days ago",
    category: "Business",
    duration: "16:15",
    description:
      "Lessons from successful entrepreneurs and modern businesses.",
    icon: "💼",
    likes: 7600,
    subscribers: "98K",
    videoUrl: ""
  },

  {
    id: 6,
    title: "Beautiful Places Around The World",
    channel: "Travel Vibes",
    views: "1.8M",
    date: "6 days ago",
    category: "Travel",
    duration: "21:10",
    description:
      "Travel through some of the most beautiful places around the world.",
    icon: "🌍",
    likes: 19000,
    subscribers: "430K",
    videoUrl: ""
  },

  {
    id: 7,
    title: "Learn Faster With AI",
    channel: "Smart Learning",
    views: "455K",
    date: "1 day ago",
    category: "Education",
    duration: "09:45",
    description:
      "Use AI tools to improve your learning and productivity.",
    icon: "📚",
    likes: 5400,
    subscribers: "76K",
    videoUrl: ""
  },

  {
    id: 8,
    title: "Latest Technology News",
    channel: "Tech News",
    views: "920K",
    date: "8 hours ago",
    category: "News",
    duration: "08:20",
    description:
      "Today's biggest technology stories and updates.",
    icon: "📰",
    likes: 7200,
    subscribers: "201K",
    videoUrl: ""
  }

];


let shorts = [

  {
    id: 101,
    title: "AI in 30 Seconds",
    channel: "VYBE AI",
    icon: "🤖"
  },

  {
    id: 102,
    title: "Amazing Technology",
    channel: "Future Lab",
    icon: "🚀"
  },

  {
    id: 103,
    title: "Gaming Trick",
    channel: "Game Zone",
    icon: "🎮"
  },

  {
    id: 104,
    title: "Business Tip",
    channel: "Business Daily",
    icon: "💼"
  },

  {
    id: 105,
    title: "Travel Secret",
    channel: "Travel Vibes",
    icon: "🌍"
  },

  {
    id: 106,
    title: "Learn With AI",
    channel: "Smart Learning",
    icon: "📚"
  }

];


/* =====================================================
   STATE
===================================================== */

let currentVideo = null;

let selectedCategory = "All";

let likedVideos =
  JSON.parse(
    localStorage.getItem("vybeLikedVideos") || "[]"
  );

let savedVideos =
  JSON.parse(
    localStorage.getItem("vybeSavedVideos") || "[]"
  );

let history =
  JSON.parse(
    localStorage.getItem("vybeHistory") || "[]"
  );

let subscriptions =
  JSON.parse(
    localStorage.getItem("vybeSubscriptions") || "[]"
  );

let comments =
  JSON.parse(
    localStorage.getItem("vybeComments") || "{}"
  );


/* =====================================================
   DOM
===================================================== */

const videoGrid =
  document.getElementById("videoGrid");

const shortsGrid =
  document.getElementById("shortsGrid");

const dynamicPage =
  document.getElementById("dynamicPage");

const dynamicTitle =
  document.getElementById("dynamicTitle");

const dynamicSubtitle =
  document.getElementById("dynamicSubtitle");

const dynamicVideoGrid =
  document.getElementById("dynamicVideoGrid");

const watchPage =
  document.getElementById("watchPage");

const homePage =
  document.getElementById("homePage");

const channelPage =
  document.getElementById("channelPage");

const uploadModal =
  document.getElementById("uploadModal");

const loginModal =
  document.getElementById("loginModal");

const notificationPanel =
  document.getElementById("notificationPanel");

const toast =
  document.getElementById("toast");


/* =====================================================
   INITIALIZATION
===================================================== */

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

    checkSupabaseConnection();

  }
);


/* =====================================================
   SUPABASE TEST
===================================================== */

async function checkSupabaseConnection() {

  try {

    const {
      data,
      error
    } = await supabaseClient
      .from("videos")
      .select("id")
      .limit(1);

    /*
      Table may not exist yet.

      This is expected in Step 4.
    */

    if (error) {

      console.log(
        "Supabase connected. Database table not created yet."
      );

      return;
    }

    console.log(
      "VYBE AI database connection successful."
    );

  } catch (error) {

    console.error(
      "Supabase connection error:",
      error
    );

  }

}


/* =====================================================
   RENDER VIDEOS
===================================================== */

function renderVideos(list = null) {

  const data =
    list ||
    filterByCategory(videos);

  videoGrid.innerHTML = "";

  if (!data.length) {

    videoGrid.innerHTML =
      emptyVideos();

    return;
  }

  data.forEach(
    video => {

      videoGrid.appendChild(
        createVideoCard(video)
      );

    }
  );

}


/* =====================================================
   CREATE VIDEO CARD
===================================================== */

function createVideoCard(video) {

  const card =
    document.createElement("article");

  card.className =
    "video-card";

  card.innerHTML = `

    <div class="thumbnail">

      ${
        video.thumbnail
          ?
          `<img
             src="${escapeAttribute(video.thumbnail)}"
             alt="${escapeAttribute(video.title)}">`
          :
          `
          <div class="thumbnail-gradient">
            ${video.icon || "▶"}
          </div>
          `
      }

      <span class="duration">
        ${escapeHtml(video.duration || "00:00")}
      </span>

    </div>

    <div class="video-info">

      <div class="mini-avatar">
        ${getInitial(video.channel)}
      </div>

      <div>

        <div class="video-title">
          ${escapeHtml(video.title)}
        </div>

        <div class="video-channel">
          ${escapeHtml(video.channel)}
        </div>

        <div class="video-meta">
          ${escapeHtml(video.views || "0 views")}
          •
          ${escapeHtml(video.date || "Today")}
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


/* =====================================================
   FILTER CATEGORY
===================================================== */

function filterByCategory(list) {

  if (selectedCategory === "All") {

    return list;

  }

  return list.filter(
    video =>
      video.category === selectedCategory
  );

}


/* =====================================================
   SHORTS
===================================================== */

function renderShorts() {

  shortsGrid.innerHTML = "";

  shorts.forEach(
    short => {

      const card =
        document.createElement("article");

      card.className =
        "short-card";

      card.innerHTML = `

        <div class="short-thumb">
          <span>${short.icon}</span>
        </div>

        <div class="short-title">
          ${escapeHtml(short.title)}
        </div>

      `;

      card.addEventListener(
        "click",
        () => showToast("Shorts player coming next.")
      );

      shortsGrid.appendChild(card);

    }
  );

}


/* =====================================================
   OPEN VIDEO
===================================================== */

function openVideo(id) {

  const video =
    videos.find(
      item => item.id === id
    );

  if (!video) {

    showToast(
      "Video not found."
    );

    return;
  }

  currentVideo = video;

  addToHistory(video.id);

  homePage.style.display = "none";

  dynamicPage.style.display = "none";

  channelPage.style.display = "none";

  watchPage.style.display = "block";

  populateWatchPage(video);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   WATCH PAGE
===================================================== */

function populateWatchPage(video) {

  const player =
    document.getElementById("mainVideo");

  const placeholder =
    document.getElementById(
      "playerPlaceholder"
    );

  document.getElementById(
    "watchTitle"
  ).textContent =
    video.title;

  document.getElementById(
    "watchViews"
  ).textContent =
    `${video.views || "0 views"}`;

  document.getElementById(
    "watchDate"
  ).textContent =
    video.date || "Today";

  document.getElementById(
    "watchChannel"
  ).textContent =
    video.channel;

  document.getElementById(
    "watchSubscribers"
  ).textContent =
    `${video.subscribers || "0"} subscribers`;

  document.getElementById(
    "watchDescription"
  ).textContent =
    video.description || "";

  document.getElementById(
    "watchChannelAvatar"
  ).textContent =
    getInitial(video.channel);

  document.getElementById(
    "likeCount"
  ).textContent =
    formatNumber(
      video.likes || 0
    );

  const subscribeBtn =
    document.getElementById(
      "subscribeBtn"
    );

  const subscribed =
    subscriptions.includes(
      video.channel
    );

  subscribeBtn.textContent =
    subscribed
      ? "Subscribed"
      : "Subscribe";

  if (video.videoUrl) {

    player.src =
      video.videoUrl;

    player.style.display =
      "block";

    placeholder.style.display =
      "none";

  } else {

    player.removeAttribute(
      "src"
    );

    player.style.display =
      "none";

    placeholder.style.display =
      "grid";

  }

  renderComments(video.id);

  renderRecommended(video.id);

}


/* =====================================================
   RECOMMENDED
===================================================== */

function renderRecommended(currentId) {

  const container =
    document.getElementById(
      "recommendedList"
    );

  container.innerHTML = "";

  videos
    .filter(
      video => video.id !== currentId
    )
    .slice(0, 6)
    .forEach(
      video => {

        const card =
          document.createElement("div");

        card.className =
          "recommended-card";

        card.innerHTML = `

          <div class="recommended-thumb">
            ${video.icon || "▶"}
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
          () => openVideo(video.id)
        );

        container.appendChild(card);

      }
    );

}


/* =====================================================
   COMMENTS
===================================================== */

function renderComments(videoId) {

  const list =
    document.getElementById(
      "commentsList"
    );

  list.innerHTML = "";

  const videoComments =
    comments[videoId] || [];

  if (!videoComments.length) {

    list.innerHTML = `
      <p style="
        color:#9aa4b5;
        padding:20px 0;
      ">
        No comments yet. Be the first to comment.
      </p>
    `;

    return;
  }

  videoComments
    .slice()
    .reverse()
    .forEach(
      comment => {

        const div =
          document.createElement("div");

        div.className =
          "comment";

        div.innerHTML = `

          <div class="mini-avatar">
            U
          </div>

          <div>

            <strong>
              ${escapeHtml(comment.user)}
            </strong>

            <p>
              ${escapeHtml(comment.text)}
            </p>

          </div>

        `;

        list.appendChild(div);

      }
    );

}


/* =====================================================
   ADD COMMENT
===================================================== */

function addComment() {

  if (!currentVideo) {

    return;
  }

  const input =
    document.getElementById(
      "commentInput"
    );

  const text =
    input.value.trim();

  if (!text) {

    showToast(
      "Write a comment first."
    );

    return;
  }

  if (!comments[currentVideo.id]) {

    comments[currentVideo.id] = [];

  }

  comments[currentVideo.id].push({

    user: "You",

    text: text,

    createdAt:
      new Date().toISOString()

  });

  localStorage.setItem(
    "vybeComments",
    JSON.stringify(comments)
  );

  input.value = "";

  renderComments(
    currentVideo.id
  );

  showToast(
    "Comment added."
  );

}


/* =====================================================
   LIKE
===================================================== */

function toggleLike() {

  if (!currentVideo) {

    return;
  }

  const id =
    currentVideo.id;

  const index =
    likedVideos.indexOf(id);

  if (index === -1) {

    likedVideos.push(id);

    currentVideo.likes =
      (currentVideo.likes || 0) + 1;

    showToast(
      "Video liked 👍"
    );

  } else {

    likedVideos.splice(
      index,
      1
    );

    currentVideo.likes =
      Math.max(
        0,
        (currentVideo.likes || 0) - 1
      );

    showToast(
      "Like removed."
    );

  }

  localStorage.setItem(
    "vybeLikedVideos",
    JSON.stringify(likedVideos)
  );

  document.getElementById(
    "likeCount"
  ).textContent =
    formatNumber(
      currentVideo.likes
    );

}


/* =====================================================
   SAVE
===================================================== */

function toggleSave() {

  if (!currentVideo) {

    return;
  }

  const id =
    currentVideo.id;

  const index =
    savedVideos.indexOf(id);

  if (index === -1) {

    savedVideos.push(id);

    showToast(
      "Saved to Watch later 🔖"
    );

  } else {

    savedVideos.splice(
      index,
      1
    );

    showToast(
      "Removed from Watch later."
    );

  }

  localStorage.setItem(
    "vybeSavedVideos",
    JSON.stringify(savedVideos)
  );

}


/* =====================================================
   SUBSCRIBE
===================================================== */

function toggleSubscribe() {

  if (!currentVideo) {

    return;
  }

  const channel =
    currentVideo.channel;

  const index =
    subscriptions.indexOf(
      channel
    );

  const btn =
    document.getElementById(
      "subscribeBtn"
    );

  if (index === -1) {

    subscriptions.push(
      channel
    );

    btn.textContent =
      "Subscribed";

    showToast(
      `Subscribed to ${channel}`
    );

  } else {

    subscriptions.splice(
      index,
      1
    );

    btn.textContent =
      "Subscribe";

    showToast(
      `Unsubscribed from ${channel}`
    );

  }

  localStorage.setItem(
    "vybeSubscriptions",
    JSON.stringify(
      subscriptions
    )
  );

}


/* =====================================================
   HISTORY
===================================================== */

function addToHistory(id) {

  history =
    history.filter(
      item => item !== id
    );

  history.unshift(id);

  history =
    history.slice(
      0,
      100
    );

  localStorage.setItem(
    "vybeHistory",
    JSON.stringify(history)
  );

}


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

  document
    .querySelectorAll(".nav-item[data-page]")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const page =
              button.dataset.page;

            showPage(page);

          }
        );

      }
    );

}


function showPage(page) {

  homePage.style.display =
    "none";

  watchPage.style.display =
    "none";

  channelPage.style.display =
    "none";

  dynamicPage.style.display =
    "block";

  let list = [];

  switch (page) {

    case "home":

      showHome();

      return;

    case "trending":

      dynamicTitle.textContent =
        "🔥 Trending";

      dynamicSubtitle.textContent =
        "What's popular on VYBE AI";

      list =
        [...videos];

      break;

    case "shorts":

      dynamicTitle.textContent =
        "⚡ Shorts";

      dynamicSubtitle.textContent =
        "Quick videos. Big VYBE.";

      renderDynamicShorts();

      return;

    case "subscriptions":

      dynamicTitle.textContent =
        "Subscriptions";

      dynamicSubtitle.textContent =
        "Videos from creators you follow";

      list =
        videos.filter(
          video =>
            subscriptions.includes(
              video.channel
            )
        );

      break;

    case "history":

      dynamicTitle.textContent =
        "History";

      dynamicSubtitle.textContent =
        "Videos you've watched";

      list =
        history
          .map(
            id =>
              videos.find(
                video =>
                  video.id === id
              )
          )
          .filter(Boolean);

      break;

    case "watchlater":

      dynamicTitle.textContent =
        "Watch later";

      dynamicSubtitle.textContent =
        "Your saved videos";

      list =
        savedVideos
          .map(
            id =>
              videos.find(
                video =>
                  video.id === id
              )
          )
          .filter(Boolean);

      break;

    case "liked":

      dynamicTitle.textContent =
        "Liked videos";

      dynamicSubtitle.textContent =
        "Videos you liked";

      list =
        likedVideos
          .map(
            id =>
              videos.find(
                video =>
                  video.id === id
              )
          )
          .filter(Boolean);

      break;

    default:

      showHome();

      return;
  }

  renderDynamicVideos(list);

  updateActiveNav(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   HOME
===================================================== */

function showHome() {

  homePage.style.display =
    "block";

  dynamicPage.style.display =
    "none";

  watchPage.style.display =
    "none";

  channelPage.style.display =
    "none";

  updateActiveNav(
    "home"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   DYNAMIC VIDEOS
===================================================== */

function renderDynamicVideos(list) {

  dynamicVideoGrid.innerHTML = "";

  if (!list.length) {

    dynamicVideoGrid.innerHTML =
      emptyVideos();

    return;

  }

  list.forEach(
    video => {

      dynamicVideoGrid.appendChild(
        createVideoCard(video)
      );

    }
  );

}


function renderDynamicShorts() {

  dynamicVideoGrid.innerHTML = "";

  shorts.forEach(
    short => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "video-card";

      card.innerHTML = `

        <div class="thumbnail">

          <div class="thumbnail-gradient">
            ${short.icon}
          </div>

        </div>

        <div class="video-info">

          <div class="mini-avatar">
            ${getInitial(short.channel)}
          </div>

          <div>

            <div class="video-title">
              ${escapeHtml(short.title)}
            </div>

            <div class="video-channel">
              ${escapeHtml(short.channel)}
            </div>

          </div>

        </div>
      `;

      dynamicVideoGrid.appendChild(card);

    }
  );

}


/* =====================================================
   ACTIVE NAV
===================================================== */

function updateActiveNav(page) {

  document
    .querySelectorAll(
      ".nav-item[data-page]"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.page === page
        );

      }
    );

}


/* =====================================================
   CATEGORIES
===================================================== */

function setupCategories() {

  document
    .querySelectorAll(".category")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

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

            selectedCategory =
              button.dataset.category;

            renderVideos();

          }
        );

      }
    );

}


/* =====================================================
   SEARCH
===================================================== */

function setupSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );

  const button =
    document.getElementById(
      "searchBtn"
    );

  function performSearch() {

    const query =
      input.value
        .trim()
        .toLowerCase();

    if (!query) {

      showHome();

      return;
    }

    const results =
      videos.filter(
        video => {

          return (

            video.title
              .toLowerCase()
              .includes(query)

            ||

            video.channel
              .toLowerCase()
              .includes(query)

            ||

            video.category
              .toLowerCase()
              .includes(query)

          );

        }
      );

    homePage.style.display =
      "none";

    watchPage.style.display =
      "none";

    channelPage.style.display =
      "none";

    dynamicPage.style.display =
      "block";

    dynamicTitle.textContent =
      `Search results for "${input.value}"`;

    dynamicSubtitle.textContent =
      `${results.length} video(s) found`;

    renderDynamicVideos(
      results
    );

    updateActiveNav("");

  }

  button.addEventListener(
    "click",
    performSearch
  );

  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        performSearch();

      }

    }
  );


  /* Voice Search */

  const voiceBtn =
    document.getElementById(
      "voiceSearchBtn"
    );

  voiceBtn.addEventListener(
    "click",
    startVoiceSearch
  );

}


/* =====================================================
   VOICE SEARCH
===================================================== */

function startVoiceSearch() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    showToast(
      "Voice search is not supported in this browser."
    );

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang =
    "en-US";

  recognition.interimResults =
    false;

  recognition.continuous =
    false;

  recognition.start();

  showToast(
    "Listening..."
  );

  recognition.onresult =
    event => {

      const text =
        event.results[0][0].transcript;

      document.getElementById(
        "searchInput"
      ).value = text;

      document.getElementById(
        "searchBtn"
      ).click();

    };

  recognition.onerror =
    () => {

      showToast(
        "Voice search failed."
      );

    };

}


/* =====================================================
   UPLOAD
===================================================== */

function setupUpload() {

  const buttons = [

    document.getElementById(
      "uploadTopBtn"
    ),

    document.getElementById(
      "sidebarUpload"
    ),

    document.getElementById(
      "heroUploadBtn"
    ),

    document.getElementById(
      "creatorUploadBtn"
    )

  ];

  buttons.forEach(
    button => {

      if (!button) return;

      button.addEventListener(
        "click",
        () => {

          uploadModal.classList.add(
            "show"
          );

        }
      );

    }
  );


  document
    .getElementById(
      "uploadClose"
    )
    .addEventListener(
      "click",
      closeUpload
    );


  document
    .getElementById(
      "uploadForm"
    )
    .addEventListener(
      "submit",
      handleUpload
    );

}


function closeUpload() {

  uploadModal.classList.remove(
    "show"
  );

}


function handleUpload(event) {

  event.preventDefault();

  const title =
    document.getElementById(
      "uploadTitle"
    ).value.trim();

  const description =
    document.getElementById(
      "uploadDescription"
    ).value.trim();

  const category =
    document.getElementById(
      "uploadCategory"
    ).value;

  const file =
    document.getElementById(
      "uploadFile"
    ).files[0];

  if (!file) {

    showToast(
      "Please select a video."
    );

    return;
  }

  /*
    Local preview for Step 4.

    Real permanent upload to Supabase Storage
    will be added in the next database/storage step.
  */

  const videoUrl =
    URL.createObjectURL(
      file
    );

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

      "Uploaded to VYBE AI.",

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

  closeUpload();

  document
    .getElementById(
      "uploadForm"
    )
    .reset();

  renderVideos();

  showToast(
    "Video added to VYBE AI preview."
  );

  openVideo(
    newVideo.id
  );

}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

  document
    .getElementById(
      "loginBtn"
    )
    .addEventListener(
      "click",
      () => {

        loginModal.classList.add(
          "show"
        );

      }
    );


  document
    .getElementById(
      "loginClose"
    )
    .addEventListener(
      "click",
      () => {

        loginModal.classList.remove(
          "show"
        );

      }
    );


  document
    .getElementById(
      "loginForm"
    )
    .addEventListener(
      "submit",
      handleLogin
    );

}


async function handleLogin(event) {

  event.preventDefault();

  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    ).value;

  if (!email || !password) {

    showToast(
      "Enter email and password."
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

      showToast(
        error.message
      );

      return;
    }


    loginModal.classList.remove(
      "show"
    );

    showLoggedInUser(
      data.user
    );

    showToast(
      "Signed in successfully."
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Login failed."
    );

  }

}


/* =====================================================
   SHOW LOGGED USER
===================================================== */

function showLoggedInUser(user) {

  const loginBtn =
    document.getElementById(
      "loginBtn"
    );

  const avatar =
    document.getElementById(
      "userAvatar"
    );

  loginBtn.style.display =
    "none";

  avatar.style.display =
    "grid";

  avatar.textContent =
    getInitial(
      user.email || "User"
    );

}


/* =====================================================
   CHECK SESSION
===================================================== */

async function checkSession() {

  const {
    data
  } =
    await supabaseClient.auth.getSession();

  if (
    data &&
    data.session &&
    data.session.user
  ) {

    showLoggedInUser(
      data.session.user
    );

  }

}


/* =====================================================
   WATCH ACTIONS
===================================================== */

function setupWatchActions() {

  document
    .getElementById(
      "likeBtn"
    )
    .addEventListener(
      "click",
      toggleLike
    );


  document
    .getElementById(
      "saveBtn"
    )
    .addEventListener(
      "click",
      toggleSave
    );


  document
    .getElementById(
      "subscribeBtn"
    )
    .addEventListener(
      "click",
      toggleSubscribe
    );


  document
    .getElementById(
      "commentBtn"
    )
    .addEventListener(
      "click",
      addComment
    );


  document
    .getElementById(
      "commentInput"
    )
    .addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          addComment();

        }

      }
    );


  document
    .getElementById(
      "shareBtn"
    )
    .addEventListener(
      "click",
      shareCurrentVideo
    );

}


/* =====================================================
   SHARE
===================================================== */

async function shareCurrentVideo() {

  if (!currentVideo) {

    return;
  }

  const url =
    window.location.href;

  if (
    navigator.share
  ) {

    try {

      await navigator.share({

        title:
          currentVideo.title,

        text:
          currentVideo.description,

        url:
          url

      });

    } catch (error) {

      /* User cancelled share */

    }

    return;
  }


  try {

    await navigator.clipboard.writeText(
      url
    );

    showToast(
      "Video link copied."
    );

  } catch (error) {

    showToast(
      "Unable to copy link."
    );

  }

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function setupNotifications() {

  document
    .getElementById(
      "notificationBtn"
    )
    .addEventListener(
      "click",
      () => {

        notificationPanel.classList.toggle(
          "show"
        );

      }
    );


  document
    .getElementById(
      "notificationClose"
    )
    .addEventListener(
      "click",
      () => {

        notificationPanel.classList.remove(
          "show"
        );

      }
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

function setupMobileMenu() {

  const menuBtn =
    document.getElementById(
      "menuBtn"
    );

  const sidebar =
    document.getElementById(
      "sidebar"
    );

  menuBtn.addEventListener(
    "click",
    () => {

      sidebar.classList.toggle(
        "open"
      );

    }
  );

}


/* =====================================================
   SCROLL
===================================================== */

function scrollToVideos() {

  document
    .getElementById(
      "videosSection"
    )
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =====================================================
   EMPTY STATE
===================================================== */

function emptyVideos() {

  return `

    <div style="
      grid-column:1/-1;
      padding:60px 20px;
      text-align:center;
      color:#9aa4b5;
    ">

      <div style="
        font-size:45px;
        margin-bottom:15px;
      ">
        🎬
      </div>

      <h3 style="
        color:white;
        margin-bottom:8px;
      ">
        No videos found
      </h3>

      <p>
        Try another search or category.
      </p>

    </div>

  `;

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {

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
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2800
    );

}


/* =====================================================
   HELPERS
===================================================== */

function getInitial(text) {

  if (!text) {

    return "V";

  }

  return text
    .trim()
    .charAt(0)
    .toUpperCase();

}


function formatNumber(number) {

  number =
    Number(number) || 0;

  if (
    number >= 1000000
  ) {

    return (
      (number / 1000000)
        .toFixed(1)
        .replace(".0", "")
      + "M"
    );

  }

  if (
    number >= 1000
  ) {

    return (
      (number / 1000)
        .toFixed(1)
        .replace(".0", "")
      + "K"
    );

  }

  return number.toString();

}


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


function escapeAttribute(value) {

  return escapeHtml(
    value
  );

}


/* =====================================================
   SUPABASE AUTH STATE
===================================================== */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    console.log(
      "VYBE AI Auth:",
      event
    );

    if (
      session &&
      session.user
    ) {

      showLoggedInUser(
        session.user
      );

    }

  }
);


/* =====================================================
   INITIAL SESSION CHECK
===================================================== */

checkSession();
