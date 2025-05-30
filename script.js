let clickCount = 0; // zmienna do przechowywania liczby kliknięć
const visitKey = "visits"; // klucz do ciasteczka przechowującego liczbę wizyt
const sessionKey = "sessionHistory"; // klucz do localStorage przechowującego historię sesji

function getCookie(name) { // funkcja pobierajaca wartość ciasteczka
  const cookies = document.cookie.split("; "); // dzieli ciasteczka na tablicę
  for (let c of cookies) { // iteruje przez ciasteczka
    const [key, value] = c.split("="); // dzieli ciasteczko na klucz i wartość
    if (key === name) return decodeURIComponent(value); // jeśli klucz pasuje, zwraca wartość
  }
  return null; // jeśli nie znaleziono, zwraca null
}

function setCookie(name, value, days = 365) { // funkcja ustawiająca ciasteczko
  const expires = new Date(Date.now() + days * 86400000).toUTCString(); // oblicza datę wygaśnięcia ciasteczka
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`; // ustawia ciasteczko z wartością, datą wygaśnięcia i ścieżką
}

function updateVisits() { // funkcja aktualizująca liczbę wizyt
  let count = parseInt(getCookie(visitKey) || "0") + 1; // pobiera wartość ciasteczka lub ustawia na 0, jeśli nie istnieje
  setCookie(visitKey, count); // ustawia ciasteczko z nową wartością
  document.getElementById("visitCount").textContent = count; // aktualizuje licznik wizyt na stronie

  const sessions = JSON.parse(localStorage.getItem(sessionKey) || "[]"); // pobiera historię sesji z localStorage lub ustawia pustą tablicę, jeśli nie istnieje
  const now = new Date().toLocaleString(); // pobiera aktualny czas
  sessions.push(`Nowe wejście: ${now}`); // dodaje nowy wpis do historii sesji
  localStorage.setItem(sessionKey, JSON.stringify(sessions)); // zapisuje zaktualizowaną historię sesji do localStorage
  renderSessionList(); // renderuje listę sesji na stronie
}

function renderSessionList() { // funkcja renderująca listę sesji na stronie
  const list = document.getElementById("sessionList"); // pobiera element listy sesji z DOM
  const sessions = JSON.parse(localStorage.getItem(sessionKey) || "[]"); // pobiera historię sesji z localStorage lub ustawia pustą tablicę, jeśli nie istnieje
  list.innerHTML = ""; // czyści zawartość listy sesji
  sessions.slice().reverse().forEach(entry => { // iteruje przez historię sesji w odwrotnej kolejności
    const li = document.createElement("li"); // tworzy nowy element listy
    li.textContent = entry; // ustawia tekst elementu listy na wpis z historii sesji
    list.appendChild(li); // dodaje element listy do listy sesji
  });
}

document.getElementById("clickMe").addEventListener("click", () => { // dodaje nasłuchiwacz zdarzenia kliknięcia na przycisk
  clickCount++; // zwiększa licznik kliknięć
  document.getElementById("clickCount").textContent = clickCount; // aktualizuje wyświetlaną liczbę kliknięć

  const sessions = JSON.parse(localStorage.getItem(sessionKey) || "[]"); // pobiera historię sesji z localStorage lub ustawia pustą tablicę, jeśli nie istnieje
  const now = new Date().toLocaleString(); // pobiera aktualny czas
  sessions.push(`Nowe kliknięcie: ${now}`); // dodaje nowy wpis do historii sesji
  localStorage.setItem(sessionKey, JSON.stringify(sessions)); // zapisuje zaktualizowaną historię sesji do localStorage
  renderSessionList(); // renderuje listę sesji na stronie
});

function resetAll() { // funkcja resetująca wszystkie liczniki i ciasteczka
  setCookie(visitKey, 0); // resetuje liczbę wizyt w ciasteczku
  clickCount = 0; // resetuje licznik kliknięć
  document.getElementById("clickCount").textContent = clickCount; // aktualizuje wyświetlaną liczbę kliknięć
  localStorage.removeItem(sessionKey); // usuwa historię sesji z localStorage
  updateVisits(); // aktualizuje liczbę wizyt i historię sesji
}

function resetVisits() { // funkcja resetująca liczbę wizyt
  setCookie(visitKey, 0); // resetuje liczbę wizyt w ciasteczku
  updateVisits(); // aktualizuje liczbę wizyt na stronie
}

function resetClicks() { // funkcja resetująca licznik kliknięć
  clickCount = 0; // resetuje licznik kliknięć
  document.getElementById("clickCount").textContent = clickCount; // aktualizuje wyświetlaną liczbę kliknięć
}

function resetSessions() { // funkcja resetująca historię sesji
  localStorage.removeItem(sessionKey); // usuwa historię sesji z localStorage
  renderSessionList(); // renderuje pustą listę sesji na stronie
}

updateVisits(); // wywołuje funkcję aktualizującą liczbę wizyt przy ładowaniu strony
