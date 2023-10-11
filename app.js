// --------------- Viewport --------------
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

function updateViewportSize() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
}

window.addEventListener('resize', updateViewportSize);


// --------------- Header js code --------------

const menuOpenButton = document.querySelector('.header__menu-mobile-button')


window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const headerDesktop = document.querySelector('.header__desctop');
    const headerMobile = document.querySelector('.header__mobile');
    
    if (window.scrollY > 10) { 
      // Change styles to create "shrink" effect
      headerDesktop.classList.add('shrink');
      headerMobile.classList.add('shrink');
      menuOpenButton.classList.add('downed')
    } else {
        headerDesktop.classList.remove('shrink');
        headerMobile.classList.remove('shrink');
        menuOpenButton.classList.remove('downed')
    };
});

// --- code for mobile header

const menuMobile = document.querySelector('.header__menu-mobile');
const mobileItems = document.querySelectorAll('.meny-item-mobile');
const mobileLines = document.querySelectorAll('.mobile-menu-line');



menuOpenButton.addEventListener('click', () => {
    // This will toggle the 'shrink' class on the menuMobile element
    menuMobile.classList.toggle('shrink');
    
    // Check if it now has the class 'shrink'
    if(menuMobile.classList.contains('shrink')) {
        menuOpenButton.classList.add('shrink')
        mobileLines.forEach((element) => {
            element.classList.add('shrink');
        });
        mobileItems.forEach((element) => {
            element.classList.add('shrink');
        });
    } else {
        menuOpenButton.classList.remove('shrink')
        mobileLines.forEach((element) => {
            element.classList.remove('shrink');
        });
        mobileItems.forEach((element) => {
            element.classList.remove('shrink');
        });
    }
});

mobileItems.forEach((element) => {
    element.addEventListener('click', () =>{
        menuMobile.classList.remove('shrink');
        menuOpenButton.classList.remove('shrink')
        mobileLines.forEach((element) => {
            element.classList.remove('shrink');
        });
        mobileItems.forEach((element) => {
            element.classList.remove('shrink');
        });
    })
})


// --------------- Modal js code --------------

const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]');
// const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModalWindow(modal)
    })
})

openModal.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModalWindow(modal);
    });
});

closeModal.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModalWindow(modal);
    });
});

function openModalWindow(modal){
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
    menuMobile.classList.remove('shrink');
        menuOpenButton.classList.remove('shrink');
        mobileLines.forEach((element) => {
            element.classList.remove('shrink');
        });
        mobileItems.forEach((element) => {
            element.classList.remove('shrink');
        });
    body.style.overflow = 'hidden'
}
function closeModalWindow(modal){
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = 'auto';
}

// --------------- Main block js code --------------

const shieldImage = document.getElementById('shield-img');
const cardImage = document.getElementById('card-img')
const firsBlockArea = document.querySelector('.main-block')
const backPointGradient = document.querySelectorAll('.main-block__gradient')
const mainblockButton = document.querySelector('.main-block__button')

// --- appereance animation
setTimeout(function() {
    setTimeout(function() {
        cardImage.classList.add('animate-in');
    }, 400);
    setTimeout(function() {
        shieldImage.classList.add('animate-in');
    }, 800); 
}, 0);

// --- for images
function handleMouseMove(event) {
    let rect = firsBlockArea.getBoundingClientRect();
    let offsetX = (event.clientX - rect.right) / 50;
    let offsetY = (event.clientY - (rect.top + rect.height / 2)) / 50;
    shieldImage.style.transform = `translate(${offsetX/ 0.3}px, ${offsetY/ 0.3}px)`;
    cardImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// Check the window width when the page loads
if (window.innerWidth > 900) {
    firsBlockArea.addEventListener('mousemove', handleMouseMove);
}

// check when the window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        firsBlockArea.addEventListener('mousemove', handleMouseMove);
    } else {
        firsBlockArea.removeEventListener('mousemove', handleMouseMove);
    }
});

// for background gradients 
mainblockButton.addEventListener('mouseover', () => {
    backPointGradient.forEach(gradient => {
        gradient.classList.add('scaled');
    });
});

mainblockButton.addEventListener('mouseout', () => {
    backPointGradient.forEach(gradient => {
        gradient.classList.remove('scaled');
    });
});


// --- first block button
const mainBlockButton = document.querySelector('.main-block__button');
const rectElement = mainBlockButton ? mainBlockButton.querySelector('svg #animatedButton') : null;
if (rectElement) {
    mainBlockButton.addEventListener('mouseenter', function() {
        rectElement.style.transition = 'opacity 0.3s ease';
        rectElement.style.opacity = '0.9';
    });

    mainBlockButton.addEventListener('mouseleave', function() {
        rectElement.style.opacity = '1';
    });
} else {
    console.error('Unable to find the rect element.');
}



// --------------- Third block js code --------------
const thirdBlock = document.querySelector('.third-block');
const thirdBlockArea = document.querySelector('.third-block__area');

// Initial gradient
thirdBlockArea.style.backgroundImage = 'linear-gradient(to right, #673091 0%, #EC008C 60%)';
const thirdBlockCursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    let rect = thirdBlock.getBoundingClientRect();
    thirdBlockCursor.x = event.clientX - rect.left;
    thirdBlockCursor.y = event.clientY - rect.top;

    let percentOfX = (thirdBlockCursor.x / rect.width) * 100;

    percentOfX = percentOfX / 6;

    thirdBlockArea.style.backgroundImage = `linear-gradient(to right, #673091 ${percentOfX}%, #EC008C ${(percentOfX + 50) > 100 ? 100 : (percentOfX + 50)}%)`;
});

const checkmarks = document.querySelectorAll(".third-block__ckeckbox");

function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const checkmark = entry.target.querySelector('.checkmark');
            if (checkmark) {
                checkmark.classList.add('animated');
                observer.unobserve(entry.target);
            }
        }
    });
}

const options = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-140px'
};

const observer = new IntersectionObserver(handleIntersect, options);

checkmarks.forEach(container => {
    observer.observe(container);
});



document.addEventListener("scroll", function() {
    // Calculate when the .third-block is visible
    let blockPosition = document.querySelector('.mobile-img').getBoundingClientRect();
    
    if(blockPosition.top < window.innerHeight && blockPosition.bottom >= 10) {
      animateElements();
    }
  });
  
  function animateElements() {
    // Animate mobile-img
    document.querySelector('.mobile-img').classList.add('showen');
  
    // Animate red and blue charts
    document.querySelector('.red-chart').style.transform = "scale(1)";
    document.querySelector('.blue-chart').style.transform = "scale(1)";
    
    // Animate graph-line
    document.querySelector('.red-chart .chart-line').classList.add('animated-line')
  }




// --------------- Forth block js code --------------

function isElementInViewport(el, offset = 0) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset
    );
}

document.addEventListener('scroll', function() {
    const blocks = document.querySelectorAll('.forth-block__info');

    blocks.forEach(block => {
        const blockHeight = block.clientHeight;
        const offset = -(0.7 * blockHeight); 
        
        if (!block.animationTriggered && isElementInViewport(block, offset)) {
            block.animationTriggered = true;

            const subtitle = block.querySelector('.forth-block__subtitle');
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateX(0)';
            
            setTimeout(function() {
                const text = block.querySelector('.forth-block__text');
                text.style.opacity = '1';
                text.style.transform = 'translateX(0)';
                
                setTimeout(function() {
                    const line = block.querySelector('.forth-block__line');
                    line.style.width = '100%';
                    
                    setTimeout(function() {
                        line.style.backgroundColor = '#D0D0D0';
                    }, 500); 
                }, 200);
            }, 200);
        }
    });
});