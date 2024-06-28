document.addEventListener('DOMContentLoaded', (event) => {
   const searchForm = document.getElementById('search-form');
   const searchEngineSelect = document.getElementById('search-engine');
   const searchInput = document.getElementById('search-input');
   const searchButton = document.getElementById('search-button');
   const heading = document.getElementById('typing-heading');
   const submitCounter = document.getElementById('submit-counter');

   const texts = [
      "Welcome to Search...",
        "Welcome to our site!",
        "Hi there, need any help?",
        "Contact us for more info.",
        "How are you?",
        "Login to your account."
    ];
   const colors = ['#00ffcc', ];
   let count = 0;
   let index = 0;
   let currentText = "";
   let isDeleting = false;
   let typingTimer;
   const doneTypingInterval = 300; // Time in milliseconds (0.5 seconds)
   let clickCounter = 0;

   function type() {
      if (count === texts.length) {
         count = 0;
      }
      currentText = texts[count];

      let letter = "";
      if (isDeleting) {
         letter = currentText.slice(0, --index);
      } else {
         letter = currentText.slice(0, ++index);
      }

      // Reset innerHTML to empty before adding letters with different colors
      heading.innerHTML = "";
      for (let i = 0; i < letter.length; i++) {
         heading.innerHTML += `<span style="color:${colors[Math.floor(Math.random() * colors.length)]}">${letter[i]}</span>`;
      }

      if (!isDeleting && letter.length === currentText.length) {
         setTimeout(() => isDeleting = true, 3000); // Increased pause before deleting
      } else if (isDeleting && letter.length === 0) {
         isDeleting = false;
         count++;
      }

      setTimeout(type, isDeleting ? 130 : 170); // Increased typing and deleting speed

      // Check for typing stop
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
         searchButton.classList.remove('submitted');
         searchButton.classList.add('submitting');
      }, doneTypingInterval);
   }

   type();

   searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedEngine = searchEngineSelect.value;
      const query = encodeURIComponent(searchInput.value.trim());
      if (query) {
         const searchUrl = `${selectedEngine}${query}`;
         window.location.href = searchUrl;
      }
      searchButton.classList.remove('submitted');
      searchButton.classList.add('submitting');
      setTimeout(() => {
         searchButton.classList.remove('submitting');
         searchButton.classList.add('submitted');
      }, 500);
      clickCounter++;
      submitCounter.textContent = ` ${clickCounter}`;
   });

   searchButton.addEventListener('click', () => {
      clearTimeout(typingTimer);
      searchButton.classList.remove('submitted');
      searchButton.classList.add('submitting');
      setTimeout(() => {
         searchButton.classList.remove('submitting');
         searchButton.classList.add('submitted');
      }, 500);
   });
});