// 헤더 mouseover시 카테고리가 드롭 다운함
const menuTags = document.querySelectorAll(".toggle-menu"); 
const aside = document.querySelector("aside");
const overlay = document.querySelector(".overlay");
let timeoutId;
// 드롭 다운 실행
function openAside(content) {
    aside.innerHTML = `<p>${content}</p>`;
    aside.classList.add("open");
    overlay.classList.add("active");
    clearTimeout(timeoutId); 
}
// 드롭 다운 끄기
function closeAside() {
    aside.classList.remove("open");
    overlay.classList.remove("active");
}
// 메뉴에 마우스 오버했을 때
menuTags.forEach((link) => {
    link.addEventListener("mouseover", function () {
        const content = link.getAttribute("data-content");
        openAside(content);
    });

    link.addEventListener("mouseout", function () {
        timeoutId = setTimeout(() => {
            if (!aside.matches(':hover')) {
                closeAside();
            }
        }, 100);
    });
});
// aside에서 마우스 오버 메뉴 유지
aside.addEventListener("mouseover", function () {
    clearTimeout(timeoutId);
    aside.classList.add("open");
    overlay.classList.add("active");
});
aside.addEventListener("mouseout", function () {
    timeoutId = setTimeout(() => {
        closeAside();
    }, 100);
});

overlay.addEventListener("click", closeAside);





// 메인 이미지 요소 가져오기
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

function initializeThumbnails() {
  thumbnails.forEach((img, index) => {
    if (index === 0) {
      img.classList.add('selected'); 
    } else {
      img.classList.add('unselected');
    }
  });
}
// 썸네일 클릭
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {

    const newMainImage = thumbnail.getAttribute('data-main');
    mainImage.src = newMainImage;

    thumbnails.forEach(img => {
      img.classList.remove('selected');
      img.classList.add('unselected');
    });

    thumbnail.classList.remove('unselected');
    thumbnail.classList.add('selected');
  });
});

initializeThumbnails();

//썸네일 변경
const sizeLinks = document.querySelectorAll('.size-link');

const thumbnailImages = document.querySelectorAll('.thumbnail');

sizeLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const selectedSize = link.getAttribute('data-size');
    sizeLinks.forEach(sizeLink => sizeLink.classList.remove('active'));
    link.classList.add('active');

    if (selectedSize === '100ml') {
      mainImage.src = 'img/100ml.jpeg';

      thumbnailImages[0].src = 'img/100ml.jpeg';
      thumbnailImages[0].setAttribute('data-main', 'img/100ml.jpeg');

      thumbnailImages[1].src = 'img/package100ml.jpg';
      thumbnailImages[1].setAttribute('data-main', 'img/package100ml.jpg');
    } else if (selectedSize === '30ml') {
      mainImage.src = 'img/30ml.jpeg';

      thumbnailImages[0].src = 'img/30ml.jpeg';
      thumbnailImages[0].setAttribute('data-main', 'img/30ml.jpeg');

      thumbnailImages[1].src = 'img/package.jpg';
      thumbnailImages[1].setAttribute('data-main', 'img/package.jpg');
    }

    initializeThumbnails();
  });
});





// MOOD 섹션 감지 및 애니메이션 적용
const moodSection = document.querySelector('.mood');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                moodSection.classList.add('active');
            } else {
                moodSection.classList.remove('active');
            }
        });
    },
    { threshold: 0.6 } // 섹션이 50% 보일 때 트리거
);

observer.observe(moodSection);







const informationLinks = document.querySelectorAll('.imformation-text a');

const sectionMapping = {
  "SCENT": ".sent",
  "MOOD": ".mood",
  "GOOD TO KNOW": ".know",
  "HOW TO USE": ".howTo" 
};

const sections = Object.values(sectionMapping).map(selector => document.querySelector(selector));

informationLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); 

    
    informationLinks.forEach(item => {
      item.style.fontWeight = "400"; 
      item.style.textDecoration = "none"; 
    });

    link.style.fontWeight = "bold";
    link.style.textDecoration = "underline";

    const targetText = link.textContent.trim(); 
    const targetSection = document.querySelector(sectionMapping[targetText]);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 144, 
        behavior: "smooth"
      });
    }
  });
});

// Function to update the active link based on the visible section
const updateActiveLink = () => {
  const offset = 200; // Offset to account for headers or margins
  const scrollPosition = window.scrollY + offset;

  let activeSection = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + rect.height;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      activeSection = section;
    }
  });

  if (activeSection) {
    const activeLinkText = Object.keys(sectionMapping).find(
      key => document.querySelector(sectionMapping[key]) === activeSection
    );

    informationLinks.forEach(link => {
      if (link.textContent.trim() === activeLinkText) {
        link.style.fontWeight = "bold";
        link.style.textDecoration = "underline";
      } else {
        link.style.fontWeight = "500";
        link.style.textDecoration = "none";
      }
    });
  }
};

// Listen to scroll events to update the active link
window.addEventListener("scroll", updateActiveLink);









// Get the modal, link, and close button
const modal = document.getElementById("engraving-modal");
const engravingLink = document.querySelector(".engraving a");
const closeButton = document.querySelector(".close-button");

// Open modal on link click
engravingLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex"; // Show modal
});

// Close modal when clicking the close button
closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
