/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//console.log(performance.now());
const navbar = document.getElementById('navbarList');
const sections = document.querySelectorAll('section');
const scrollUp = document.getElementById('scrollUpButton');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//helper function to get All siblings of the parent's element that had class ('active')
let getSiblings = (e) => {
    let siblings = [];
    let sibling = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};


//removing class active from siblings 
let removeClassActiveFromSiblings = (activeEl) => {
    let siblings = getSiblings(activeEl.parentNode);
    siblings.forEach(sibling => sibling.firstChild.classList.remove('active'));
}
let clickScrollUp = () => {  /*[1]resub : transformed funtion's name to camelCase */
    scrollUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

for (let i = 1; i <= sections.length; i++) {
    const newAnchor = document.createElement('a');
    const anchorText = newAnchor.textContent = 'section' + i;
    newAnchor.setAttribute('data-nav', anchorText);

    // Scroll to section on link click

    newAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetAnchor = e.target;
        const targetedSection = document.getElementById(targetAnchor.dataset.nav);
        targetAnchor.classList.add('active');
        removeClassActiveFromSiblings(targetAnchor);
        // Scroll to anchor ID using scrollTO event
        window.scroll({
            top: targetedSection.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    });
    // Build menu
    const newElement = document.createElement('li');
    //[2]resub : removed unnecessary "data-nav" added to (li) item
    newElement.setAttribute('class', 'menu__link');
    newElement.appendChild(newAnchor);
    navbar.appendChild(newElement);
}


setTimeout(() => {
    // Set sections as active
    window.addEventListener('scroll', () => {
        // Add class 'active' to section when near top of 

        sections.forEach((section) => {
            //getting top and bottom dimensions of section 
            let block = section.getBoundingClientRect();
            if (block.height > 0 && block.bottom < window.innerHeight + 130) {
                const sectionId = section.getAttribute('id');
                const activeAnchor = document.querySelector('a[data-nav="' + sectionId + '"]');
                //adding class ('active') to the navbar item that refer to the section in viewport
                activeAnchor.classList.add('active');
                removeClassActiveFromSiblings(activeAnchor);
                //adding class (active) to the section in viewport
                /*[3]resub:fixed animation by adding class("your-active-class") istead of active class */
                section.classList.add('your-active-class');
            } else {
                //removing class('active') from siblings
                section.classList.remove('your-active-class');
            }
        });


        // "BEGIN" scroll Up button */


        if (window.pageYOffset > 500) {
            scrollUp.style.display = 'block';
            clickScrollUp();
        } else {
            scrollUp.style.display = 'none';
        }
        // "End" scroll Up button 

    });


}, 0);
//console.log(performance.now());