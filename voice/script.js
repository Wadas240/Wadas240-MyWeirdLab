const synth = window.speechSynthesis;
const textInput = document.getElementById('textInput');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const speakBtn = document.getElementById('speakBtn');

// ตัวแปรสำหรับแสดงค่าตัวเลขข้างๆ ตัวเลื่อน
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

// อัปเดตตัวเลขเมื่อเลื่อน Slider
rateInput.oninput = () => rateValue.innerText = rateInput.value;
pitchInput.oninput = () => pitchValue.innerText = pitchInput.value;

// ฟังก์ชันพูด
function speak() {
    // ถ้ากำลังพูดอยู่ ให้หยุดก่อน (กดรัวๆ จะได้ไม่ตีกัน)
    if (synth.speaking) {
        console.error('ใจเย็นๆ กำลังพูดอยู่...');
        synth.cancel(); 
    }

    if (textInput.value !== '') {
        // สร้างเสียงพูดจากข้อความ
        const utterThis = new SpeechSynthesisUtterance(textInput.value);

        // ตั้งค่าเสียง
        utterThis.rate = rateInput.value; // ความเร็ว
        utterThis.pitch = pitchInput.value; // ความสูงต่ำ (0-2)
        
        // เลือกภาษา (พยายามหาภาษาไทย)
        // หมายเหตุ: คอมบางเครื่องอาจต้องตั้งค่าเสียงใน Windows/Mac เพิ่มเติมถ้าไม่มีเสียงไทย
        utterThis.lang = 'th-TH'; 

        // สั่งให้พูด
        synth.speak(utterThis);

        // ลูกเล่นเปลี่ยนพื้นหลังตอนพูด
        document.body.style.backgroundColor = '#050';
        utterThis.onend = () => {
            document.body.style.backgroundColor = '#000';
        }
    }
}

speakBtn.addEventListener('click', speak);