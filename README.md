# Maafin Aku Ya? 🥺💗

Website interaktif bertema permintaan maaf yang lucu dan menggemaskan.
Alur: minta maaf → dimaafkan → pilih "date" → lanjut chat di Telegram.

100% HTML/CSS/JS murni (vanilla), tidak ada backend, tidak ada build step.
Bisa langsung di-host pakai **GitHub Pages**.

---

## 📁 Struktur File

```
maaf-website/
├── index.html          → struktur halaman & 4 "screen" (maaf, love letter, pilih date, konfirmasi)
├── style.css            → semua styling, warna pastel, animasi
├── script.js             → semua logika interaktif
├── assets/
│   ├── images/           → taruh my-photo.jpg di sini untuk foto polaroid kamu
│   └── sounds/           → taruh bg-music.mp3 di sini untuk musik background,
│                            serta click.mp3 & success.mp3 (opsional) untuk sound effect
└── README.md
```

---

## ✏️ Bagian yang Paling Sering Diubah

Semua ada di bagian atas file **`script.js`**, di objek `CONFIG`:

```js
const CONFIG = {
  telegramUsername: "USERNAME",   // ganti dengan username telegram kamu (tanpa @)
  apologyText: "Maaf ya udah bikin kamu kesel… aku tau aku salah 🥺",
  typingSpeed: 45,                 // makin kecil = makin cepat ngetiknya
  heartCount: 22,                  // jumlah hati yang jatuh di background
  ...
};
```

### Mengganti foto di halaman utama

Foto pakai bentuk polaroid kotak rounded di paling atas halaman pertama.
Cara ganti paling mudah: simpan foto kamu dengan nama **`my-photo.jpg`** ke folder
`assets/images/`. Kode di `index.html` sudah otomatis mencari file itu:

```html
<img id="profile-photo" class="polaroid-img" src="assets/images/my-photo.jpg" ...>
```

Kalau filenya belum ada / namanya beda, otomatis muncul placeholder pink bertuliskan
"Foto Kamu Disini" — jadi website tidak akan error walau foto belum ditaruh.
Mau pakai nama file lain? tinggal ubah `src="assets/images/my-photo.jpg"` di `index.html`.

Caption di bawah foto ("it's me 🫶") juga bisa diubah langsung di `index.html`
pada elemen `<p class="polaroid-caption">`.

### Mengganti teks Love Letter

Halaman "love letter" (muncul setelah klik "Iya 💗", sebelum pilih date) teksnya
ada di `index.html`, cari bagian `<div class="letter-body">`. Bebas dicampur
Indonesia-English sesuka kamu, setiap `<p>` jadi satu paragraf surat.

### Mengganti 4 pilihan date / ticket

Edit langsung di **`index.html`** pada bagian `<div class="ticket-stack">` — setiap ticket
adalah satu `<button class="ticket">`. Atribut `data-label` dipakai untuk kalimat
konfirmasi di halaman terakhir.

---

## 🎵 Musik Background

Taruh file musik kamu dengan nama **`bg-music.mp3`** di folder:

```
assets/sounds/bg-music.mp3
```

Begitu file itu ada, musik akan otomatis main begitu halaman dibuka dan
**looping terus** selama website dibuka. Ada tombol bulat kecil (🔊/🔇) yang
selalu muncul di pojok kanan atas, dipakai untuk mute/unmute kapan saja.

> **Penting soal autoplay:** semua browser modern (Chrome, Safari, dll)
> memblokir audio yang otomatis bersuara sebelum ada interaksi dari user —
> ini kebijakan browser, bukan bug. Kode di sini sudah disiapkan untuk
> mencoba play otomatis duluan, dan kalau diblokir, akan otomatis coba lagi
> begitu user pertama kali nge-tap/klik apapun di halaman (jadi musiknya
> tetap kerasa "langsung jalan" tanpa perlu cari tombol play).

Volume musik bisa diatur di `script.js`, di bagian `CONFIG.musicVolume`
(nilai dari 0 sampai 1).

### Sumber musik bebas royalti

Kalau belum punya file musik sendiri, bisa cari musik latar yang bebas
royalti/lisensi dari situs seperti
[Pixabay Music](https://pixabay.com/music/) atau
[YouTube Audio Library](https://www.youtube.com/audiolibrary). Pastikan
formatnya `.mp3` dan diberi nama `bg-music.mp3`.

---

## 🔊 Sound Effect Klik (Opsional)

Kode sudah siap memutar suara saat tombol diklik, tapi **filenya belum disediakan**
(supaya tidak melanggar hak cipta orang lain). Kalau mau pakai:

1. Cari sound effect pendek bebas royalti, misalnya dari [Pixabay Sound Effects](https://pixabay.com/sound-effects/) atau [Mixkit](https://mixkit.co/free-sound-effects/).
2. Simpan sebagai `assets/sounds/click.mp3` dan `assets/sounds/success.mp3`.
3. Selesai — kode otomatis akan memutarnya. Kalau filenya tidak ada, website tetap berjalan normal tanpa suara (tidak error).

---

## 🚀 Cara Hosting di GitHub Pages

1. **Buat repository baru** di GitHub, misalnya `maafin-aku`.
2. Upload semua file di folder ini (`index.html`, `style.css`, `script.js`, `assets/`) ke repo tersebut.
   - Bisa lewat web GitHub (drag & drop), atau lewat git:
     ```bash
     git init
     git add .
     git commit -m "Website permintaan maaf"
     git branch -M main
     git remote add origin https://github.com/USERNAME-GITHUB/maafin-aku.git
     git push -u origin main
     ```
3. Di repo GitHub, buka **Settings → Pages**.
4. Pada bagian **Build and deployment → Source**, pilih **Deploy from a branch**.
5. Pilih branch **main** dan folder **/ (root)**, lalu klik **Save**.
6. Tunggu 1–2 menit, lalu website akan bisa diakses di:
   ```
   https://USERNAME-GITHUB.github.io/maafin-aku/
   ```

Selesai! Tinggal bagikan link-nya. 💌

---

## 🎨 Mengubah Warna Tema

Semua warna utama ada di paling atas **`style.css`**, di bagian `:root`:

```css
:root {
  --pink-soft: #ffd6e8;
  --pink-main: #ff8fb1;
  --pink-deep: #ff5c8a;
  --blue-soft: #d6ecff;
  --purple-soft: #e6d9ff;
  --purple-main: #c8a2ff;
}
```

Ganti nilai hex-nya untuk eksperimen kombinasi warna pastel lain.

---

## ✅ Checklist Sebelum Dibagikan

- [ ] Ganti `telegramUsername` di `script.js`
- [ ] Ganti `apologyText` sesuai pesan personal kamu
- [ ] Taruh foto kamu di `assets/images/my-photo.jpg` (atau ganti nama filenya di `index.html`)
- [ ] Taruh musik kamu di `assets/sounds/bg-music.mp3`
- [ ] Tulis ulang teks di halaman Love Letter sesuai gaya kamu
- [ ] Cek ulang 4 pilihan "date" di `index.html`
- [ ] (Opsional) tambahkan sound effect klik di `assets/sounds/`
- [ ] Test buka di HP — semua animasi & tombol harus tetap nyaman dipakai
