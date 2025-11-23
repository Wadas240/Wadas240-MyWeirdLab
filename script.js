function warpRandom() {
    // รายชื่อลิงก์ที่เรามี
    const links = [
        "clicker/index.html",
        "dino/index.html",
        "switch/index.html",
        "eyes/index.html"
    ];

    // สุ่มตัวเลข 0 ถึง 3
    const randomIndex = Math.floor(Math.random() * links.length);
    
    // สั่งให้หน้าเว็บเปลี่ยนไปที่ลิงก์นั้น
    window.location.href = links[randomIndex];
}