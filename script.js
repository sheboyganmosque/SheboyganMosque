document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_ubvg252', 'template_8t8tr7z', this)
        .then(function() {
            alert('Message sent!');
        }, function(error) {
            alert('Failed to send message. Please try again later.');
        });
});

