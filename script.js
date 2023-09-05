let data = [];
async function fetchData(showAll) {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const json = await res.json();
    data = json.data.tools;
    showCards(json.data.tools, showAll);
}
fetchData()

function showCards(data, showAll) {
    if (!showAll) {
        data = data.slice(0, 6);
    }
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    data.forEach(element => {
        const card = document.createElement("div");
        card.className = "bg-slate-50 shadow-md rounded-2xl p-6";
        card.innerHTML =
            `
            <figure class="">
                <img src="${element.image}"
                    alt="${element.name} image" class="rounded-xl h-52 object-cover" />
            </figure>
            <div>
                <h2 class="mt-6 mb-2 text-2xl font-semibold">Features</h2>
                <ol class="list-decimal list-inside mb-6">
                    <li>${element.features[0]}</li>
                    <li>${element.features[1]}</li>
                    <li>${element.features[2]}</li>
                </ol>
                <hr class="border-slate-300">

                <div class="flex items-end justify-between">
                    <div>
                        <h2 class="mt-6 mb-2 text-2xl font-semibold">${element.name}</h2>
                        <div class="flex gap-2">
                            <svg class="fill-current text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24">
                                <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z">
                                </path>
                                <path
                                    d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z">
                                </path>
                            </svg>
                            <p>${element.published_in}</p>
                        </div>
                    </div>
                    <button id="div-button" class="bg-slate-200 hover:bg-slate-500 p-3 rounded-full" onclick="fetchDetails('${element.id}')">
                        <svg class="fill-current text-slate-500 hover:text-slate-50"
                            xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z">
                            </path>
                        </svg>
                    </button>


                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });

}

// ---------------------------------------------
// IN id="div-button",
// Here fetchDetails function in onclick seem to work 
// But, function added with addEventListener doesn't seem to work
// This error is shown: Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at script.js:76:38
// ---------------------------------------------


document.getElementById("div-button").addEventListener("click", () => {
    console.log("event listener clicked");
})


async function fetchDetails(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const json = await res.json();
    openModal(json.data)
}

function openModal(data) {
    // console.log(data);
    document.getElementById("popupModal").classList.remove("hidden");

    // ---------------------------------------------
    // I've commented out modal for dynamic data
    // ---------------------------------------------

    // const modalBox = document.createElement("div");
    // modalBox.classList = "grid grid-cols-1 lg:grid-cols-2 gap-5";
    // const modalContent = document.getElementById("modalContent");
    // modalContent.innerHTML = "";
    // modalContent.innerHTML =
    //     `
    //     <div class="p-5 md:p-8 rounded-2xl bg-rose-50 border-2 border-rose-500">
    //     <h2 class="font-semibold text-2xl text-slate-800 dark:text-slate-50 mb-6">${data.description}</h2>
    //     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    //         <div class="rounded-2xl bg-white text-center p-5 w-full flex items-center">
    //             <h5 class="font-bold text-green-500">${data.pricing?.[0].price}
    //             ${data.pricing?.[0].plan}</h5>
    //         </div>
    //         <div class="rounded-2xl bg-white text-center p-5 w-full flex items-center">
    //             <h5 class="font-bold text-orange-500">${data.pricing?.[1].price}
    //             ${data.pricing?.[1].plan}</h5>
    //         </div>
    //         <div class="rounded-2xl bg-white text-center p-5 w-full flex items-center">
    //             <h5 class="font-bold text-red-500">${data.pricing?.[2].price}
    //             ${data.pricing?.[2].plan}</h5>
    //         </div>
    //     </div>
    //     <div class="grid  grid-cols-1 md:grid-cols-2 gap-4">
    //         <div>
    //             <h2 class="font-semibold text-2xl text-slate-800 dark:text-slate-50 mt-6 mb-4">Features</h2>
    //             <ul class="list-disc list-inside">
    //                 <li>${data.features[1].feature_name}</li>
    //                 <li>${data.features[2].feature_name}</li>
    //                 <li>${data.features[3].feature_name}</li>
    //             </ul>
    //         </div>
    //         <div>
    //             <h2 class="font-semibold text-2xl text-slate-800 dark:text-slate-50 mt-6 mb-4">Integrations</h2>
    //             <ul class="list-disc list-inside">
    //                 <li>${data.integrations?.[0]}</li>
    //                 <li>${data.integrations?.[1]}</li>
    //                 <li>${data.integrations?.[2]}</li>
    //             </ul>
    //         </div>
    //     </div>
    // </div>

    // <div class="p-5 md:p-8 rounded-2xl border-2 border-slate-300">
    //     <figure class="relative">
    //         <img class="rounded-xl w-full h-64 object-cover"
    //             src="${data.image_link[0]}"
    //             alt="">
    //             <div class="bg-rose-500 text-slate-50 px-4 py-2 rounded-lg absolute top-3 right-3">
    //                 <p class="font-semibold">${data.accuracy?.score * 100}% accuracy</p>
    //             </div>
    //     </figure>
    //     <h2 class="font-semibold text-2xl text-slate-800 dark:text-slate-50 mt-6 mb-4">${data.input_output_examples?.[0].input}</h2>
    //     <p>${data.input_output_examples?.[0].output}</p>
    // </div>
    //     `;

    // modalContent.appendChild(modalBox);

}

function closeModal() {
    document.getElementById("popupModal").classList.add("hidden");
}

function parseDate(date) {
    const dateArray = date.split("/");
    const dateString = dateArray[2] + dateArray[1] + dateArray[0];
    return parseInt(dateString);
}
parseDate("11/1/2022");



const seeMoreBtn = document.getElementById("see-more");
let seeMoreBtnToggler = false;
seeMoreBtn.addEventListener("click", () => {
    seeMoreBtnToggler = !seeMoreBtnToggler;
    if (seeMoreBtnToggler) {
        fetchData(seeMoreBtnToggler);
        seeMoreBtn.innerText = "See Less";
    } else {
        fetchData(seeMoreBtnToggler);
        seeMoreBtn.innerText = "See More";
    }
})
