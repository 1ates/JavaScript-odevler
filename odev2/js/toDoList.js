/* GLOBAL ID COUNTER */
let idCounter = 0;
/* LOCALSTORAGE KEY */
const STORAGE_KEY = "tasks";

// listedekilere buton ekleme ve local storage'a kayıt etme
window.addEventListener("DOMContentLoaded", () => {
  // window'u dinle ve DOM içeriği yüklendiğinde yap
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); // kayıtlı verileri saved'in içine koy
  if (saved && Array.isArray(saved)) {
    // saved bir dizi ise
    // LocalStorage'ta bilgi varsa görevleri storage'dan tekrar render et
    renderFromStorage(saved); // saved içindekilere render fonksiyonunu uygula
    const lastLi = document.querySelector("#list li:last-child"); // list id'li elementin son li elementini seç lastLi'ye at
    idCounter = lastLi ? Number(lastLi.id) + 1 : 0; // lastLi'nin id'ine 1 ekle ve sayaca at, eğer yoksa sayaca 0 at
  } else {
    // kayıtta görev yoksa index.html içinden oku ve listeyi doldur
    const initialTasks = []; // yeni dizi oluştur
    const liItems = document.querySelectorAll("#list li"); // list id'li elementin li elementlerini liItems içine at
    liItems.forEach((li, index) => {
      // her bir li elementini sırayla dön
      li.id = index; // id bilgisine index'i at
      initialTasks.push({
        // oluşturduğumuz dininin içine aşağıdakileri koy
        id: index, // id'sine index bilgisini
        text: li.textContent.trim(), // text'ine boşluklardan arındırılmış içerik bilgisini
        checked: li.classList.contains("checked"), // checked'ına da yapılıp yapılmadığını tutan class içeriğini
      });
      attachCloseButton(li); // silme butonu ekleme fonksiyonu ile butonu ekle
    });
    const lastLi = document.querySelector("#list li:last-child"); // list id'li elementin son li elementini seç lastLi'ye at
    idCounter = lastLi ? Number(lastLi.id) + 1 : 0; // lastLi'nin id'ine 1 ekle ve sayaca at, eğer yoksa sayaca 0 at
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks)); // oluşturduğumuz diziyi localStorage'a kaydet
  }
});

// LocalStorage'taki bilgileri render etme fonksiyonu
function renderFromStorage(tasks) {
  const list = document.getElementById("list");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.id = task.id;
    li.textContent = task.text;
    if (task.checked) {
      li.classList.add("checked");
    }
    attachCloseButton(li);
    list.appendChild(li);
  });
}
// silme butonu ekleme fonksiyonu
function attachCloseButton(li) {
  const span = document.createElement("span");
  span.className = "btn-close";
  li.appendChild(span);
}
// yapıldı işaretleme
const list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (e) {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // silme işlemleri
    if (e.target.classList.contains("btn-close")) {
      const li = e.target.closest("li");
      const id = Number(li.id);
      // localStorage'tan silme
      const updated = tasks.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      li.remove();
      return;
    }
    // Yapıldı işaretleme
    if (e.target.tagName === "LI") {
      const li = e.target;
      li.classList.toggle("checked");
      const id = Number(li.id);
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, checked: li.classList.contains("checked") } : t
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },
  false
);
// girdileri listeye ekleme
function newElement() {
  const taskText = document.getElementById("task").value.trim();
  if (taskText.length === 0) {
    $(".error").toast("show");
    return;
  }
  const list = document.getElementById("list");
  // DOM
  const li = document.createElement("li");
  li.id = idCounter;
  li.textContent = taskText;
  attachCloseButton(li);
  list.appendChild(li);
  // STORAGE
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tasks.push({
    id: idCounter,
    text: taskText,
    checked: false,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  idCounter++;

  $(".success").toast("show");
  document.getElementById("task").value = "";
}
