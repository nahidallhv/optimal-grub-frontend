// Sayfa yüklendiğinde event listener ekleyin
document.addEventListener("DOMContentLoaded", function() {
    // Qeydiyyatdan Keç butonunu seçin
    const registerButton = document.querySelector('.nav-button');
    const courseDetailsButton = document.querySelector('.details-btn');

    // Qeydiyyatdan Keç butonuna tıklandığında
    registerButton.addEventListener('click', function() {
        // Kayıt formuna git
        document.querySelector('.registration').scrollIntoView({ behavior: 'smooth' });
    });

    // Ətraflı butonuna tıklandığında
    courseDetailsButton.addEventListener('click', function() {
        // Kurs Haqqında bölümüne git
        document.querySelector('.course-about').scrollIntoView({ behavior: 'smooth' });
    });
});


// Tüm gizli elementleri seç
const hiddenElements = document.querySelectorAll('.hidden');

// Intersection Observer ayarları
const observerOptions = {
    threshold: 0.5 // Elementin %50'si görünür olduğunda animasyonu tetikler
};

// Observer callback fonksiyonu
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Bir kere gösterildikten sonra gözlemlemeyi bırak
        }
    });
};

// Observer'ı başlat
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Her gizli element için observer'ı başlat
hiddenElements.forEach(element => {
    observer.observe(element);
});



const form = document.querySelector('.registration-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        whatsapp: formData.get('whatsapp')
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Xəta baş verdi. Yenidən cəhd edin.');
    }
    form.reset();
});
