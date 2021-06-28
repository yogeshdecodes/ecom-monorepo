/**
 * Utility function to add CDN in multiple passes.
 * @param {string} styleString
 */

// let link = document.createElement('link');
// link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
// link.rel = 'stylesheet';
// link.integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm";
// link.crossOrigin="anonymous";

// document.head.append(link);

function loadStyle(src) {
    return new Promise(function (resolve, reject) {
        let link = document.createElement('link');
        link.href = src;
        link.rel = 'stylesheet';

        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`Style load error for ${src}`));

        document.head.append(link);
    });
}

 window.onload = function () {
    loadStyle("https://fonts.googleapis.com/css2?family=Raleway&display=swap")
        .then(() => loadStyle("css/style.css"))
        .then(() => loadStyle("css/icomoon.css"))
        .then(() => {
            alert('All styles are loaded!');
        }).catch(err => alert(err));
}