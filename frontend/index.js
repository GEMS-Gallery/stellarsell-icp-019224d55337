import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      await backend.submitContact(name, email, message);
      alert('Thank you for your message. We will get back to you soon!');
      contactForm.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again later.');
    }
  });
});
