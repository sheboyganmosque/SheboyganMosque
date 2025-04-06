---
layout: page
title: "Contact"
subtitle: "Get in touch with Islamic Society of Sheboygan"
permalink: /contact/
---

<!-- Add EmailJS script -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init("X4HQo9D8QodjcS4JQ"); // Replace with your EmailJS public key
  })();
</script>

<div class="container py-4">
  <div class="row">
    <!-- Contact Form -->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h2 class="h5 mb-3">Send us a Message</h2>
          <form id="contact-form">
            <div class="mb-3">
              <input type="text" class="form-control" name="from_name" placeholder="Your Name" required>
            </div>
            
            <div class="mb-3">
              <input type="email" class="form-control" name="from_email" placeholder="Your Email" required>
            </div>
            
            <div class="mb-3">
              <textarea class="form-control" name="message" rows="4" placeholder="Your Message" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h2 class="h5 mb-3">Contact Information</h2>
          <div class="mb-3">
            <i class="fas fa-map-marker-alt me-2"></i>
            Islamic Society of Sheboygan<br>
            9110 Sauk Trail Rd<br>
            Oostburg, WI 53070
          </div>
          
          <div class="mb-3">
            <i class="fas fa-phone me-2"></i>
            (920) 467-0599
          </div>
          
          <div class="mb-3">
            <i class="fas fa-envelope me-2"></i>
            sheboyganmosque@gmail.com
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Map -->
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h2 class="h5 mb-3">Location</h2>
          <div class="ratio ratio-16x9">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.6627109701258!2d-87.77461802382366!3d43.644490171102554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8804a49cb675a77f%3A0xaa465b2014abf05a!2sIslamic%20Society%20of%20Sheboygan!5e1!3m2!1sen!2sus!4v1743903845870!5m2!1sen!2sus" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get form data
  const formData = {
    from_name: this.from_name.value,
    from_email: this.from_email.value,
    message: this.message.value,
    to_email: 'sheboyganmosque@gmail.com' // Your recipient email
  };

  // Send email using EmailJS
  emailjs.send('service_ubvg252', 'template_8t8tr7z', formData)
    .then(function(response) {
      alert('Thank you for your message. We will get back to you soon.');
      this.reset();
    }, function(error) {
      alert('Sorry, there was an error sending your message. Please try again later.');
      console.error('EmailJS Error:', error);
    });
});
</script>
