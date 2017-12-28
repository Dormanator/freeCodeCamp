setLanding();
showContent();
showInfo();

// adds event listeners to nav-items, adn locates items to be displayed based on nav-items id
// nav-item ids are classes on elements to be displayed to locate and idexes them
document.getElementById('nav').addEventListener('click', x => {
    // ### if i can find parent of current target li > a the li, then i can add accessiblity fo IE ### \\

    // make sure we don't react to click that are not nav children with proper ids
    if (x.target !== x.currentTarget && x.target.id !== '') {
        // save the target element's id
        let commonClass = x.target.id;
        // use that id to locate all the elements that should be toggled on click
        let quoteGen = document.getElementsByClassName(commonClass);
        
        // use teh array values obtained to access the proper elements based on their location in the HTML
        // order is [ nav-items, nav-info, content ]
        showContent( quoteGen[2] );
        showInfo( quoteGen[1] );
        setCurrent( quoteGen[0] );
    }
    
}, false);

// set landing
// if JS loaded up correctly change the message on the landing page to normal
function setLanding () {
    document.getElementById("landing_message").textContent = "Front-End API Projects";
}

// showContent
// create function to show element input as param
function showContent ( contentElement ) {

    // vars for elements with 'content' class
    let sections = document.getElementsByClassName('content');

    // let user toggle back to landing content, set it as teh content if the content is already showing
    if (contentElement === undefined || contentElement.style.display === 'block'){ 
        contentElement = document.getElementById("landing");
    }

    // set all elements with 'content' class to none
    for (let i = 0; i < sections.length; i++) {   

        sections[i].style.display = 'none';
    }

    // set correct element to show
    contentElement.style.display = 'block';
}

// showInfo
// create function to show element input as param
function showInfo ( infoElement = {} ) {

    // vars for elements with 'content' class
    let panels = document.getElementsByClassName('nav-info');

    // if parameter is a valid inforElement and already set to display, set it to dummy object so it wont be set to show after for loop
    if (infoElement.style && infoElement.style.display === 'block') {
        infoElement = {};
    }

    // set all elements with 'content' class to none except the given element
    for (let i = 0; i < panels.length; i++) {   
        panels[i].style.display = 'none';
    }

    // if a valid infoElement with a .style property was passed in set it to display
    if (infoElement.style) {
        infoElement.style.display = 'block';   
    }
}
 



// setCurrent
// create function to check for current-nav on items except param input, remove it if it exists on other items and apply it to the element associated with param input if its not already
function setCurrent ( navLink ) {
    // vars for elements with 'content' class
    let links = document.getElementsByClassName('nav-item');
    
    // if contains class already set bogus object to keep it from being re added below, allows toggling
    if (navLink.classList && navLink.classList.contains('current-nav')) {
        navLink = {};
    }

    // checking all navLinks with 'nav-item for 'current-nav' and removing it
    for (let i = 0; i < links.length; i++) {

        if(links[i].classList.contains('current-nav')) { 
            links[i].classList.remove('current-nav');
        }
    }

    // if a valid navlink was passed into the function give it the class
    if (navLink.classList) {
        navLink.classList.add('current-nav');  
    }
}


// function to change aspects of site based on menu status
document.getElementById('nav_toggle').addEventListener( 'click', click => {
    
    // get value of checkbox
    let menuStatus = document.getElementById('nav_toggle').checked;
    // get label for menu to change it based on status
    let menuLabel = document.getElementById('menu_label');
    
    // set menu label to hamburger or close icon based on status
    if (menuStatus) {
        menuLabel.innerHTML = '<i class="fa fa-times fa-2x" aria-hidden="true">';
    } else {
        menuLabel.innerHTML = '<i class="fa fa-bars fa-2x" aria-hidden="true">';
    }

    // if menu will intersect rotating elements on wiki viewer page
    if (document.documentElement.clientWidth < 700) {
        // get random wiki div in wiki viewer section
        let randomWiki = document.getElementById('rotate_options');
        let randomLink = document.getElementById('random_link');

        // hide rotating elements on wiki viewer page if menu is open
        if (menuStatus) {
            randomWiki.style.display = 'none';
            randomLink.style.display = 'none';
        } else {
            randomWiki.style.display = 'block';
            randomLink.style.display = 'block';
        }
    }

});