// ดึงตัวละครจากหน้าเว็บมาเก็บไว้ในตัวแปร
const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('clickBtn');
const message = document.getElementById('message');

let score = 0; // ตัวแปรเก็บคะแนนเริ่มต้น

// สั่งให้ทำอะไรเมื่อ "คลิก"
clickBtn.addEventListener('click', function() {
    score = score + 1; // เพิ่มคะแนนทีละ 1
    scoreDisplay.innerText = score; // อัปเดตตัวเลขบนหน้าจอ

    // ลูกเล่นเพิ่มเติม: ถ้าคะแนนถึงกำหนด ให้ชมผู้เล่น
    if (score === 10) {
        message.innerText = "ว้าว! นิ้วไวมาก 🔥";
        clickBtn.style.backgroundColor = "#f1c40f"; // เปลี่ยนสีปุ่ม
        clickBtn.style.color = "black";
    } else if (score === 20) {
        message.innerText = "สุดยอด! เทพแห่งการกด 🚀";
        clickBtn.style.backgroundColor = "#2ecc71";
    }
});