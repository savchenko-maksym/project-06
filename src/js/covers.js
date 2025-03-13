const marquee = document.querySelector(".marquee");
const activAnim = document.querySelectorAll(".list-item");

async function animationStages() {
    activAnim.forEach(item => {
    item.classList.add("marquee__line");
});
}

async function animationStagesStop() {
    activAnim.forEach(item => {
        item.classList.remove("marquee__line");
    });
}
    
const options = {
    rootMargin: "0px",
    threshold: 0,
};

const observer = new IntersectionObserver((arr) => {
    const entry = arr[0];
    if (entry.isIntersecting) {
        animationStages();
    } else {
        animationStagesStop();
    }
}, options);

observer.observe(marquee);