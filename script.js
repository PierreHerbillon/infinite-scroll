const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 11;
const apiKey = 'I-n-048Tjmaf5p6HaEslReHisTb9KtYBJkswa60zs70';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images where correctly loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    } 
}

// helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    // using a for inloop
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// create elements for links and photos and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
    // create a <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
    // create <img> for photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
    // Event listener - checking when each is finished loading
        img.addEventListener('load', imageLoaded);
    // put <img> inside the <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });    
}

// get photos from unsplash API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}
// Check to see if approaching bottom of page it loads more photos
// infos about scroll events : https://www.w3schools.com/jsref/dom_obj_event.asp

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();  
    }
})


// on load
getPhotos();