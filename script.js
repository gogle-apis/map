// Array para almacenar correos
const emails = [];
// Expresión regular básica para validar el formato de correo
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function addEmail() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();
  if (!email) return;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }
  if (!emails.includes(email)) {
    emails.push(email);
    updateEmailList();
    emailInput.value = "";
  } else {
    alert("El correo ya fue agregado.");
  }
}

function updateEmailList() {
  const emailList = document.getElementById('emailList');
  emailList.innerHTML = emails.map(email => `<li>${email}</li>`).join('');
}

function sendEmails() {
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!subject || !message || emails.length === 0) {
    alert("Por favor, completa todos los campos y agrega al menos un correo.");
    return;
  }

  // Realiza una petición POST al endpoint de tu backend
  fetch('https://TU_BACKEND_URL/sendEmails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails, subject, message })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message || "Correos enviados correctamente.");
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Ocurrió un error al enviar los correos.");
  });
}

document.getElementById('addEmailBtn').addEventListener('click', addEmail);
document.getElementById('sendEmailsBtn').addEventListener('click', sendEmails);
