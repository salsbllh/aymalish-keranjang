document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
     NAVBAR TOGGLE
  ================================ */
  const navbarNav = document.querySelector(".navbar-nav");
  const hamburger = document.querySelector("#hamburger-menu");

  hamburger?.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navbarNav.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!hamburger?.contains(e.target) && !navbarNav?.contains(e.target)) {
      navbarNav?.classList.remove("active");
    }
  });

  /* ===============================
     SHOPPING CART TOGGLE
  ================================ */
  const shoppingCart = document.querySelector(".shopping-cart");
  const shoppingBtn = document.querySelector("#shopping-cart");

  shoppingBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    shoppingCart.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!shoppingBtn?.contains(e.target) && !shoppingCart?.contains(e.target)) {
      shoppingCart?.classList.remove("active");
    }
  });

  /* ===============================
     STAR RATING + REVIEW SUBMIT
  ================================ */
  const stars = document.querySelectorAll("#starRating .star");
  const reviewForm = document.querySelector("#reviewForm");
  const ratingInput = document.querySelector("#ratingValue");

  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1;
      ratingInput.value = selectedRating;
      updateStars(selectedRating);
    });

    star.addEventListener("mouseover", () => {
      updateStars(index + 1);
    });

    star.addEventListener("mouseout", () => {
      updateStars(selectedRating);
    });
  });

  function updateStars(rating) {
    stars.forEach((star, i) => {
      star.classList.toggle("active", i < rating);
    });
  }

  // SUBMIT FORM
  reviewForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    if (ratingInput.value === "0") {
      alert("Silakan pilih rating terlebih dahulu ⭐");
      return;
    }

    const formData = new FormData(reviewForm);

    fetch(reviewForm.action, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((message) => {
        alert(message);
        reviewForm.reset();
        selectedRating = 0;
        ratingInput.value = 0;
        updateStars(0);

        loadReviews(); // 🔥 INI PENTING
      })
      .catch(() => {
        alert("Gagal mengirim ulasan 😥");
      });
  });

  /* ===============================
     LOAD REVIEW FROM GOOGLE SHEET
  ================================ */
  const reviewList = document.getElementById("reviewList");
  const REVIEW_API_URL =
    "https://script.google.com/macros/s/AKfycbxrQhD0g8uGF1Cijtrll_Gm0PRhYEqZ2doIpEEaQGtm73ngTQ1N9s6edQLcMwqeqnud/exec";

  function loadReviews() {
    fetch(REVIEW_API_URL)
      .then((res) => res.json())
      .then((data) => {
        reviewList.innerHTML = "";

        data.reverse().forEach((review) => {
          const stars =
            "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

          const card = document.createElement("div");
          card.className = "review-card";
          card.innerHTML = `
            <div class="review-stars">${stars}</div>
            <p class="review-text">${review.ulasan}</p>
            <p class="review-name">— ${review.nama}</p>
          `;

          reviewList.appendChild(card);
        });
      })
      .catch(() => {
        reviewList.innerHTML = "<p>Gagal memuat ulasan</p>";
      });
  }

  // LOAD SAAT HALAMAN DIBUKA
  loadReviews();
});
