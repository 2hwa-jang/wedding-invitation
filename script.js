function renderWeddingData() {
  document.getElementById("groomName").textContent = weddingData.groomName;
  document.getElementById("brideName").textContent = weddingData.brideName;
  document.getElementById("weddingDateText").textContent = weddingData.weddingDateText;
  document.getElementById("weddingDate").textContent = weddingData.weddingDate;
  document.getElementById("venueName").textContent = weddingData.venueName;
  document.getElementById("venueAddress").textContent = weddingData.venueAddress;

  document.getElementById("invitationMessage").innerHTML = weddingData.invitationMessage;

  document.getElementById("kakaoMapLink").href = weddingData.kakaoMapLink;
  document.getElementById("naverMapLink").href = weddingData.naverMapLink;

  document.getElementById("groomAccount").textContent = weddingData.groomAccount;
  document.getElementById("brideAccount").textContent = weddingData.brideAccount;

  document.getElementById("rsvpLink").href = weddingData.rsvpLink;
}

function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;

  navigator.clipboard.writeText(text).then(() => {
    alert("복사되었습니다.");
  });
}

renderWeddingData();
