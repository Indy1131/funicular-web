// CONSTANTS

const mainLogo = document.getElementById('offer-logo');
const social = document.getElementById('social');

const back = document.getElementById('back');

const fakeScroll = document.getElementById('fake-scroll');
const scrollMain = document.getElementById('scroll-main');
const scrollContainer = document.getElementById('scroll-container');
const portrait1 = document.getElementById('portrait');

const footer = document.getElementById('footer');

//SCROLL EVENT SETUP

// const newspaperSpinning = [
//     { transform: "rotate(0) scale(1)" },
//     { transform: "rotate(360deg) scale(0)" },
//   ];
  
//   const newspaperTiming = {
//     duration: 700,
//     iterations: 1,
//     fill: "forwards"
//   };

function moveLogo(reversing) {
    if (!reversing) {
        mainLogo.style.position = "absolute";
        mainLogo.style.top = "110lvh";
    } else {
        mainLogo.style.transition = "none";
        mainLogo.style.position = "fixed";
        mainLogo.style.top = "10%";
    }
}

function transLogo(reversing) {
    if (!reversing) {
        mainLogo.style.opacity = "0";
    } else {
        mainLogo.style.opacity = "1";
    }
}

function revealConnect(reversing) {
    if (!reversing) {
        // social.style.width = "100%";
        social.style.left = "0";
        social.style.opacity = "1";
    } else {
        // social.style.width = "80%";
        social.style.left = "-10%";
        social.style.opacity = "0";
    }
}

function blurScreen(reversing) {
    if (!reversing) {
        social.style.opacity = "0";
        back.style.top = "150lvh";

    } else {
        social.style.opacity = "1";
        back.style.top = "250lvh";
    }
}

function makeVisible(reversing, element) {
    if (!reversing) {
        element.style.opacity = "1";
    }
}

function moveFooter(reversing) {
    if (!reversing) {
        scrollMain.style.top = "auto";
        scrollContainer.style.height = "100%";
        scrollContainer.style.position = "absolute";
    } else {
        scrollMain.style.top = "60%";
        scrollContainer.style.height = "30%";
        scrollContainer.style.position = "fixed";
    }
}

const getOffsetTop = element => {
    let offsetTop = 0;
    while(element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
}

const scrollEvents = {
    // 1:[moveLogo, false],
    .05:[transLogo, false],
    // 1:[revealConnect, false],
    // 1.5:[blurScreen, false],
}

var scrollSave = getOffsetTop(fakeScroll)
var pixelEvents = {
    [scrollSave]:[moveFooter, false, fakeScroll],
}

var cusid_ele = document.getElementsByClassName('bannerFade');
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];
    pixelEvents[getOffsetTop(item)] = [makeVisible, false, item, true] 
}

//VARIABLES

var scrollPos = 0;
var pixelPos = 0;

//GENERAL FUNCTIONS

function setScrollWidth() {
    scrollContainer.style.setProperty('--scroll-width', -1 * portrait1.clientWidth + "px");
}

function setPixelEvents() {
    let newPixel = window.scrollY + (window.innerHeight* .6) - 31
    var newPixelEvents = {};
    for (const [key, value] of Object.entries(pixelEvents)) {
        newPixelEvents[getOffsetTop(value[2])] = value

        if (newPixel > key && !value[1]) {
            value[0](value[1]);
            value[1] = true;
        }
    }

    pixelEvents = newPixelEvents;  
    pixelPos = newPixel;
}

//CONNECTED FUNCTIONS

window.addEventListener("scroll", (event) => {
    let windowSize = window.innerHeight

    let newScroll = window.scrollY / windowSize;
    let newPixel = window.scrollY + (window.innerHeight* .6) - 31

    //If scrolling down...
    if (newScroll > scrollPos) {
        for (const [key, value] of Object.entries(scrollEvents)) {
            if (newScroll > key && !value[1]) {
                value[0](value[1]);
                value[1] = true;
            }
        }

        for (const [key, value] of Object.entries(pixelEvents)) {
            if (newPixel > key && !value[1]) {
                if (value[3]) {
                    value[0](value[1], value[2]);
                } else {
                    value[0](value[1]);
                }
                value[1] = true;
            }
        }
    } else {
        for (const [key, value] of Object.entries(scrollEvents)) {
            if (newScroll < key && value[1]) {
                value[0](value[1]);
                value[1] = false;
            }
        }

        for (const [key, value] of Object.entries(pixelEvents)) {
            if (newPixel < key && value[1]) {
                if (value[3]) {
                    value[0](value[1], value[2]);
                } else {
                    value[0](value[1]);
                }
                value[1] = false;
            }
        }
    }

    scrollPos = newScroll
    pixelPos = newPixel
});

window.onload = function() {
    setScrollWidth();

    let windowSize = window.innerHeight
    let newScroll = window.scrollY / windowSize;

    for (const [key, value] of Object.entries(scrollEvents)) {
        if (newScroll > key && !value[1]) {
            value[0](value[1]);
            value[1] = true;
        }
    }

    setPixelEvents()

    scrollPos = newScroll;
}

window.addEventListener("resize", (event) => {
    setScrollWidth();
    setPixelEvents();
});

window.addEventListener("fullscreenchange", (event) => {
    setPixelEvents();    
});