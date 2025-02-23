const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// Expresión regular básica para validar correos
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/sendEmails', async (req, res) => {
  const { emails, subject, message } = req.body;

  if (!subject || !message || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'Por favor, completa todos los campos y agrega al menos un correo.' });
  }

  // Filtra las direcciones válidas
  const validEmails = emails.filter(email => emailRegex.test(email));
  if (validEmails.length === 0) {
    return res.status(400).json({ error: 'No se encontraron direcciones de correo válidas.' });
  }

  // Configuración del transporte (ejemplo usando Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu.email@gmail.com',       // Reemplaza con tu correo
      pass: 'tu_contraseña'              // Reemplaza con tu contraseña o app password
    }
  });

  const mailOptions = {
    from: '"Tu Nombre" <tu.email@gmail.com>',
    bcc: validEmails.join(', '),
    subject: subject,
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ message: 'Correos enviados correctamente.', info });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar los correos.', details: error });
  }
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});
