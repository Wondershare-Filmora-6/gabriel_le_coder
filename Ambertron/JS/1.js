//Modified by Frederick Gabrielle Cunanan
let slideIndex1 = 1;
showSlides1(slideIndex1);

function plusSlides1(n) {
    showSlides1(slideIndex1 += n);
}

function currentSlide1(n) {
    showSlides1(slideIndex1 = n);
}

function showSlides1(n) {
    let i;
    let slides = document.getElementsByClassName("page1");
    let dots = document.getElementsByClassName("dot1");
    if (n > slides.length) {
        slideIndex1 = 1
    }  
    
    if (n < 1) {
        slideIndex1 = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex1-1].style.display = "flex";  
    dots[slideIndex1-1].className += " active";
}

let slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
    showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
    showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
    let i;
    let slides = document.getElementsByClassName("page2");
    let dots = document.getElementsByClassName("dot2");
    if (n > slides.length) {
        slideIndex2 = 1
    }  
    
    if (n < 1) {
        slideIndex2 = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex2-1].style.display = "flex";  
    dots[slideIndex2-1].className += " active";
}