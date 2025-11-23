const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// ทำให้กระดานเต็มหน้าจอเสมอ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ตัวอักษรที่จะให้ตกลงมา (ภาษาญี่ปุ่น + ตัวเลข + อังกฤษ)
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

// ขนาดตัวอักษร
const fontSize = 16;
// คำนวณว่าต้องมีกี่แถว (ความกว้างหน้าจอ / ขนาดตัวอักษร)
const columns = canvas.width / fontSize;

// อาเรย์เก็บตำแหน่ง Y ของแต่ละแถว (เริ่มต้นที่ 0 หมด)
const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// ฟังก์ชันวาดภาพ
function draw() {
    // 1. เทสีดำจางๆ (Opacity 0.05) ทับภาพเก่า
    // นี่คือเคล็ดลับที่ทำให้เกิด "หาง" จางๆ ตามหลังตัวอักษร
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. ตั้งค่าสีตัวอักษรเป็นสีเขียว
    ctx.fillStyle = '#0F0'; 
    ctx.font = fontSize + 'px monospace';

    // 3. วนลูปวาดตัวอักษรในแต่ละคอลัมน์
    for(let i = 0; i < drops.length; i++) {
        
        // สุ่มตัวอักษร 1 ตัว
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // วาดตัวอักษรลงบนจอ
        // x = i * fontSize (ตำแหน่งแนวนอน)
        // y = drops[i] * fontSize (ตำแหน่งแนวตั้ง)
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // 4. สั่งให้ตัวอักษรเลื่อนลงมา
        // ถ้าตกเลยขอบจอแล้ว (canvas.height) ให้สุ่มโอกาสรีเซ็ตกลับไปข้างบน
        // Math.random() > 0.975 คือทำให้แต่ละแถวตกไม่พร้อมกัน ดูเป็นธรรมชาติ
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
            drops[i] = 0;
        }

        // เพิ่มตำแหน่ง Y ทีละ 1 ช่อง
        drops[i]++;
    }
}

// เรียกฟังก์ชัน draw ซ้ำๆ ทุก 30 มิลลิวินาที
setInterval(draw, 30);