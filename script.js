// call all elements
const cards = document.querySelectorAll(".card");

const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");

const allBtn = document.getElementById("all-filter-btn");
const interviewBtn = document.getElementById("interview-filter-btn");
const rejectedBtn = document.getElementById("rejected-filter-btn");

const cardsSection = document.querySelector(".allCards");
const jobCountText = document.querySelector("main span");

// state
let interviewCount = 0;
let rejectedCount = 0;
let currentTab = "all";

// initial setupp
totalCountEl.innerText = cards.length;
jobCountText.innerText = cards.length + " jobs";

// dashboard
function updateDashboard() {
  totalCountEl.innerText = document.querySelectorAll(".card").length;
  interviewCountEl.innerText = interviewCount;
  rejectedCountEl.innerText = rejectedCount;
}

// tab count
function updateTabCount() {
  let visibleCards = 0;

  document.querySelectorAll(".card").forEach(card => {
    if (card.style.display !== "none") {
      visibleCards++;
    }
  });

  jobCountText.innerText = visibleCards + " jobs";
}

// empty msg
function showEmptyMessage() {
  removeEmptyMessage();

  const message = document.createElement("div");
  message.id = "emptyMessage";
  message.className = "text-center py-20 w-full";

  message.innerHTML = `
    <img class="mx-auto w-24 mb-6" src="./image/jobs.png">
    <h2 class="text-2xl font-bold">No jobs Available</h2>
    <p class="text-gray-500 mt-2">Check back soon for new job opportunities</p>
  `;

  cardsSection.appendChild(message);
}

function removeEmptyMessage() {
  const msg = document.getElementById("emptyMessage");
  if (msg) msg.remove();
}

// filter cards
function filterCards(type) {
  currentTab = type;
  removeEmptyMessage();

  let visible = 0;

  document.querySelectorAll(".card").forEach(card => {
    const status = card.getAttribute("data-status");

    if (type === "all") {
      card.style.display = "flex";
      visible++;
    } else if (status === type) {
      card.style.display = "flex";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  if (visible === 0) {
    showEmptyMessage();
  }

  updateTabCount();
}

// active tab
function setActiveTab(activeBtn) {
  [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-white");
  });
  activeBtn.classList.remove("bg-white")
  activeBtn.classList.add("bg-blue-500", "text-white");
}

// card btn
document.querySelectorAll(".card").forEach(card => {

  const statusBtn = card.querySelectorAll("button")[0];
  const interviewBtnCard = card.querySelectorAll("button")[1];
  const rejectedBtnCard = card.querySelectorAll("button")[2];
  const deleteBtn = card.querySelector("img");

  // interview click
  interviewBtnCard.addEventListener("click", () => {
    const currentStatus = card.getAttribute("data-status");

    if (currentStatus === "interview") return;

    if (currentStatus === "rejected") {
      rejectedCount--;
    }

    card.setAttribute("data-status", "interview");

    statusBtn.innerText = "INTERVIEW";
    statusBtn.className = "bg-green-200 text-green-800 px-3 py-2 rounded-sm";

    interviewCount++;

    updateDashboard();
    filterCards(currentTab);
  });

  // rejected click
  rejectedBtnCard.addEventListener("click", () => {
    const currentStatus = card.getAttribute("data-status");

    if (currentStatus === "rejected") return;

    if (currentStatus === "interview") {
      interviewCount--;
    }

    card.setAttribute("data-status", "rejected");

    statusBtn.innerText = "REJECTED";
    statusBtn.className = "bg-red-200 text-red-800 px-3 py-2 rounded-sm";

    rejectedCount++;

    updateDashboard();
    filterCards(currentTab);
  });

  // dlt click
  deleteBtn.addEventListener("click", () => {
    const currentStatus = card.getAttribute("data-status");

    if (currentStatus === "interview") interviewCount--;
    if (currentStatus === "rejected") rejectedCount--;

    card.remove();

    updateDashboard();
    filterCards(currentTab);
  });

});

// tab events
allBtn.addEventListener("click", () => {
  setActiveTab(allBtn);
  filterCards("all");
});

interviewBtn.addEventListener("click", () => {
  setActiveTab(interviewBtn);
  filterCards("interview");
});

rejectedBtn.addEventListener("click", () => {
  setActiveTab(rejectedBtn);
  filterCards("rejected");
});