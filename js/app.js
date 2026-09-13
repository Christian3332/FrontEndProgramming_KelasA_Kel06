import{unlockLevel, cekLevel, tampilScreenAwal} from "./ui.js";
import { dataSoal } from "./data.js";
import { initDragAndDrop } from "./dragDrop.js";
import {nyawa, score} from "./logic.js";

let hidup = 3;
let bener = 0;
let levels = 0;
let skor = 0;

const tombolLevel = document.querySelectorAll(".level-btn");
const tombolLevel1 = document.getElementById("level1");
const tombol2 = document.getElementById("level2");
const tombol3 = document.getElementById("level3");
const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.3;

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
    levels = levelSekarang;
    layarAwal.style.display = "none";
    layarGame.style.display = "block";
    bgMusic.play().catch((err) => console.log("Audio tertahan browser:", err));

    let datas = dataSoal[levelSekarang];
    const judulLevel = document.getElementById("level-title");
    const papanLevel = document.getElementById("level");
    papanLevel.className = "";
    papanLevel.classList.add("level-" + (levelSekarang + 1));
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
        const label = document.createElement("span");
        label.classList.add("target-label");
        label.textContent = "?"; // Teks petunjuk yang akan muncul di kotak kosong
        drop.appendChild(label);
        simpanJawab.push(q.expectedAnswer);
        card.appendChild(teks);
        card.appendChild(drop);
        soalnya.appendChild(card)
        
    });

    let jawabLevel = acakJawaban(simpanJawab);
    jawabLevel.forEach((e, index) => {
        const draged = document.createElement("div");
        draged.classList.add("draggable-item", "card");
        draged.setAttribute("draggable", "true");
        draged.id = "ans-" + index;
        draged.textContent = e;
        jawabannya.appendChild(draged);
    });

}

function mains(draggedElement, dropZone) {
  const jawaban = dropZone.dataset.answer;
  const dipilih = draggedElement.textContent;
  if (dipilih === jawaban) {
    dropZone.classList.add("correct");
    const hapusLabel = dropZone.querySelector(".target-label");
    if (hapusLabel) hapusLabel.remove();
    dropZone.appendChild(draggedElement);
    bener ++;
    if (bener <= 4){
        const papanskor = document.getElementById("score-display");
        skor = score(skor);
        papanskor.innerText = "skor : " + skor;
    }
    if(bener === 5){
        if (levels + 1 < dataSoal.length) {
            dataSoal[levels + 1].status = true;
        }
        skor = 0;
        unlockLevel(dataSoal, tombolLevel);
        tampilScreenAwal();
    }
  } 
  if (dipilih != jawaban){
    dropZone.classList.add("wrong");
    hidup --;
    if(hidup <= 0){
        bener = 0;
        hidup = 3;
        tampilScreenAwal();
    }
    nyawa(hidup);
  }
}

tombolLevel1.addEventListener('click', () =>{
    bener = 0;
    hidup = 3;
    skor = 0;
    nyawa(hidup);
    const papanskorsss = document.getElementById("score-display");
    papanskorsss.innerHTML = "";
    tampilLevel(0);
    initDragAndDrop(mains);
});

tombol2.addEventListener('click', () =>{
    hidup = 3;
    bener = 0;
    skor = 0;
    const papanskors = document.getElementById("score-display");
    papanskors.innerHTML = "";
    nyawa(hidup);
    tampilLevel(1);
    initDragAndDrop(mains);
});

tombol3.addEventListener('click', () =>{
    hidup = 3;
    bener = 0;
    skor = 0;
    const papanskorss = document.getElementById("score-display");
    papanskorss.innerHTML = "";
    nyawa(hidup);
    tampilLevel(2);
    initDragAndDrop(mains);
});
