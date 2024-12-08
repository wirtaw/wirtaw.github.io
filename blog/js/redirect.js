function trimSlash(str) {
    return str.endsWith("/") ? str.slice(0, str.lastIndexOf("/")) : str;
}

window.onload = () => {
    const preferredLocalLang = navigator.language;
    const preferredLang = preferredLocalLang.split("-")[0];
    const url = trimSlash(window.location.href);
    const baseUrl = trimSlash(document.getElementsByTagName("base")[0].getAttribute("href"));
    const availableLangs = Array.from(document.getElementsByTagName("link")).map(linkElement => linkElement.getAttribute("hreflang")).filter((elem) => elem);
    const defaultLang = document.getElementById("default-lang").getAttribute("hreflang");

    if (url.startsWith(baseUrl + "/" + preferredLocalLang)) {
        // Okay
        console.debug("Perfect match");
    } else if (url.startsWith(baseUrl + "/" + preferredLang)) {
        // Okay
        console.debug("Okay");
    } else if (url === baseUrl) {
        // Attempt to redirect to preferred language home page
        if (availableLangs.includes(preferredLocalLang)) {
            window.location.href = baseUrl + "/" + preferredLocalLang;
        } else if (availableLangs.includes(preferredLang)) {
            window.location.href = baseUrl + "/" + preferredLang;
        } else {
            window.location.href = baseUrl + "/" + defaultLang;
        }
    }
}
