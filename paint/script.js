const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// เครื่องมือต่างๆ
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

// ตั้งค่า Canvas ให้เต็มจอ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ตัวแปรสถานะ
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0; // ค่าสี (0-360) สำหรับโหมดสีรุ้ง
let isRainbow = true; // เริ่มต้นด้วยโหมดสีรุ้ง
let isEraser = false;

// ตั้งค่าหัวแปรงเริ่มต้น
ctx.lineJoin = 'round'; // มุมโค้งมน
ctx.lineCap = 'round'; // ปลายมน
ctx.lineWidth = 10;

// ฟังก์ชันวาดรูป
function draw(e) {
    if (!isDrawing) return; // ถ้าไม่ได้กดเมาส์ ไม่ต้องทำอะไร

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // เริ่มจากจุดเดิม
    ctx.lineTo(e.offsetX, e.offsetY); // ลากไปหาจุดใหม่
    ctx.stroke(); // สั่งวาดเส้น

    // อัปเดตจุดล่าสุด
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // ถ้าเป็นโหมดสีรุ้ง
    if (isRainbow && !isEraser) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // สี HSL สดใส
        hue++; // เปลี่ยนเฉดสีไปเรื่อยๆ
        if (hue >= 360) hue = 0;
    }
}

// Event Listeners (เมาส์)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// --- ปุ่มเครื่องมือต่างๆ ---

// เปลี่ยนสีตามที่เลือก
colorPicker.addEventListener('change', (e) => {
    isRainbow = false;
    isEraser = false;
    ctx.strokeStyle = e.target.value;
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
});

// โหมดสีรุ้ง
rainbowBtn.addEventListener('click', () => {
    isRainbow = true;
    isEraser = false;
    rainbowBtn.classList.add('active');
    eraserBtn.classList.remove('active');
});

// ยางลบ (จริงๆ คือวาดสีเดียวกับพื้นหลัง)
eraserBtn.addEventListener('click', () => {
    isEraser = true;
    isRainbow = false;
    ctx.strokeStyle = '#111'; // สีเดียวกับ body background
    eraserBtn.classList.add('active');
    rainbowBtn.classList.remove('active');
});

// เปลี่ยนขนาดหัวแปรง
brushSize.addEventListener('change', () => ctx.lineWidth = brushSize.value);
brushSize.addEventListener('mousemove', () => ctx.lineWidth = brushSize.value);

// ล้างหน้าจอ
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// บันทึกรูป (Save)
saveBtn.addEventListener('click', () => {
    // แปลง Canvas เป็นลิงก์รูปภาพ
    const link = document.createElement('a');
    link.download = 'my-art.png';
    link.href = canvas.toDataURL();
    link.click();
});

// แก้บั๊กเวลาเปลี่ยนขนาดจอ
window.addEventListener('resize', () => {
    // หมายเหตุ: การรีไซส์จะทำให้ภาพหาย (เพราะแคนวาสถูกรีเซ็ต)
    // ในโปรแกรมจริงต้องเซฟภาพไว้ก่อนแล้ววาดกลับมา
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize.value;
});