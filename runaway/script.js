const btn = document.getElementById('runBtn');

// ฟังเหตุการณ์ 'mouseover' (เมื่อเมาส์ชี้โดนปุ่ม)
btn.addEventListener('mouseover', function() {
    
    // 1. หาความกว้าง/สูง ของหน้าจอ
    // ลบออกนิดหน่อยเพื่อให้ปุ่มไม่หลุดขอบจอจนกดไม่ได้
    const maxWidth = window.innerWidth - 200; 
    const maxHeight = window.innerHeight - 100;

    // 2. สุ่มตำแหน่งใหม่ (Random)
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    // 3. สั่งย้ายปุ่มไปที่ตำแหน่งใหม่
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    // เปลี่ยนสีปุ่มแกล้งๆ ให้ดูตื่นเต้น
    const colors = ["#ff5252", "#e040fb", "#448aff", "#00c853"];
    btn.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});

// เผื่อฟลุ๊คกดโดน (เช่น ใช้ Tab)
btn.addEventListener('click', function() {
    alert("เฮ้ย! กดโดนได้ไง!? เอาไปเลย 10 บาท");
});