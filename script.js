// ---------- Mobile navigation toggle ----------
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---------- Contact form validation + processing ----------
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var isValid = true;

      var fields = [
        { id: 'name', check: function (v) { return v.trim().length > 1; }, message: 'Please enter your full name.' },
        { id: 'email', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, message: 'Please enter a valid email address.' },
        { id: 'package', check: function (v) { return v !== ''; }, message: 'Please choose a package.' },
        { id: 'message', check: function (v) { return v.trim().length > 5; }, message: 'Tell us a little more about your trip (at least 6 characters).' }
      ];

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        var row = input.closest('.form-row');
        var errorEl = row.querySelector('.error-msg');
        if (!field.check(input.value)) {
          row.classList.add('has-error');
          if (errorEl) errorEl.textContent = field.message;
          isValid = false;
        } else {
          row.classList.remove('has-error');
        }
      });

      var successBox = document.getElementById('form-success');

      if (isValid) {
        // Simulate processing the submitted data (no backend available on GitHub Pages)
        var submittedData = {
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          package: document.getElementById('package').value,
          message: document.getElementById('message').value.trim()
        };
        console.log('Contact form submitted:', submittedData);

        successBox.textContent = 'Thanks, ' + submittedData.name + '! Your message has been received. We\'ll reply to ' + submittedData.email + ' within one business day.';
        successBox.classList.add('show');
        form.reset();
      } else {
        successBox.classList.remove('show');
      }
    });
  }
});
