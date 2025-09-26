document.addEventListener("DOMContentLoaded", function() {
  const projectsDiv = document.getElementById("projectsDiv");
  if (projectsDiv) {
    projectsDiv.addEventListener("click", function() {
      window.location.href = "projects.html"; // Navigate to the new page
    });
  }
});

document.querySelectorAll('a').forEach(link => {
  if (window.location.href.includes(link.getAttribute('href'))) {
    link.classList.add('active-menu');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Fade in on page load
  document.body.classList.remove('fade-out');

  // Attach click event to links with class fade-link
  document.querySelectorAll('a.fade-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // prevent the default immediate navigation
      const href = link.href;
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 500); // this delay matches the CSS transition duration
    });
  });
});


// Complete Search Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if search form exists
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchForm || !searchInput) {
        console.error('Search form or input not found. Make sure you have the HTML elements.');
        return;
    }
    
    // Add the search functionality
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting normally
        
        const query = searchInput.value.toLowerCase().trim();
        
        // Check if query is empty
        if (!query) {
            alert('Please enter a search term.');
            return;
        }
        
        // Define your pages - UPDATE THESE TO MATCH YOUR ACTUAL FILE NAMES
        const pages = {
            'home': 'newWebsite.html',
            'html': 'projects.html',
            'projects': 'projects.html',
            'javascript': 'javascriptProjects.html',
            'js': 'javascriptProjects.html', // Alternative for javascript
            'photo editing': 'photoEditing.html',
            'photo': 'photoEditing.html', // Short version
            'python': 'pythonProjects.html',
            'py': 'pythonProjects.html', // Short version
            'makecode': 'makeCodeProjects.html',
            'make code': 'makeCodeProjects.html', // With space
            'contact me': 'contactMe.html',
            'about me': 'aboutMe.html'
        };
        
        console.log('Searching for:', query); // For debugging
        
        // Try exact match first
        if (pages[query]) {
            console.log('Exact match found, redirecting to:', pages[query]);
            window.location.href = pages[query];
            return;
        }
        
        // Try partial match
        const matchedKey = Object.keys(pages).find(key => {
            return key.includes(query) || query.includes(key);
        });
        
        if (matchedKey) {
            console.log('Partial match found:', matchedKey, 'redirecting to:', pages[matchedKey]);
            window.location.href = pages[matchedKey];
        } else {
            // Show available options when nothing is found
            const availablePages = Object.keys(pages).join(', ');
            alert(`No page found for "${query}".\n\nAvailable pages: ${availablePages}`);
        }
    });
    
    // Optional: Add search suggestions as user types
    addSearchSuggestions();
});

// Function to add search suggestions (optional enhancement)
function addSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const pages = ['home', 'html', 'projects', 'javascript', 'photo editing', 'python', 'makecode'];
    
    // Create suggestions container
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = 'searchSuggestions';
    suggestionsDiv.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #ccc;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        width: 300px;
        display: none;
        z-index: 1000;
    `;
    
    searchInput.parentNode.appendChild(suggestionsDiv);
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        suggestionsDiv.innerHTML = '';
        
        if (query.length === 0) {
            suggestionsDiv.style.display = 'none';
            return;
        }
        
        const matches = pages.filter(page => page.includes(query));
        
        if (matches.length > 0) {
            matches.forEach(match => {
                const suggestion = document.createElement('div');
                suggestion.textContent = match;
                suggestion.style.cssText = `
                    padding: 10px;
                    cursor: pointer;
                    border-bottom: 1px solid #eee;
                `;
                
                suggestion.addEventListener('click', function() {
                    searchInput.value = match;
                    suggestionsDiv.style.display = 'none';
                    // Trigger search
                    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
                });
                
                suggestion.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#f0f0f0';
                });
                
                suggestion.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'white';
                });
                
                suggestionsDiv.appendChild(suggestion);
            });
            
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

// Alternative: Simple version without suggestions
function simpleSearch() {
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        
        const pages = {
            'home': 'newWebsite.html',
            'html': 'projects.html',
            'projects': 'projects.html',
            'javascript': 'javascriptProjects.html',
            'photo editing': 'photoEditing.html',
            'python': 'pythonProjects.html',
            'makecode': 'makeCodeProjects.html',
            'contact me': 'contactMe.html',
            'about me': 'aboutMe.html'
        };
        
        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            const matchedKey = Object.keys(pages).find(key => query.includes(key));
            if (matchedKey) {
                window.location.href = pages[matchedKey];
            } else {
                alert('No page found for "' + query + '".');
            }
        }
    });
}

// Export for use in other scripts
window.initializeSearch = function() {
    console.log('Search functionality initialized');
};
