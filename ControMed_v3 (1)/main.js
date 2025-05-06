let username = "";
let reviews = [];
let appointments = [];

let map = L.map('map').setView([44.4268, 26.1025], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const clinics = [
  { name: "Clinica Sănătate București", specialty: "cardiologie", location: "bucurești", coords: [44.4268, 26.1025] },
  { name: "Centrul Medical Iași", specialty: "pediatrie", location: "iași", coords: [47.1585, 27.6014] },
  { name: "Policlinica Cluj", specialty: "dermatologie", location: "cluj", coords: [46.7712, 23.6236] }
];

function login() {
  username = document.getElementById("username").value;
  if (username) {
    document.getElementById("welcomeMsg").innerText = `Salut, ${username}!`;
  }
}

function searchClinics() {
  const specialty = document.getElementById("specialty").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const results = clinics.filter(c =>
    c.specialty.includes(specialty) && c.location.includes(location)
  );
  const list = document.getElementById("clinicList");
  list.innerHTML = "";
  map.eachLayer((layer) => { if (layer instanceof L.Marker) map.removeLayer(layer); });

  if (results.length > 0) {
    results.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.name} (${c.specialty}, ${c.location})`;
      list.appendChild(li);
      L.marker(c.coords).addTo(map).bindPopup(c.name);
    });
    map.setView(results[0].coords, 12);
  } else {
    list.innerHTML = "<li>Nicio clinică găsită.</li>";
    map.setView([44.4268, 26.1025], 6);
  }
}

function submitReview() {
  const text = document.getElementById("reviewText").value;
  if (username && text) {
    reviews.push(`${username}: ${text}`);
    updateReviews();
    document.getElementById("reviewText").value = "";
  }
}

function updateReviews() {
  const list = document.getElementById("reviewList");
  list.innerHTML = "";
  reviews.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    list.appendChild(li);
  });
}

function bookAppointment() {
  const clinic = document.getElementById("apptClinic").value;
  const date = document.getElementById("apptDate").value;
  if (clinic && date) {
    appointments.push(`${clinic} - ${date}`);
    updateAppointments();
  }
}

function updateAppointments() {
  const list = document.getElementById("appointments");
  list.innerHTML = "";
  appointments.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    list.appendChild(li);
  });
}

function chat() {
  const input = document.getElementById("chatInput").value.toLowerCase();
  const chatLog = document.getElementById("chatLog");
  let response = "Îmi pare rău, nu am înțeles întrebarea.";

  if (input.includes("programare")) response = "Pentru programări, completează secțiunea de mai sus.";
  else if (input.includes("cardiologie")) response = "Avem 1 clinică de cardiologie în București.";
  else if (input.includes("salut") || input.includes("bună")) response = "Salut! Cu ce te pot ajuta?";

  chatLog.innerHTML += `<div><b>Tu:</b> ${input}</div><div><b>ControMed:</b> ${response}</div>`;
  document.getElementById("chatInput").value = "";
}
