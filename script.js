/* =========================================================
   ⚙️ KONFIGURASI — UBAH DI SINI SESUAI KEINGINANMU
   ========================================================= */
const CONFIG = {
  // Username telegram tujuan (tanpa @, tanpa spasi)
  telegramUsername: "sinclairgraph",

  // Teks permintaan maaf yang akan muncul dengan efek typing
  apologyText: "Hiluu, sayangku! Kayaknya hari kamu lagi buruk, ya? Ditambah aku malah ikut sibuk.. 🥺",

  // Kecepatan efek typing (ms per huruf)
  typingSpeed: 45,

  // Jumlah hati yang berjatuhan di background
  heartCount: 22,

  // Volume musik background, dari 0 (diam) sampai 1 (paling kencang)
  musicVolume: 0.4,

  // Emoji yang dipakai untuk hati berjatuhan (bisa ditambah variasi)
  heartEmojis: ["💗", "💕", "💖", "💓", "✨"],

  // Emoji yang dipakai untuk confetti mini
  confettiEmojis: ["🎉", "💗", "✨", "🎊", "💕"],
};

/* =========================================================
   HELPER: Ambil elemen dengan singkat
   ========================================================= */
const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);

/* =========================================================
   1. FLOATING HEARTS — animasi hati berjatuhan di background
   ========================================================= */
function createFloatingHearts() {
  const container = $("#hearts-container");

  for (let i = 0; i < CONFIG.heartCount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent =
      CONFIG.heartEmojis[Math.floor(Math.random() * CONFIG.heartEmojis.length)];

    // Posisi horizontal random
    heart.style.left = `${Math.random() * 100}%`;

    // Durasi & delay random supaya jatuhnya tidak seragam (lebih natural)
    const duration = 6 + Math.random() * 8; // 6 - 14 detik
    const delay = Math.random() * 10; // 0 - 10 detik
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    // Ukuran random biar lebih hidup
    const size = 1 + Math.random() * 1.4;
    heart.style.fontSize = `${size}rem`;

    container.appendChild(heart);
  }
}

/* =========================================================
   2. EFEK TYPING untuk teks permintaan maaf
   ========================================================= */
function typeText(element, text, speed, onDone) {
  element.classList.add("typing");
  element.textContent = "";
  let index = 0;

  function typeNextChar() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeNextChar, speed);
    } else {
      element.classList.remove("typing");
      if (typeof onDone === "function") onDone();
    }
  }

  typeNextChar();
}

/* =========================================================
   3. TOMBOL "ENGGAK 😤" YANG KABUR SAAT DIDEKATI
   ========================================================= */
function setupEscapingButton() {
  const btnNo = $("#btn-no");
  const buttonRow = $(".button-row");

  // Saat mouse mendekat (desktop)
  buttonRow.addEventListener("mousemove", (e) => {
    moveButtonAway(btnNo, e.clientX, e.clientY);
  });

  // Saat disentuh di mobile, tombol juga lari ke posisi random
  btnNo.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const rect = btnNo.getBoundingClientRect();
    moveButtonAway(btnNo, rect.left, rect.top, true);
  });

  // Just in case ke-klik (untuk pengguna keyboard / sentuhan cepat),
  // tombol tetap tidak melakukan apa-apa selain kabur lagi
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 80);
    btnNo.classList.add("escaping");
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
  });
}

function moveButtonAway(btn, mouseX, mouseY, forceJump = false) {
  const rect = btn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);
  const dangerZone = 110; // radius "aman" sebelum tombol kabur

  if (distance < dangerZone || forceJump) {
    // Tentukan posisi baru random di area aman dalam viewport
    const padding = 20;
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    btn.classList.add("escaping");
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }
}

/* =========================================================
   4. TRANSISI ANTAR SCREEN (state)
   ========================================================= */
function switchScreen(fromId, toId) {
  const fromScreen = $(`#${fromId}`);
  const toScreen = $(`#${toId}`);

  fromScreen.classList.add("fade-out");

  setTimeout(() => {
    fromScreen.classList.remove("active", "fade-out");
    toScreen.classList.add("active", "fade-in");

    setTimeout(() => {
      toScreen.classList.remove("fade-in");
    }, 600);
  }, 380);
}

/* =========================================================
   5. CONFETTI MINI saat ticket date dipilih
   ========================================================= */
function burstConfetti() {
  const burstContainer = $("#confetti-burst");
  burstContainer.innerHTML = ""; // reset dulu

  const pieceCount = 16;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent =
      CONFIG.confettiEmojis[Math.floor(Math.random() * CONFIG.confettiEmojis.length)];

    // Arah & jarak random untuk tiap partikel confetti
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const rot = Math.random() * 360;

    piece.style.setProperty("--dx", `${dx}px`);
    piece.style.setProperty("--dy", `${dy}px`);
    piece.style.setProperty("--rot", `${rot}deg`);
    piece.style.animationDelay = `${Math.random() * 0.15}s`;

    burstContainer.appendChild(piece);
  }

  // Bersihkan confetti setelah animasi selesai biar ringan
  setTimeout(() => {
    burstContainer.innerHTML = "";
  }, 1200);
}

/* =========================================================
   6. SOUND EFFECT (opsional — aman walau file belum ada)
   ========================================================= */
function playSound(audioElement) {
  if (!audioElement) return;
  try {
    audioElement.currentTime = 0;
    audioElement.volume = 0.5;
    const playPromise = audioElement.play();
    // Tangkap error kalau file suara belum tersedia / browser block autoplay
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* diamkan saja, ini opsional */
      });
    }
  } catch (err) {
    /* diamkan saja, sound effect bersifat opsional */
  }
}

/* =========================================================
   7. SETUP TOMBOL "IYA 💗" → pindah ke screen love letter
   ========================================================= */
function setupYesButton() {
  const btnYes = $("#btn-yes");
  const sfxClick = $("#sfx-click");

  btnYes.addEventListener("click", () => {
    playSound(sfxClick);
    switchScreen("screen-apology", "screen-letter");
  });
}

/* =========================================================
   7b. SETUP TOMBOL DI LOVE LETTER → lanjut ke screen pilih date
   ========================================================= */
function setupLetterButton() {
  const btnLetterNext = $("#btn-letter-next");
  const sfxClick = $("#sfx-click");

  btnLetterNext.addEventListener("click", () => {
    playSound(sfxClick);
    switchScreen("screen-letter", "screen-date");
  });
}

/* =========================================================
   8. SETUP KARTU TICKET PILIH DATE
   ========================================================= */
function setupTickets() {
  const tickets = $all(".ticket");
  const sfxClick = $("#sfx-click");
  const sfxSuccess = $("#sfx-success");
  const confirmSub = $("#confirm-sub");

  tickets.forEach((ticket) => {
    ticket.addEventListener("click", () => {
      playSound(sfxClick);
      ticket.classList.add("selected");

      const label = ticket.getAttribute("data-label") || "ketemu kamu";
      confirmSub.textContent = `Udah ku-tandain ya buat ${label}! 💌`;

      // Beri sedikit delay biar animasi "selected" kelihatan dulu
      setTimeout(() => {
        switchScreen("screen-date", "screen-confirm");
        burstConfetti();
        playSound(sfxSuccess);
      }, 350);
    });
  });
}

/* =========================================================
   9. SETUP TOMBOL TELEGRAM (redirect + animasi singkat)
   ========================================================= */
function setupTelegramButton() {
  const btnTelegram = $("#btn-telegram");

  // Set link sesuai konfigurasi di atas, jadi gampang diganti
  btnTelegram.href = `https://t.me/${CONFIG.telegramUsername}`;

  btnTelegram.addEventListener("click", (e) => {
    // Animasi kecil sebelum tab baru terbuka (tab baru tetap langsung terbuka oleh browser)
    btnTelegram.classList.add("redirecting");
    btnTelegram.textContent = "Membuka Telegram... 💌";

    setTimeout(() => {
      btnTelegram.classList.remove("redirecting");
      btnTelegram.textContent = "Chat aku di Telegram 💌";
    }, 1000);

    // target="_blank" pada elemen <a> sudah menangani buka tab baru,
    // jadi kita tidak perlu e.preventDefault()
  });
}

/* =========================================================
   10. TOMBOL BACK — kembali ke screen sebelumnya
   ========================================================= */
function setupBackButtons() {
  const sfxClick = $("#sfx-click");
  const backButtons = $all(".btn-back");

  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      playSound(sfxClick);

      // Cari screen mana yang sedang aktif (parent terdekat dari tombol back ini)
      const currentScreen = btn.closest(".screen");
      const targetId = btn.getAttribute("data-back-to");

      if (currentScreen && targetId) {
        switchScreen(currentScreen.id, targetId);
      }
    });
  });
}

/* =========================================================
   11. KUCING LUCU YANG JALAN-JALAN DI POJOK LAYAR
   ========================================================= */
function setupCatBuddy() {
  const cat = $("#cat-buddy");
  const bubble = cat.querySelector(".cat-bubble");

  // Kata-kata gemes random yang sesekali muncul di balon kucing
  const catLines = [
    "nyaa~",
    "maafin dia ya 🥺",
    "dia nungguin lho",
    "psst, klik tiketnya",
    "meow 💗",
  ];

  // Posisi-posisi random tempat kucing "berhenti" di layar
  function moveCatToRandomSpot() {
    const maxLeft = Math.max(20, window.innerWidth - 100);
    const randomLeft = 20 + Math.random() * (maxLeft - 20);
    cat.style.left = `${randomLeft}px`;
  }

  // Tampilkan balon kata sebentar, lalu sembunyikan lagi
  function showBubble() {
    bubble.textContent = catLines[Math.floor(Math.random() * catLines.length)];
    bubble.classList.add("show");
    setTimeout(() => {
      bubble.classList.remove("show");
    }, 2400);
  }

  // Kucing pertama kali "masuk" ke layar setelah sebentar
  setTimeout(() => {
    moveCatToRandomSpot();
    cat.classList.add("idle");
  }, 1200);

  // Sesekali kucing pindah posisi & ngomong sesuatu yang gemes
  setInterval(() => {
    moveCatToRandomSpot();
    showBubble();
  }, 9000);

  // Kalau kucing diklik (walau pointer-events none di CSS untuk container,
  // kita aktifkan klik khusus di emoji-nya saja lewat delegation sederhana)
  cat.style.pointerEvents = "auto";
  cat.querySelector(".cat-emoji").style.pointerEvents = "auto";
  cat.addEventListener("click", () => {
    showBubble();
  });
}

/* =========================================================
   12. MUSIK BACKGROUND — autoplay + fallback + tombol mute
   ========================================================= */
function setupBackgroundMusic() {
  const music = $("#bg-music");
  const toggleBtn = $("#btn-music-toggle");
  const musicIcon = $("#music-icon");

  music.volume = CONFIG.musicVolume;
  let userMuted = false; // true kalau user sengaja klik mute

  function updateIcon() {
    const isPlaying = !music.paused;
    musicIcon.textContent = isPlaying ? "🔊" : "🔇";
    toggleBtn.classList.toggle("playing", isPlaying);
  }

  function tryPlay() {
    if (userMuted) return;
    const playPromise = music.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(updateIcon).catch(() => {
        // Browser blokir autoplay tanpa interaksi — akan dicoba lagi
        // otomatis begitu user pertama kali sentuh/klik halaman.
        updateIcon();
      });
    }
  }

  // Percobaan pertama: langsung saat halaman dimuat
  tryPlay();

  // Fallback: kalau gagal (diblokir browser), coba lagi begitu ada
  // interaksi pertama dari user (klik / sentuh / tekan tombol apapun).
  // Listener ini otomatis melepas dirinya sendiri setelah berhasil sekali.
  function onFirstInteraction() {
    if (!userMuted && music.paused) {
      tryPlay();
    }
    window.removeEventListener("click", onFirstInteraction);
    window.removeEventListener("touchstart", onFirstInteraction);
    window.removeEventListener("keydown", onFirstInteraction);
  }
  window.addEventListener("click", onFirstInteraction);
  window.addEventListener("touchstart", onFirstInteraction);
  window.addEventListener("keydown", onFirstInteraction);

  // Tombol mute/unmute manual
  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      userMuted = false;
      tryPlay();
    } else {
      userMuted = true;
      music.pause();
      updateIcon();
    }
  });
}

/* =========================================================
   INISIALISASI SEMUA FITUR SAAT HALAMAN DIMUAT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  createFloatingHearts();
  setupEscapingButton();
  setupYesButton();
  setupLetterButton();
  setupTickets();
  setupTelegramButton();
  setupBackButtons();
  setupCatBuddy();
  setupBackgroundMusic();

  // Jalankan efek typing untuk teks permintaan maaf
  typeText($("#apology-text"), CONFIG.apologyText, CONFIG.typingSpeed);
});
