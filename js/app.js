import{unlockLevel, cekLevel} from "./ui.js";
import { dataSoal } from "./data.js";
import { initDragAndDrop } from "./dragDrop.js";

let main = false;
const tombolLevel = document.querySelectorAll(".level-btn");
const mulai = document.getElementById("level1");
unlockLevel(dataSoal, tombolLevel);

function acakLevel(levelIndex) {
  return dataSoal[levelIndex].questions
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
}
function acakJawaban(jawab){
    return jawab.sort(() => Math.random() - 0.5).slice(0,5)
}

function tampilLevel(levelSekarang){
    const layarAwal = document.getElementById("level-select-screen");
    const layarGame = document.getElementById("game-screen");
    layarAwal.style.display = "none";
    layarGame.style.display = "block";

    const datas = dataSoal[levelSekarang];
    const judulLevel = document.getElementById("level-title");
    const soalnya = document.getElementById("questions-section");
    const jawabannya = document.getElementById("answers-section");
    let soalLevel = acakLevel(levelSekarang);
    judulLevel.textContent = datas.title;

    soalnya.innerHTML = "";
    jawabannya.innerHTML = "";


    let simpanJawab = [];
    soalLevel.forEach(q =>{
        const card = document.createElement("div");
        card.classList.add("question-card", "card");

        const teks = document.createElement("div");
        teks.classList.add("question-text");
        teks.textContent = q.text;

        const drop = document.createElement("div");
        drop.classList.add("drop-zone");
        drop.dataset.answer = q.expectedAnswer;
        simpanJawab.push(q.expectedAnswer);
        card.appendChild(teks);
        card.appendChild(drop);
        soalnya.appendChild(card)
        
    });

    let jawabLevel = acakJawaban(simpanJawab);
    jawabLevel.forEach(e => {
        const draged = document.createElement("div");
        draged.classList.add("draggable-item", "card");
        draged.setAttribute("draggable", "true");
        draged.textContent = e;
        jawabannya.appendChild(draged);
    });


}

