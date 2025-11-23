const ghostSwitch = document.getElementById('ghostSwitch');
const complaint = document.getElementById('complaint');
const body = document.body;

// รายการคำบ่น (เพิ่มได้ตามใจชอบ)
const sentences = [
    "บอกว่าอย่าเปิดไง!",
    "ปิดเดี๋ยวนี้!",
    "จะนอนโว้ยยย",
    "มืดๆ สิชอบ",
    "เอ๊ะ! ฟังไม่รู้เรื่องเหรอ?",
    "มือบอนจริงๆ",
    "ไปเล่นที่อื่นไป๊!",
    "..."
];

ghostSwitch.addEventListener('change', function() {
    // ถ้ามีการกดเปิด (checked เป็น true)
    if (this.checked) {
        
        // 1. สุ่มคำด่าออกมาโชว์
        const randomText = sentences[Math.floor(Math.random() * sentences.length)];
        complaint.innerText = randomText;

        // 2. เปลี่ยนสีพื้นหลังแบบสุ่มให้แสบตาเล่น
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        body.style.backgroundColor = randomColor;

        // 3. รอ 0.4 วินาที แล้วสั่งปิดเองทันที! (กวนไหมล่ะ)
        setTimeout(() => {
            this.checked = false; // สั่งปิดสวิตช์
            body.style.backgroundColor = "#222"; // กลับมามืดเหมือนเดิม
        }, 400);
    }
});