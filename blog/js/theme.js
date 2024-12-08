const baseUrl = document.querySelector("base").getAttribute("href");
const darkCodeHighlight = baseUrl + "/css/dark.css";
const lightCodeHighlight = baseUrl + "/css/light.css";
const title = "Code highlight";

const nightModeButton = document.getElementById("nightModeButton");
const nightModeDiv = document.getElementById("nightModeDiv");

const getLinkToCssHighlight = (mode) => {
    const cssNode = document.createElement('link');
    cssNode.type = "text/css";
    cssNode.rel = "stylesheet";
    switch (mode) {
        case "light":
            cssNode.href = lightCodeHighlight;
            break;
        case "dark":
        default:
            cssNode.href = darkCodeHighlight;
    }
    cssNode.media = "screen";
    cssNode.title = title;
    return cssNode;
}

const removeLinkToCssHighlight = () => {
    const head = document.querySelector("head");
    for (let child of head.children) {
        if (child.tagName.toLowerCase() == "link" && child.hasAttribute("title") && child.getAttribute("title") == title) {
            child.remove();
        }
    }
}

const switchLinkToCssHighlight = (mode) => {
    removeLinkToCssHighlight();
    let head = document.querySelector("head");
    head.appendChild(getLinkToCssHighlight(mode));
}

// Dark Mode Handler => switch theme on button click.
const darkModeHandler = () => {
    if (localStorage.getItem("darkMode") == "1") {
        nightModeDiv.classList.remove("dark-theme");
        localStorage.setItem("darkMode", "0");
        switchLinkToCssHighlight("light");
    } else {
        nightModeDiv.classList.add("dark-theme");
        localStorage.setItem("darkMode", "1");
        switchLinkToCssHighlight("dark");
    }
};

// Dark Moda State Handler => check if a 'darkMode' local store exist. 
// If exists and its value is "1", activate darkMode, if exists and 
// its value is "0", does nothing, if not exists, a localStorage called 
// 'darkMode' and assign 0 or 1 depending on the browser 
// prefers-color-scheme media query.
const lightModePreference = window.matchMedia("(prefers-color-scheme: light)");

const darkModeState = () => {
    switch (localStorage.getItem("darkMode")) {
        case "1":
            nightModeDiv.classList.add("dark-theme");
            switchLinkToCssHighlight("dark");
            break;
        case "0":
            switchLinkToCssHighlight("light");
            break;
        default:
            localStorage.setItem("darkMode", lightModePreference.matches ? "0" : "1");
            switchLinkToCssHighlight(lightModePreference.matches ? "light" : "dark");
    }
};

// Initialize theme and listen to theme changes
if (localStorage.getItem("darkMode") == "0") {
    nightModeDiv.classList.remove("dark-theme");
    switchLinkToCssHighlight("light"); 
}
nightModeButton.addEventListener("click", darkModeHandler);
nightModeDiv.addEventListener("load", darkModeState());
lightModePreference.addEventListener("change", e => {
    localStorage.setItem("darkMode", lightModePreference.matches ? "1" : "0"); // Reverse local storage value
    darkModeHandler(); // Then switch it to go to the right one
});

