/* GLOBAL ID COUNTER */
let idCounter = 0;
/* LOCALSTORAGE KEY */
const STORAGE_KEY = "tasks";

// listedekilere buton ekleme ve local storage'a kayıt etme
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved && Array.isArray(saved)) {
    // LocalStorage'ta bilgi varsa görevleri storage'dan tekrar render et
    renderFromStorage(saved);
    const lastLi = document.querySelector("#list li:last-child");
    idCounter = lastLi ? Number(lastLi.id) + 1 : 0;
  } else {
    // kayıtta görev yoksa index.html içinden oku ve listeyi doldur
    const initialTasks = [];
    const liItems = document.querySelectorAll("#list li");
    liItems.forEach((li, index) => {
      li.id = index;
      initialTasks.push({
        id: index,
        text: li.textContent.trim(),
        checked: li.classList.contains("checked"),
      });
      attachCloseButton(li);
    });
    const lastLi = document.querySelector("#list li:last-child");
    idCounter = lastLi ? Number(lastLi.id) + 1 : 0;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
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
