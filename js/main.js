const slider = document.querySelector(".voice_slider");
const items = document.querySelectorAll(".voice_item");
const dots = document.querySelectorAll(".voice_dot");

let currentIndex = 1;


/* =========================
   指定したカードを中央にする
========================= */

function showSlide(index, smooth = true) {

    currentIndex = index;

    const item = items[index];

    const left =
        item.offsetLeft
        - (slider.clientWidth - item.clientWidth) / 2;

    slider.scrollTo({
        left: left,
        behavior: smooth ? "smooth" : "auto"
    });


    /* ドットを切り替える */

    dots.forEach((dot) => {
        dot.classList.remove("is-active");
    });

    dots[index].classList.add("is-active");
}


/* =========================
   ドットをクリック
========================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showSlide(index);
    });

});


/* =========================
   スワイプしたとき
   一番中央に近いカードを探す
========================= */

slider.addEventListener("scroll", () => {

    const sliderCenter =
        slider.scrollLeft + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;


    items.forEach((item, index) => {

        const itemCenter =
            item.offsetLeft + item.clientWidth / 2;

        const distance =
            Math.abs(sliderCenter - itemCenter);


        if (distance < closestDistance) {

            closestDistance = distance;
            closestIndex = index;

        }

    });


    currentIndex = closestIndex;


    /* ドットを切り替える */

    dots.forEach((dot) => {
        dot.classList.remove("is-active");
    });

    dots[currentIndex].classList.add("is-active");

});


/* =========================
   最初は2枚目を表示
========================= */

window.addEventListener("load", () => {

    showSlide(1, false);

});


// フェードアップ

const fadeItems = document.querySelectorAll(".fade-up, .fade-feature, .fade-in, .fade-feature-bg, .fade-voice");

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-show");
        }
    });
});

fadeItems.forEach((item) => {
    fadeObserver.observe(item);
});