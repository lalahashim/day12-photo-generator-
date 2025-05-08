const photoUrl = ["public/barton.jpg", "public/Paradise.jpg", "public/Sunset.jpg", "public/photo1.jpg", 
    "public/photo2.jpg", "public/photo3.jpg", "public/photo4.jpg", "public/photo5.jpg", "public/photo6.jpg", 
    "public/photo7.jpg", "public/photo8.jpg", "public/photo9.jpg", "public/photo10.jpg", "public/photo11.jpg", 
    "public/photo12.jpg", "public/photo13.jpg", "public/photo14.jpg", "public/photo15.jpg", "public/photo16.jpg",
    "public/photo17.jpg", "public/photo18.jpg", "public/photo19.jpg", "public/photo20.jpg", "public/photo21.jpg",
    "public/photo22.jpg", "public/photo23.jpg", "public/photo24.jpg"];

const amountInput = document.getElementById("photo-amount");

const photoGenerating = document.getElementById("photo-generating");
const nextSteps = document.getElementById("next-steps");
const addingProcess = document.getElementById("adding-new-photo");
const deletingProcess = document.getElementById("deleting-photo");
const changingProcess = document.getElementById("changing-photo");
const changingSizeProcess = document.getElementById("changing-size");
const photoDisplay = document.getElementById("photos-display");

const generateBtn = document.getElementById("generate");
const addPhotoBtn = document.getElementById("add-photo");
const deletePhotoBtn = document.getElementById("delete-photo");
const changePhotoBtn = document.getElementById("change-photo");
const changePhotoSizeBtn = document.getElementById("change-size");

const addBtn = document.getElementById("add-btn");
const deleteBtn = document.getElementById("delete-btn");
const changeBtn = document.getElementById("change-btn");
const changeSizeBtn = document.getElementById("change-size-btn");


generateBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    const photoAmount = amountInput.value;
    for (let i=0; i<photoAmount; i++){
        const randomPhotoUrl = Math.floor(Math.random()*photoUrl.length);
        const img = document.createElement("img")
        img.src = photoUrl[randomPhotoUrl];     
        photoDisplay.appendChild(img);
    }
    savePhotosToLocalStorage();
    amountInput.value = "";
    nextSteps.classList.remove("dont-show");
});


addPhotoBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    nextSteps.classList.add("dont-show");
    photoGenerating.classList.add("dont-show");
    addingProcess.classList.remove("dont-show");
});

addBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    
    const urlInput = document.getElementById("image-url");
    const imgUrl = urlInput.value;

    if (imgUrl.match(/\.(jpeg|jpg|png|webp|gif)$/i) || true){
        const newImg = document.createElement("img");
        newImg.src = imgUrl;
        photoDisplay.appendChild(newImg);

        savePhotosToLocalStorage();

        nextSteps.classList.remove("dont-show");
        photoGenerating.classList.remove("dont-show");
        addingProcess.classList.add("dont-show");
    }
})


deletePhotoBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    nextSteps.classList.add("dont-show");
    photoGenerating.classList.add("dont-show");
    deletingProcess.classList.remove("dont-show");
})

deleteBtn.addEventListener("click", (event) =>{
    event.preventDefault();

    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos"));
    const inputValue = parseInt(document.getElementById("photo-order").value);

    if (inputValue > 0 && inputValue <= savedPhotos.length){
        savedPhotos.splice(inputValue - 1, 1);

        localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));

        photoDisplay.innerHTML = "";
        savedPhotos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo;
            photoDisplay.appendChild(img);
        });
    } else {
        alert("Invalid photo index.");
    }
    
    nextSteps.classList.remove("dont-show");
    photoGenerating.classList.remove("dont-show");
    deletingProcess.classList.add("dont-show");
})


changePhotoBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    nextSteps.classList.add("dont-show");
    photoGenerating.classList.add("dont-show");
    changingProcess.classList.remove("dont-show");
})

changeBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    
    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos"));
    const inputValue = parseInt(document.getElementById("photo-change").value);
    const urlValue = document.getElementById("image-url-tochange").value;

    if (inputValue > 0 && inputValue <= savedPhotos.length && urlValue.match(/\.(jpeg|jpg|png|webp|gif)$/i)){
        savedPhotos[inputValue-1] = urlValue;

        localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));

        photoDisplay.innerHTML = "";
        savedPhotos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo;
            photoDisplay.appendChild(img);
        });
    } else {
        alert("Invalid photo index.");
    }

    nextSteps.classList.remove("dont-show");
    photoGenerating.classList.remove("dont-show");
    changingProcess.classList.add("dont-show");
})


changePhotoSizeBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    nextSteps.classList.add("dont-show");
    photoGenerating.classList.add("dont-show");
    changingSizeProcess.classList.remove("dont-show");
});

changeSizeBtn.addEventListener("click", (event)=>{
    event.preventDefault();

    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos"));
    const inputValue = parseInt(document.getElementById("photo-size-change").value);
    const widthValue = parseInt(document.getElementById("width-tochangeto").value);
    const heightValue = parseInt(document.getElementById("height-tochange-to").value);

    if (inputValue > 0 && inputValue <= savedPhotos.length && widthValue > 0 && heightValue > 0){
        photoDisplay.innerHTML = "";
        savedPhotos.forEach((photo, index) => {
            const img = document.createElement("img");
            img.src = photo;

            if (index === inputValue - 1) {
                img.style.width = widthValue + "px";
                img.style.height = heightValue + "px";
                img.style.maxHeight = "none";
            }

            photoDisplay.appendChild(img); 
        });
    } else {
        alert("Invalid input. Please check the photo number and size values.");
    }

    nextSteps.classList.remove("dont-show");
    photoGenerating.classList.remove("dont-show");
    changingSizeProcess.classList.add("dont-show");
});


function savePhotosToLocalStorage(){
    const photos = Array.from(photoDisplay.getElementsByTagName("img")).map(img => img.src);
    localStorage.setItem("savedPhotos", JSON.stringify(photos));
}

window.addEventListener("DOMContentLoaded", () => {
    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos"));
    if (savedPhotos && savedPhotos.length > 0) {
        savedPhotos.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            photoDisplay.appendChild(img);
        });
        nextSteps.classList.remove("dont-show");
    }
});
