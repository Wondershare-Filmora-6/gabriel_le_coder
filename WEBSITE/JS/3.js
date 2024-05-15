let slideIndex4 = 1;
showSlides4(slideIndex4);

function plusSlides4(n) {
    showSlides4(slideIndex4 += n);
}

function currentSlide4(n) {
    showSlides4(slideIndex4 = n);
}

function showSlides4(n) {
    let i;
    let slides = document.getElementsByClassName("page4");
    let dots = document.getElementsByClassName("dot4");
    if (n > slides.length) {
        slideIndex4 = 1
    }  
    
    if (n < 1) {
        slideIndex4 = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex4-1].style.display = "flex";  
    dots[slideIndex4-1].className += " active";
}