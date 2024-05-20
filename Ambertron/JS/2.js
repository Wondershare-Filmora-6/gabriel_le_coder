let slideIndex3 = 1;
showSlides3(slideIndex3);

function plusSlides3(n) {
    showSlides3(slideIndex3 += n);
}

function currentSlide3(n) {
    showSlides3(slideIndex3 = n);
}

function showSlides3(n) {
    let i;
    let slides = document.getElementsByClassName("page3");
    let dots = document.getElementsByClassName("dot3");
    if (n > slides.length) {
        slideIndex3 = 1
    }  
    
    if (n < 1) {
        slideIndex3 = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex3-1].style.display = "flex";  
    dots[slideIndex3-1].className += " active";
}