// ดึงลูกตาดำทั้ง 2 ข้างมาเก็บไว้
const pupils = document.querySelectorAll(".pupil");

// ทุกครั้งที่ขยับเมาส์ (mousemove) ให้ทำฟังก์ชันนี้
document.onmousemove = (event) => {
    
    // ตำแหน่งแกน X และ Y ของเมาส์ (คิดเป็นเปอร์เซ็นต์เทียบกับขนาดหน้าจอ)
    // สูตรนี้ช่วยให้ค่าที่ได้อยู่ระหว่าง 0 ถึง 100%
    const x = (event.clientX * 100) / window.innerWidth + "%";
    const y = (event.clientY * 100) / window.innerHeight + "%";

    // สั่งให้ลูกตาดำทั้ง 2 ข้าง ขยับตามเมาส์
    pupils.forEach((pupil) => {
        pupil.style.left = x;
        pupil.style.top = y;
        
        // เพิ่มความสมูทด้วยการใส่ translate กลับคืนเล็กน้อยเพื่อไม่ให้หลุดขอบ
        pupil.style.transform = `translate(-${x}, -${y})`;
    });
};