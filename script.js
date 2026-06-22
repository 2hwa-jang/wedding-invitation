let isGalleryExpanded = false;
let currentLightboxIndex = 0;
let touchStartX = 0;

function renderWeddingData() {
  document.getElementById("groomName").textContent = weddingData.groomName;
  document.getElementById("brideName").textContent = weddingData.brideName;
  document.getElementById("groomFullName").textContent = weddingData.groomFullName;
  document.getElementById("brideFullName").textContent = weddingData.brideFullName;

  document.getElementById("groomParents").textContent = weddingData.groomParents;
  document.getElementById("brideParents").textContent = weddingData.brideParents;

  document.getElementById("weddingDateText").textContent = weddingData.weddingDateText;
  document.getElementById("weddingTimeText").textContent = weddingData.weddingTimeText;

  document.getElementById("invitationMessage").innerHTML = weddingData.invitationMessage;

  document.getElementById("venueName").textContent = weddingData.venueName;
  document.getElementById("venueHall").textContent = weddingData.venueHall;
  document.getElementById("venueAddress").textContent = weddingData.venueAddress;

  document.getElementById("tmapLink").href = weddingData.tmapLink;
  document.getElementById("kakaoMapLink").href = weddingData.kakaoMapLink;
  document.getElementById("naverMapLink").href = weddingData.naverMapLink;

  document.getElementById("subwayInfo").textContent = weddingData.subwayInfo;
  document.getElementById("busInfo").textContent = weddingData.busInfo;
  document.getElementById("parkingInfo").textContent = weddingData.parkingInfo;

  renderCalendar();
  renderGallery();
  renderAccounts("groomAccounts", weddingData.groomAccounts);
  renderAccounts("brideAccounts", weddingData.brideAccounts);
}

function renderCalendar() {
  const date = new Date(weddingData.weddingDateISO);
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();

  document.getElementById("calendarTitle").textContent = `${year}년 ${month + 1}월`;

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  dayNames.forEach((day) => {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day-name";
    dayEl.textContent = day;
    calendar.appendChild(dayEl);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.className = "calendar-date empty";
    calendar.appendChild(emptyEl);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateEl = document.createElement("div");
    dateEl.className = "calendar-date";
    dateEl.textContent = day;

    if (day === weddingDay) {
      dateEl.classList.add("wedding-day");
    }

    calendar.appendChild(dateEl);
  }
}

function renderGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  const moreButton = document.getElementById("galleryMoreButton");

  galleryGrid.innerHTML = "";

  const visibleImages = isGalleryExpanded
    ? weddingData.galleryImages
    : weddingData.galleryImages.slice(0, 9);

  visibleImages.forEach((src, index) => {
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.onclick = () => openLightbox(index);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `웨딩 갤러리 ${index + 1}`;
    img.loading = "lazy";

    item.appendChild(img);
    galleryGrid.appendChild(item);
  });

  if (weddingData.galleryImages.length <= 9) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "inline-flex";
    moreButton.innerHTML = isGalleryExpanded
      ? `접기 <span>⌃</span>`
      : `더보기 <span>⌄</span>`;
  }
}

function renderAccounts(containerId, accounts) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  accounts.forEach((account) => {
    const card = document.createElement("div");
    card.className = "account-card";

    card.innerHTML = `
      <div>
        <p>${account.label}</p>
        <strong>${account.bank} ${account.number}</strong>
        <span>예금주 ${account.holder}</span>
      </div>
      <button type="button">복사</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      copyText(`${account.bank} ${account.number} ${account.holder}`);
    });

    container.appendChild(card);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("복사되었습니다.");
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;

  document.getElementById("lightboxImage").src =
    weddingData.galleryImages[currentLightboxIndex];

  document.getElementById("lightbox").classList.add("active");
  document.getElementById("lightbox").classList.remove("map-mode");
  document.body.classList.add("no-scroll");
}

function openMapLightbox() {
  document.getElementById("lightboxImage").src = "./images/map.jpg";
  document.getElementById("lightbox").classList.add("active");
  document.getElementById("lightbox").classList.add("map-mode");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.getElementById("lightbox").classList.remove("map-mode");
  document.body.classList.remove("no-scroll");
}

function moveLightbox(direction) {
  const total = weddingData.galleryImages.length;
  currentLightboxIndex = (currentLightboxIndex + direction + total) % total;
  document.getElementById("lightboxImage").src = weddingData.galleryImages[currentLightboxIndex];
}

function openContactModal() {
  document.getElementById("contactModal").classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeContactModal() {
  document.getElementById("contactModal").classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function setupEvents() {
  document.getElementById("galleryMoreButton").addEventListener("click", () => {
    isGalleryExpanded = !isGalleryExpanded;
    renderGallery();
  });

  const lightbox = document.getElementById("lightbox");

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        moveLightbox(1);
      } else {
        moveLightbox(-1);
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeContactModal();
    }

    if (event.key === "ArrowRight") {
      moveLightbox(1);
    }

    if (event.key === "ArrowLeft") {
      moveLightbox(-1);
    }
  });

  setupRevealAnimation();
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

renderWeddingData();
setupEvents();
