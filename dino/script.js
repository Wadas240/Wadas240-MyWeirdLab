const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreSpan = document.getElementById("scoreSpan");
const statusSpan = document.getElementById("statusSpan");

let score = 0;
let isAlive = true;

// ฟังก์ชันกระโดด
function jump() {
    // ถ้ากำลังกระโดดอยู่ ไม่ต้องกระโดดซ้ำ
    if (dino.classList.contains("animate-jump")) { return; }

    // ใส่คลาส animate-jump เพื่อให้ CSS ทำงาน
    dino.classList.add("animate-jump");

    // ลบคลาสออกเมื่อผ่านไป 500ms (0.5 วินาที) เพื่อให้กระโดดใหม่ได้
    setTimeout(function() {
        dino.classList.remove("animate-jump");
    }, 500);
}

// เช็คทุกๆ 10 มิลลิวินาที ว่าชนหรือยัง
let checkDead = setInterval(function() {
    if (!isAlive) return; // ถ้าตายแล้วไม่ต้องเช็ค

    // ดึงตำแหน่งปัจจุบันของ Dino (แกน Y - แนวตั้ง)
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    // ดึงตำแหน่งปัจจุบันของ Cactus (แกน X - แนวนอน)
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // เงื่อนไขการชน: 
    // 1. กระบองเพชรมาถึงตัวเรา (ระหว่าง 0 ถึง 50px)
    // 2. เราไม่ได้กระโดดสูงพอ (dinoTop > 140 แปลว่าอยู่ใกล้พื้น)
    // หมายเหตุ: ค่า top ยิ่งมาก ยิ่งอยู่ต่ำ (พื้นคือ top: 150px โดยประมาณ)
    
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        // ชนแล้ว!
        isAlive = false;
        cactus.style.animation = "none"; // หยุดกระบองเพชร
        cactus.style.display = "none";
        statusSpan.innerText = "เกมโอเวอร์! 💀 (กด F5 เพื่อเริ่มใหม่)";
        statusSpan.style.color = "red";
        alert("แพ้แล้วจ้า! คะแนน: " + Math.floor(score / 100));
    } else {
        // ถ้ายังไม่ชน ให้คะแนนเพิ่ม
        score++;
        scoreSpan.innerText = Math.floor(score / 100);
    }

}, 10);

// รอฟังเสียงกดปุ่ม Spacebar หรือ คลิกเมาส์
document.body.onkeydown = function(e) {
    if (e.code === "Space" && isAlive) {
        jump();
    }
}

document.body.onclick = function() {
    if (isAlive) jump();
}