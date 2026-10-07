/* =====================================================
   VYBE AI
   Main Application
   Stable Step 5 Version
===================================================== */


/* =====================================================
   SUPABASE CONNECTION
===================================================== */

const SUPABASE_URL =
  "https://wnhnjbrrszmybvxgtbin.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_E0HAjFvs98-9lmEJtBzSzw_6ZYpXaAw";

let supabaseClient = null;

if (
  window.supabase &&
  typeof window.supabase.createClient === "function"
) {

  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

  console.log(
    "VYBE AI → Supabase connected"
  );

} else {

  console.error(
    "VYBE AI → Supabase library could not be loaded."
  );

}


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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
    videoUrl: "",
    thumbnail: ""
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
  loadLocalArray(
    "vybeLikedVideos"
  );

let savedVideos =
  loadLocalArray(
    "vybeSavedVideos"
  );

let history =
  loadLocalArray(
    "vybeHistory"
  );

let subscriptions =
  loadLocalArray(
    "vybeSubscriptions"
  );

let comments =
  loadLocalObject(
    "vybeComments"
  );


/* =====================================================
   DOM REFERENCES
===================================================== */

let videoGrid;
let shortsGrid;
let dynamicPage;
let dynamicTitle;
let dynamicSubtitle;
let dynamicVideoGrid;
let watchPage;
let homePage;
let channelPage;
let uploadModal;
let loginModal;
let notificationPanel;
let toast;


/* =====================================================
   DOM SETUP
===================================================== */

function cacheDom() {

  videoGrid =
    document.getElementById(
      "videoGrid"
    );

  shortsGrid =
    document.getElementById(
      "shortsGrid"
    );

  dynamicPage =
    document.getElementById(
      "dynamicPage"
    );

  dynamicTitle =
    document.getElementById(
      "dynamicTitle"
    );

  dynamicSubtitle =
    document.getElementById(
      "dynamicSubtitle"
    );

  dynamicVideoGrid =
    document.getElementById(
      "dynamicVideoGrid"
    );

  watchPage =
    document.getElementById(
      "watchPage"
    );

  homePage =
    document.getElementById(
      "homePage"
    );

  channelPage =
    document.getElementById(
      "channelPage"
    );

  uploadModal =
    document.getElementById(
      "uploadModal"
    );

  loginModal =
    document.getElementById(
      "loginModal"
    );

  notificationPanel =
    document.getElementById(
      "notificationPanel"
    );

  toast =
    document.getElementById(
      "toast"
    );

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);


function initializeApp() {

  cacheDom();

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

  setupExtraButtons();

  checkSupabaseConnection();

  checkSession();

  setupAuthListener();

  console.log(
    "VYBE AI initialized successfully."
  );

}


/* =====================================================
   EXTRA BUTTONS
===================================================== */

function setupExtraButtons() {

  const exploreBtn =
    document.getElementById(
      "exploreVideosBtn"
    );

  if (exploreBtn) {

    exploreBtn.addEventListener(
      "click",
      scrollToVideos
    );

  }


  const trendingBtn =
    document.getElementById(
      "viewTrendingBtn"
    );

  if (trendingBtn) {

    trendingBtn.addEventListener(
      "click",
      () => showPage("trending")
    );

  }


  const shortsBtn =
    document.getElementById(
      "viewShortsBtn"
    );

  if (shortsBtn) {

    shortsBtn.addEventListener(
      "click",
      () => showPage("shorts")
    );

  }


  const dynamicBackBtn =
    document.getElementById(
      "dynamicBackBtn"
    );

  if (dynamicBackBtn) {

    dynamicBackBtn.addEventListener(
      "click",
      showHome
    );

  }


  const watchBackBtn =
    document.getElementById(
      "watchBackBtn"
    );

  if (watchBackBtn) {

    watchBackBtn.addEventListener(
      "click",
      showHome
    );

  }


  const creatorStudioBtn =
    document.getElementById(
      "creatorStudioBtn"
    );

  if (creatorStudioBtn) {

    creatorStudioBtn.addEventListener(
      "click",
      () => {

        showToast(
          "Creator Studio will be added next."
        );

      }
    );

  }

}


/* =====================================================
   SUPABASE TEST
===================================================== */

async function checkSupabaseConnection() {

  if (!supabaseClient) {

    console.warn(
      "Supabase client is not available."
    );

    return;

  }

  try {

    const result =
      await supabaseClient
        .from("videos")
        .select("id")
        .limit(1);

    if (result.error) {

      console.warn(
        "Supabase database check:",
        result.error.message
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

  if (!videoGrid) {
    return;
  }

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
    document.createElement(
      "article"
    );

  card.className =
    "video-card";

  card.innerHTML = `

    <div class="thumbnail">

      ${
        video.thumbnail
          ?
          `
          <img
            src="${escapeAttribute(video.thumbnail)}"
            alt="${escapeAttribute(video.title)}"
            loading="lazy">
          `
          :
          `
          <div class="thumbnail-gradient">
            ${escapeHtml(video.icon || "▶")}
          </div>
          `
      }

      <span class="duration">
        ${escapeHtml(video.duration || "00:00")}
      </span>

    </div>


    <div class="video-info">

      <div class="mini-avatar">
        ${escapeHtml(
          getInitial(video.channel)
        )}
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

  if (
    selectedCategory === "All"
  ) {

    return list;

  }

  return list.filter(
    video =>
      video.category ===
      selectedCategory
  );

}


/* =====================================================
   SHORTS
===================================================== */

function renderShorts() {

  if (!shortsGrid) {
    return;
  }

  shortsGrid.innerHTML = "";

  shorts.forEach(
    short => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "short-card";

      card.innerHTML = `

        <div class="short-thumb">

          <span>
            ${escapeHtml(short.icon)}
          </span>

        </div>


        <div class="short-title">
          ${escapeHtml(short.title)}
        </div>

      `;


      card.addEventListener(
        "click",
        () => {

          showToast(
            "Shorts player coming next."
          );

        }
      );


      shortsGrid.appendChild(
        card
      );

    }
  );

}


/* =====================================================
   OPEN VIDEO
===================================================== */

function openVideo(id) {

  const video =
    videos.find(
      item =>
        item.id === id
    );

  if (!video) {

    showToast(
      "Video not found."
    );

    return;

  }

  currentVideo =
    video;

  addToHistory(
    video.id
  );


  hideAllPages();

  if (watchPage) {

    watchPage.style.display =
      "block";

  }


  populateWatchPage(
    video
  );


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
    document.getElementById(
      "mainVideo"
    );

  const placeholder =
    document.getElementById(
      "playerPlaceholder"
    );

  const watchTitle =
    document.getElementById(
      "watchTitle"
    );

  const watchViews =
    document.getElementById(
      "watchViews"
    );

  const watchDate =
    document.getElementById(
      "watchDate"
    );

  const watchChannel =
    document.getElementById(
      "watchChannel"
    );

  const watchSubscribers =
    document.getElementById(
      "watchSubscribers"
    );

  const watchDescription =
    document.getElementById(
      "watchDescription"
    );

  const watchAvatar =
    document.getElementById(
      "watchChannelAvatar"
    );

  const likeCount =
    document.getElementById(
      "likeCount"
    );

  const subscribeBtn =
    document.getElementById(
      "subscribeBtn"
    );


  if (watchTitle) {

    watchTitle.textContent =
      video.title;

  }


  if (watchViews) {

    watchViews.textContent =
      `${video.views || "0 views"}`;

  }


  if (watchDate) {

    watchDate.textContent =
      video.date || "Today";

  }


  if (watchChannel) {

    watchChannel.textContent =
      video.channel;

  }


  if (watchSubscribers) {

    watchSubscribers.textContent =
      `${video.subscribers || "0"} subscribers`;

  }


  if (watchDescription) {

    watchDescription.textContent =
      video.description || "";

  }


  if (watchAvatar) {

    watchAvatar.textContent =
      getInitial(
        video.channel
      );

  }


  if (likeCount) {

    likeCount.textContent =
      formatNumber(
        video.likes || 0
      );

  }


  if (subscribeBtn) {

    const subscribed =
      subscriptions.includes(
        video.channel
      );

    subscribeBtn.textContent =
      subscribed
        ? "Subscribed"
        : "Subscribe";

  }


  if (
    player &&
    placeholder
  ) {

    if (video.videoUrl) {

      player.src =
        video.videoUrl;

      player.style.display =
        "block";

      placeholder.style.display =
        "none";

      try {
        player.load();
      } catch (error) {
        console.warn(error);
      }

    } else {

      player.pause();

      player.removeAttribute(
        "src"
      );

      player.load();

      player.style.display =
        "none";

      placeholder.style.display =
        "grid";

    }

  }


  renderComments(
    video.id
  );

  renderRecommended(
    video.id
  );

}


/* =====================================================
   RECOMMENDED
===================================================== */

function renderRecommended(currentId) {

  const container =
    document.getElementById(
      "recommendedList"
    );

  if (!container) {
    return;
  }

  container.innerHTML = "";


  videos
    .filter(
      video =>
        video.id !== currentId
    )
    .slice(0, 6)
    .forEach(
      video => {

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "recommended-card";


        card.innerHTML = `

          <div class="recommended-thumb">
            ${escapeHtml(
              video.icon || "▶"
            )}
          </div>


          <div>

            <div class="recommended-title">
              ${escapeHtml(
                video.title
              )}
            </div>

            <div class="recommended-meta">
              ${escapeHtml(
                video.channel
              )}
            </div>

            <div class="recommended-meta">
              ${escapeHtml(
                video.views || "0 views"
              )}
            </div>

          </div>

        `;


        card.addEventListener(
          "click",
          () => openVideo(video.id)
        );


        container.appendChild(
          card
        );

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

  if (!list) {
    return;
  }

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
          document.createElement(
            "div"
          );

        div.className =
          "comment";


        div.innerHTML = `

          <div class="mini-avatar">
            U
          </div>


          <div>

            <strong>
              ${escapeHtml(
                comment.user
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


  if (
    !comments[currentVideo.id]
  ) {

    comments[currentVideo.id] =
      [];

  }


  comments[currentVideo.id].push({

    user:
      "You",

    text:
      text,

    createdAt:
      new Date().toISOString()

  });


  saveLocal(
    "vybeComments",
    comments
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
    likedVideos.indexOf(
      id
    );


  if (index === -1) {

    likedVideos.push(
      id
    );

    currentVideo.likes =
      (Number(currentVideo.likes) || 0) + 1;

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
        (Number(currentVideo.likes) || 0) - 1
      );

    showToast(
      "Like removed."
    );

  }


  saveLocal(
    "vybeLikedVideos",
    likedVideos
  );


  const likeCount =
    document.getElementById(
      "likeCount"
    );


  if (likeCount) {

    likeCount.textContent =
      formatNumber(
        currentVideo.likes
      );

  }

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
    savedVideos.indexOf(
      id
    );


  if (index === -1) {

    savedVideos.push(
      id
    );

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


  saveLocal(
    "vybeSavedVideos",
    savedVideos
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

    if (btn) {
      btn.textContent =
        "Subscribed";
    }

    showToast(
      `Subscribed to ${channel}`
    );

  } else {

    subscriptions.splice(
      index,
      1
    );

    if (btn) {
      btn.textContent =
        "Subscribe";
    }

    showToast(
      `Unsubscribed from ${channel}`
    );

  }


  saveLocal(
    "vybeSubscriptions",
    subscriptions
  );

}


/* =====================================================
   HISTORY
===================================================== */

function addToHistory(id) {

  history =
    history.filter(
      item =>
        item !== id
    );


  history.unshift(
    id
  );


  history =
    history.slice(
      0,
      100
    );


  saveLocal(
    "vybeHistory",
    history
  );

}


/* =====================================================
   NAVIGATION
===================================================== */

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

            const page =
              button.dataset.page;

            showPage(
              page
            );


            const sidebar =
              document.getElementById(
                "sidebar"
              );

            if (
              sidebar &&
              window.innerWidth <= 800
            ) {

              sidebar.classList.remove(
                "open"
              );

            }

          }
        );

      }
    );

}


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(page) {

  hideAllPages();


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

      dynamicPage.style.display =
        "block";

      renderDynamicShorts();

      updateActiveNav(
        "shorts"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

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


  dynamicPage.style.display =
    "block";


  renderDynamicVideos(
    list
  );


  updateActiveNav(
    page
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   HIDE ALL PAGES
===================================================== */

function hideAllPages() {

  if (homePage) {
    homePage.style.display =
      "none";
  }

  if (watchPage) {
    watchPage.style.display =
      "none";
  }

  if (channelPage) {
    channelPage.style.display =
      "none";
  }

  if (dynamicPage) {
    dynamicPage.style.display =
      "none";
  }

}


/* =====================================================
   HOME
===================================================== */

function showHome() {

  hideAllPages();


  if (homePage) {

    homePage.style.display =
      "block";

  }


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

  if (!dynamicVideoGrid) {
    return;
  }


  dynamicVideoGrid.innerHTML =
    "";


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


/* =====================================================
   DYNAMIC SHORTS
===================================================== */

function renderDynamicShorts() {

  if (!dynamicVideoGrid) {
    return;
  }


  dynamicVideoGrid.innerHTML =
    "";


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
            ${escapeHtml(
              short.icon
            )}
          </div>

        </div>


        <div class="video-info">

          <div class="mini-avatar">
            ${escapeHtml(
              getInitial(
                short.channel
              )
            )}
          </div>


          <div>

            <div class="video-title">
              ${escapeHtml(
                short.title
              )}
            </div>

            <div class="video-channel">
              ${escapeHtml(
                short.channel
              )}
            </div>

          </div>

        </div>

      `;


      card.addEventListener(
        "click",
        () => {

          showToast(
            "Shorts player coming next."
          );

        }
      );


      dynamicVideoGrid.appendChild(
        card
      );

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
    .querySelectorAll(
      ".category"
    )
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

  if (!input || !button) {
    return;
  }


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

            String(
              video.title || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              video.channel || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              video.category || ""
            )
              .toLowerCase()
              .includes(query)

          );

        }
      );


    hideAllPages();


    dynamicPage.style.display =
      "block";


    dynamicTitle.textContent =
      `Search results for "${input.value}"`;


    dynamicSubtitle.textContent =
      `${results.length} video(s) found`;


    renderDynamicVideos(
      results
    );


    updateActiveNav(
      ""
    );

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


  const voiceBtn =
    document.getElementById(
      "voiceSearchBtn"
    );


  if (voiceBtn) {

    voiceBtn.addEventListener(
      "click",
      startVoiceSearch
    );

  }

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


  try {

    recognition.start();

  } catch (error) {

    console.warn(error);

    showToast(
      "Voice search could not start."
    );

    return;

  }


  showToast(
    "Listening..."
  );


  recognition.onresult =
    event => {

      const text =
        event.results[0][0]
          .transcript;


      const input =
        document.getElementById(
          "searchInput"
        );


      if (input) {

        input.value =
          text;

        document
          .getElementById(
            "searchBtn"
          )
          ?.click();

      }

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

      if (!button) {
        return;
      }


      button.addEventListener(
        "click",
        () => {

          if (uploadModal) {

            uploadModal.classList.add(
              "show"
            );

          }

        }
      );

    }
  );


  const closeBtn =
    document.getElementById(
      "uploadClose"
    );


  if (closeBtn) {

    closeBtn.addEventListener(
      "click",
      closeUpload
    );

  }


  const form =
    document.getElementById(
      "uploadForm"
    );


  if (form) {

    form.addEventListener(
      "submit",
      handleUpload
    );

  }

}


/* =====================================================
   CLOSE UPLOAD
===================================================== */

function closeUpload() {

  if (uploadModal) {

    uploadModal.classList.remove(
      "show"
    );

  }

}


/* =====================================================
   HANDLE UPLOAD
===================================================== */

function handleUpload(event) {

  event.preventDefault();


  const title =
    document.getElementById(
      "uploadTitle"
    )
      ?.value
      .trim();


  const description =
    document.getElementById(
      "uploadDescription"
    )
      ?.value
      .trim();


  const category =
    document.getElementById(
      "uploadCategory"
    )
      ?.value ||
    "Technology";


  const fileInput =
    document.getElementById(
      "uploadFile"
    );


  const file =
    fileInput?.files?.[0];


  if (!title) {

    showToast(
      "Please enter a video title."
    );

    return;

  }


  if (!file) {

    showToast(
      "Please select a video."
    );

    return;

  }


  if (
    !file.type ||
    !file.type.startsWith(
      "video/"
    )
  ) {

    showToast(
      "Please select a valid video file."
    );

    return;

  }


  /*
    STEP 5:
    Local preview only.

    Permanent Supabase Storage upload
    will be added in the Storage step.
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
      videoUrl,

    thumbnail:
      ""

  };


  videos.unshift(
    newVideo
  );


  closeUpload();


  const form =
    document.getElementById(
      "uploadForm"
    );


  if (form) {
    form.reset();
  }


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

  const loginBtn =
    document.getElementById(
      "loginBtn"
    );


  if (loginBtn) {

    loginBtn.addEventListener(
      "click",
      () => {

        if (loginModal) {

          loginModal.classList.add(
            "show"
          );

        }

      }
    );

  }


  const loginClose =
    document.getElementById(
      "loginClose"
    );


  if (loginClose) {

    loginClose.addEventListener(
      "click",
      () => {

        if (loginModal) {

          loginModal.classList.remove(
            "show"
          );

        }

      }
    );

  }


  const loginForm =
    document.getElementById(
      "loginForm"
    );


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      handleLogin
    );

  }

}


/* =====================================================
   LOGIN
===================================================== */

async function handleLogin(event) {

  event.preventDefault();


  if (!supabaseClient) {

    showToast(
      "Supabase is not available."
    );

    return;

  }


  const email =
    document.getElementById(
      "loginEmail"
    )
      ?.value
      .trim();


  const password =
    document.getElementById(
      "loginPassword"
    )
      ?.value;


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


    if (
      loginModal
    ) {

      loginModal.classList.remove(
        "show"
      );

    }


    if (
      data &&
      data.user
    ) {

      showLoggedInUser(
        data.user
      );

    }


    showToast(
      "Signed in successfully."
    );


  } catch (error) {

    console.error(
      error
    );


    showToast(
      "Login failed."
    );

  }

}


/* =====================================================
   SHOW LOGGED USER
===================================================== */

function showLoggedInUser(user) {

  if (!user) {
    return;
  }


  const loginBtn =
    document.getElementById(
      "loginBtn"
    );


  const avatar =
    document.getElementById(
      "userAvatar"
    );


  if (loginBtn) {

    loginBtn.style.display =
      "none";

  }


  if (avatar) {

    avatar.style.display =
      "grid";


    avatar.textContent =
      getInitial(
        user.email ||
        "User"
      );

  }

}


/* =====================================================
   CHECK SESSION
===================================================== */

async function checkSession() {

  if (!supabaseClient) {
    return;
  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {

      console.warn(
        "Session check:",
        error.message
      );

      return;

    }


    if (
      data &&
      data.session &&
      data.session.user
    ) {

      showLoggedInUser(
        data.session.user
      );

    }

  } catch (error) {

    console.warn(
      "Session check failed:",
      error
    );

  }

}


/* =====================================================
   AUTH STATE
===================================================== */

function setupAuthListener() {

  if (!supabaseClient) {
    return;
  }


  supabaseClient.auth.onAuthStateChange(
    (
      event,
      session
    ) => {

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

}


/* =====================================================
   WATCH ACTIONS
===================================================== */

function setupWatchActions() {

  const likeBtn =
    document.getElementById(
      "likeBtn"
    );


  if (likeBtn) {

    likeBtn.addEventListener(
      "click",
      toggleLike
    );

  }


  const saveBtn =
    document.getElementById(
      "saveBtn"
    );


  if (saveBtn) {

    saveBtn.addEventListener(
      "click",
      toggleSave
    );

  }


  const subscribeBtn =
    document.getElementById(
      "subscribeBtn"
    );


  if (subscribeBtn) {

    subscribeBtn.addEventListener(
      "click",
      toggleSubscribe
    );

  }


  const commentBtn =
    document.getElementById(
      "commentBtn"
    );


  if (commentBtn) {

    commentBtn.addEventListener(
      "click",
      addComment
    );

  }


  const commentInput =
    document.getElementById(
      "commentInput"
    );


  if (commentInput) {

    commentInput.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          event.preventDefault();

          addComment();

        }

      }
    );

  }


  const shareBtn =
    document.getElementById(
      "shareBtn"
    );


  if (shareBtn) {

    shareBtn.addEventListener(
      "click",
      shareCurrentVideo
    );

  }

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

      console.log(
        "Share cancelled."
      );

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

  const notificationBtn =
    document.getElementById(
      "notificationBtn"
    );


  if (notificationBtn) {

    notificationBtn.addEventListener(
      "click",
      () => {

        if (notificationPanel) {

          notificationPanel.classList.toggle(
            "show"
          );

        }

      }
    );

  }


  const notificationClose =
    document.getElementById(
      "notificationClose"
    );


  if (notificationClose) {

    notificationClose.addEventListener(
      "click",
      () => {

        if (notificationPanel) {

          notificationPanel.classList.remove(
            "show"
          );

        }

      }
    );

  }

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


  if (
    !menuBtn ||
    !sidebar
  ) {

    return;

  }


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

  const section =
    document.getElementById(
      "videosSection"
    );


  if (!section) {
    return;
  }


  section.scrollIntoView({
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


  return String(
    text
  )
    .trim()
    .charAt(0)
    .toUpperCase();

}


/* =====================================================
   FORMAT NUMBER
===================================================== */

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


/* =====================================================
   ESCAPE HTML
===================================================== */

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


/* =====================================================
   ESCAPE ATTRIBUTE
===================================================== */

function escapeAttribute(value) {

  return escapeHtml(
    value
  );

}


/* =====================================================
   LOCAL STORAGE SAFE LOAD
===================================================== */

function loadLocalArray(key) {

  try {

    const value =
      localStorage.getItem(
        key
      );


    if (!value) {
      return [];
    }


    const parsed =
      JSON.parse(
        value
      );


    return Array.isArray(
      parsed
    )
      ? parsed
      : [];


  } catch (error) {

    console.warn(
      `Could not load ${key}`,
      error
    );

    return [];

  }

}


/* =====================================================
   LOCAL STORAGE OBJECT
===================================================== */

function loadLocalObject(key) {

  try {

    const value =
      localStorage.getItem(
        key
      );


    if (!value) {
      return {};
    }


    const parsed =
      JSON.parse(
        value
      );


    return (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    )
      ? parsed
      : {};


  } catch (error) {

    console.warn(
      `Could not load ${key}`,
      error
    );

    return {};

  }

}


/* =====================================================
   LOCAL STORAGE SAVE
===================================================== */

function saveLocal(
  key,
  value
) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(
        value
      )
    );

  } catch (error) {

    console.warn(
      `Could not save ${key}`,
      error
    );

  }

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
  "click",
  event => {

    if (
      event.target === uploadModal
    ) {

      closeUpload();

    }


    if (
      event.target === loginModal
    ) {

      if (loginModal) {

        loginModal.classList.remove(
          "show"
        );

      }

    }

  }
);
