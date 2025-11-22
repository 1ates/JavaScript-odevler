// Kullanıcı adını promt ile alıp dokümanın iligli alanına yazdır
const myName = prompt("Lütfen adınızı giriniz.");
document.querySelector("#myName").innerHTML = myName;

// Zaman bilgisini hesapla ve dokümanın ilgili alanına yazdır
function timeNow() {
  const myClock = document.querySelector("#myClock");
  const nowTime = new Date();

  //   Eğer zaman bilgisi tek haneli ise başına 0 ekle
  let hours = String(nowTime.getHours()).padStart(2, "0");
  let minutes = String(nowTime.getMinutes()).padStart(2, "0");
  let seconds = String(nowTime.getSeconds()).padStart(2, "0");

  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const dayName = days[nowTime.getDay()];

  myClock.innerHTML = `${hours}:${minutes}:${seconds} ${dayName}`;
}
// Güncel saniye bilgisi için fonksiyonu her saniye yeniden çağır
setInterval(() => {
  timeNow();
}, 1000);

// Zaman bilgisini yazdıran fonksiyonu çağır
timeNow();
