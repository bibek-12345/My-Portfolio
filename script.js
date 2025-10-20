
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// --------------Side menu---------------

var sidemenu = document.getElementById("sidemenu");

// Function to open the side menu
function openmenu() {
    sidemenu.style.right = "0"; // Show the menu
}

// Function to close the side menu
function closemenu() {
    sidemenu.style.right = "-200px"; // Hide the menu
}

// Add click event listener to each menu item for scrolling and closing menu
document.querySelectorAll('#sidemenu li a').forEach(item => {
    item.addEventListener('click', function(e) {
        const targetSection = this.getAttribute('href');
        
        // Check if the link is for the PDF file
        if (targetSection.endsWith('.pdf')) {
            // Allow the default behavior for PDF links
            return; 
        }

        e.preventDefault(); // Prevent default anchor click behavior
        
        // Smooth scroll to the target section
        document.querySelector(targetSection).scrollIntoView({ behavior: 'smooth' });

        // Close the side menu
        closemenu();
    });
});

// Close the side menu when the user scrolls
window.addEventListener('scroll', function() {
    if (sidemenu.style.right === "0px") { // Check if the menu is open
        closemenu(); // Close the menu
    }
});


// Optional: If you have a close button, it will also close the menu
document.querySelector('#sidemenu .fa-xmark').addEventListener('click', closemenu);


// -------------Contact form get data of client to admin---------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbxb-nylGeBamJZruEPrWMy7DBmN1AW_qTiDeV1dW_ha670hS7wtUNCLj30o4ypaAITe/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message Sent Successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

// ------------Projects--------------
const projects = [
    { 
        img: "images/tictactoe.png", 
        title: "TicTacToe", 
        description: "Created TicTacToe game using DOM and events concept of JS", 
        link: "https://bejewelled-marzipan-debd8b.netlify.app/", 
        githubLink: "https://github.com/bibek-12345/JavaScriptGamesProjects/tree/main/TicTacToe"
    },
    { 
        img: "images/travel.png", 
        title: "Travel website", 
        description: "Created simple travel website using just html and css.", 
        link: "https://cheery-babka-785da0.netlify.app/",
        githubLink: "https://github.com/bibek-12345/frontEndProjects/tree/main/TravelWebsite" 
    },
    { 
        img: "images/work-3.png", 
        title: "Online Shopping App", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        link: "https://your-netlify-link-3.netlify.app",
        githubLink: "https://github.com/your-username/social-media-app" 
    },
    { 
        img: "images/work-2.png", 
        title: "Social Media App", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        link: "https://your-netlify-link-1.netlify.app",
        githubLink: "https://github.com/your-username/social-media-app" 
    },
    { 
        img: "images/work-2.png", 
        title: "Music App", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        link: "https://your-netlify-link-2.netlify.app",
        githubLink: "https://github.com/your-username/social-media-app" 
    },
    { 
        img: "images/work-3.png", 
        title: "Online Shopping App", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        link: "https://your-netlify-link-3.netlify.app",
        githubLink: "https://github.com/your-username/social-media-app" 
    },
 
    
    // Add more projects as needed
];

let currentIndex = 0; // Track how many projects are currently shown
const projectsPerLoad = 4; // Maximum projects to load at a time

// Function to render projects
function renderProjects() {
    const workList = document.getElementById('work-list');
    const nextProjects = projects.slice(currentIndex, currentIndex + projectsPerLoad); // Get the next 4 projects
    nextProjects.forEach(project => {
        const workDiv = document.createElement('div');
        workDiv.classList.add('work');
        workDiv.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <div class="layer">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank"><i class="fa-solid fa-link"></i></a>
                <a href="${project.githubLink}" target="_blank" class="github-link"><i class="fa-brands fa-github"></i></a>
            </div>
        `;
        workList.appendChild(workDiv); // Add the project to the work list
    });
    currentIndex += nextProjects.length; // Update current index

    // Hide the See More button if all projects are shown
    if (currentIndex >= projects.length) {
        document.getElementById('see-more-btn').style.display = 'none';
    }
    // Show the Show Less button if more than 4 projects are shown
    if (currentIndex > 4) {
        document.getElementById('show-less-btn').style.display = 'inline-block';
    }
}

// Function to hide the last 4 projects
function hideProjects() {
    const workList = document.getElementById('work-list');
    const workItems = workList.getElementsByClassName('work'); // Get all project items
    // Remove the last 4 work items if they exist
    for (let i = 0; i < projectsPerLoad; i++) {
        if (workItems.length > 0) {
            workList.removeChild(workItems[workItems.length - 1]);
        }
    }
    currentIndex -= projectsPerLoad; // Update current index
    // Show the See More button again
    if (currentIndex < projects.length) {
        document.getElementById('see-more-btn').style.display = 'inline-block';
    }
    // Hide the Show Less button if only 4 or fewer projects are shown
    if (currentIndex <= 4) {
        document.getElementById('show-less-btn').style.display = 'none';
    }
}

// Initial render of the first 4 projects
renderProjects();

// Event listener for the See More button
document.getElementById('see-more-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    renderProjects(); // Load more projects
});

// Event listener for the Show Less button
document.getElementById('show-less-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    hideProjects(); // Hide the last set of projects
});



particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60 },
    "size": { "value": 2 },
    "color": { "value": "#4e7a7b" },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#4e7a7b",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": false },
      "onclick": { "enable": false }
    }
  },
  "retina_detect": true
});

// animated header text

const text = "Hi, I'm Bibek Bhattarai from Canada";
const typingSpan = document.getElementById("typing-text");
let i = 0;
function typeWriter() {
  if (i < text.length) {
    typingSpan.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50); // typing speed
  }else {
    document.querySelector('.cursor').style.display = 'none'; //Hide cursor after typing
  }
}
// Start typing after the zoom finishes
window.addEventListener('load', () => {
  setTimeout(typeWriter, 100); // Wait for zoom animation
});

