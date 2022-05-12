const main = document.getElementById("main");
const loader = document.getElementById("loader");
const breedSelect = document.getElementById("breed");

async function init() {
    // Get breed API
    const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
    const RANDOM_BREED_URL = 'https://dog.ceo/api/breeds/image/random'

    const responses = await Promise.all([fetch(BREEDS_URL), fetch(RANDOM_BREED_URL)])
    
    const breeds = await responses[0].json()
    const randomBreed = await responses[1].json()

    const breedsArray = Object.keys(breeds.message);
    let dropDownOptions = "<option></option>";

    for (let i = 0; i < breedsArray.length; i++) {
        dropDownOptions += `<option value=${breedsArray[i]}>${breedsArray[i]}</option>`;
    }
    breedSelect.innerHTML = dropDownOptions;
    main.src = randomBreed.message;

    breedSelect.addEventListener("change", handleBreedChange);
    main.addEventListener("load", function() {
    main.classList.add("show");
    loader.classList.remove("show");
  });
}

init();


async function handleBreedChange(event) {
  const breed = event.target.value;

  main.classList.remove("show");
  loader.classList.add("show");

  const res = await fetch(` https://dog.ceo/api/breed/${breed}/images/random`);
  const resJson = await res.json();

  main.src = resJson.message;
}

init();

     
