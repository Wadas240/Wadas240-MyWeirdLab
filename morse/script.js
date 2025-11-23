const textInput = document.getElementById('textInput');
const morseOutput = document.getElementById('morseOutput');
const translateBtn = document.getElementById('translateBtn');
const playBtn = document.getElementById('playBtn');

// ดิกชันนารีรหัสมอร์ส
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

// ฟังก์ชันแปลภาษา
function translateToMorse() {
    const text = textInput.value.toUpperCase(); // แปลงเป็นตัวพิมพ์ใหญ่ให้หมด
    let result = "";

    for (let char of text) {
        if (morseCode[char]) {
            result += morseCode[char] + " "; // ถ้ามีในดิกชันนารี ให้เอามาต่อกัน
        } else {
            result += "? "; // ถ้าไม่มี (เช่น ก-ฮ) ให้ใส่เครื่องหมาย ?
        }
    }
    
    morseOutput.innerText = result.trim();
}

// แปลทันทีที่พิมพ์
textInput.addEventListener('input', translateToMorse);
translateBtn.addEventListener('click', translateToMorse);

// --- ส่วนทำเสียง (Advanced หน่อยนะครับแต่อย่าเพิ่งงง) ---
playBtn.addEventListener('click', async () => {
    const morse = morseOutput.innerText;
    
    // สร้างเครื่องกำเนิดเสียง (AudioContext)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // วนลูปอ่านทีละตัวอักษร
    for (let char of morse) {
        if (char === '.') {
            playBeep(audioCtx, 0.1); // จุด = เสียงสั้น
            await sleep(200); // รอแป๊บนึง
        } else if (char === '-') {
            playBeep(audioCtx, 0.3); // ขีด = เสียงยาว
            await sleep(400); 
        } else if (char === ' ' || char === '/') {
            await sleep(300); // เว้นวรรค = เงียบ
        }
    }
});

// ฟังก์ชันสร้างเสียงติ๊ด
function playBeep(ctx, duration) {
    const osc = ctx.createOscillator(); // ตัวกำเนิดคลื่นเสียง
    const gain = ctx.createGain(); // ตัวปรับความดัง

    osc.type = 'sine'; // เสียงแบบคลื่นไซน์ (ติ๊ดนุ่มๆ)
    osc.frequency.value = 600; // ความถี่เสียง (สูงต่ำ)

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(); // เริ่มดัง
    
    // สั่งให้หยุดดังเมื่อครบเวลาที่กำหนด
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
}

// ฟังก์ชันช่วยหน่วงเวลา (เพราะ JS ปกติมันไม่รอกัน)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}