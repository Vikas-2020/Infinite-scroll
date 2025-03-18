const accessKey = "ppkTR5GgzjzY0Tb7p1afq9sMUknWkSDHuGAOvebTPhU";
const count = 15;
const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`;

const imageDiv = document.querySelector(".images");
const loader = document.querySelector(".loader-container");
let loaded = false;
async function getPhotos() {
  loaded = false;
  loader.style.display = "flex";
  try {
    let response = await fetch(url);
    let result = await response.json();
    displayPhotos(result);
    console.log(result);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
  loader.style.display = "none";
}

function displayPhotos(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((obj) => {
    const image = document.createElement("img");
    image.src = obj.urls.regular;
    fragment.appendChild(image);
  });
  imageDiv.append(fragment);
  loaded = true;
}

//infinite scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    loaded
  ) {
    getPhotos();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".btn-up");

  // Hide button initially
  scrollBtn.style.display = "none";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "flex"; // Show the button
    } else {
      scrollBtn.style.display = "none"; // Hide the button
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  });
});

getPhotos();
