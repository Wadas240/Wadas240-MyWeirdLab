// ดึง Element ทั้งหมด
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const excludeSimilarEl = document.getElementById('exclude-similar');
const addHyphensEl = document.getElementById('add-hyphens');

const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// ชุดตัวอักษรทั้งหมด
const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// ปุ่ม Copy
clipboardBtn.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert('คัดลอกเรียบร้อย! 📋');
});

// ปุ่ม Generate
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const excludeSimilar = excludeSimilarEl.checked;
    const useHyphen = addHyphensEl.checked;

    resultEl.innerText = generatePassword(
        length, hasUpper, hasLower, hasNumber, hasSymbol, excludeSimilar, useHyphen
    );
    
    updateStrengthMeter(resultEl.innerText);
});

// ฟังก์ชันหลัก
function generatePassword(length, upper, lower, number, symbol, exclude, hyphen) {
    let generatedPassword = '';
    let allowedChars = ''; // ตะกร้ารวมตัวอักษรที่จะใช้สุ่ม

    // 1. สร้างตะกร้าตัวอักษรตามที่เลือก
    if (upper) allowedChars += chars.upper;
    if (lower) allowedChars += chars.lower;
    if (number) allowedChars += chars.number;
    if (symbol) allowedChars += chars.symbol;

    // 2. ถ้าตะกร้าว่างเปล่า ให้เตือน
    if (allowedChars.length === 0) return 'เลือกสักอย่างสิ!';

    // 3. ถ้าเลือก "ตัดตัวหน้าตาคล้าย"
    if (exclude) {
        // ลบ i, I, l, L, 1, o, O, 0 ออกจากตะกร้า
        allowedChars = allowedChars.replace(/[ilLI|`10oO]/g, '');
    }

    // 4. สุ่มตัวอักษรจากตะกร้า มาต่อกันจนครบความยาว
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        generatedPassword += allowedChars[randomIndex];
    }

    // 5. ถ้าเลือกใส่ขีดคั่น (ใส่ขีดทุกๆ 4 ตัว)
    if (hyphen) {
        // ใช้ Regex แบ่งกลุ่มละ 4 ตัวแล้วคั่นด้วย -
        generatedPassword = generatedPassword.match(/.{1,4}/g).join('-');
    }

    return generatedPassword;
}

// ฟังก์ชันวัดความปลอดภัย (Strength Meter)
function updateStrengthMeter(password) {
    let strength = 0;
    const len = password.length;

    // เกณฑ์การให้คะแนน
    if (len >= 8) strength += 1;
    if (len >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1; // มีตัวใหญ่
    if (/[0-9]/.test(password)) strength += 1; // มีตัวเลข
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // มีสัญลักษณ์

    // แสดงผลสีตามคะแนน (เต็ม 5)
    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#ff4757'; // แดง
        strengthBar.style.width = '30%';
        strengthText.innerText = 'ระดับ: อ่อน (เสี่ยงโดนแฮก)';
    } else if (strength <= 4) {
        strengthBar.style.backgroundColor = '#ffa502'; // ส้ม
        strengthBar.style.width = '70%';
        strengthText.innerText = 'ระดับ: ปานกลาง (พอใช้ได้)';
    } else {
        strengthBar.style.backgroundColor = '#2ed573'; // เขียว
        strengthBar.style.width = '100%';
        strengthText.innerText = 'ระดับ: ปลอดภัยสูง (สุดยอด!)';
    }
}