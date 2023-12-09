var header = document.getElementById('header');
var jsCards = document.getElementsByClassName('js-card');
var cursortext = document.getElementById('cursor');
var logos = document.getElementsByClassName('logo');
var toggleThemeBtn = document.getElementById('toggle_theme_btn');
var searchBtn = document.getElementById('searchBtn');
var popUp = document.getElementById('popup');

//scroll for header
var navToggle = document.getElementById('nav-toggle');
navToggle.addEventListener('change', () => {
    if (navToggle.checked) {
        document.getElementsByTagName('body')[0].style = 'overflow:hidden';
    } else {
        document.getElementsByTagName('body')[0].style = '';
    }
})

window.onscroll = function () {
    if (window.scrollY > 5) {
        header.className = 'header header--scroll';
    } else {
        header.className = 'header';
    }
};

//toggle popup
popUp.addEventListener('click', (e) => {
    if (e.target.id === 'popup') {
        togglePopup('off');
    }
});
searchBtn.addEventListener('click', (e) => {
    togglePopup('on');
});

function togglePopup(type) {
    var popUp = document.getElementById('popup');
    type === 'on'
        ? (popUp.style = 'opacity:1;visibility:visible')
        : (popUp.style = 'opacity:0;visibility:hidden');
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    toggleThemeBtn.children[0].setAttribute('href', 'img/sprite.svg#icon-' + themeName);
}

function toggleTheme(type) {
    if (localStorage.getItem('theme') === 'theme-dark') {
        type === 'init' ? setTheme('theme-dark') : setTheme('theme-light');
    } else {
        type === 'init' ? setTheme('theme-light') : setTheme('theme-dark');
    }
}

function applyCardHoverEvent(jsCards) {
    //get angle for hover effect
    for (let card of jsCards) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Mouse position
            // reac.left is position of the left side of the rec count from the viewport
            // reac.top is position of the top of the rec count from the viewport
            //x,y is the coordinate of the cursor relative to the rect element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            //get center point of the rect
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            //find angle from coordinate
            const rad = Math.atan2(x - cx, cy - y);
            const deg = rad * (180 / Math.PI);
            card.setAttribute('style', '--rotate: ' + deg + 'deg');
        });
    }
}
//init get theme from local storage and apply corresponded theme
toggleTheme('init');

applyCardHoverEvent(jsCards);
