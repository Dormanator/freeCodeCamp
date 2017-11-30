// listen for clicks on nav item to allow info on quote generator to be toggled on and off
document.getElementById('nav_quote').addEventListener('click', x => {
    toggleInfo( document.getElementById('qt_gen_info') );
    toggleCurrent( document.getElementById('nav_quote') );
});

// function to allow info on nav items to be toggled on and off
function toggleInfo (object) {
    
        if (object.style.display === 'none') {
            object.style.display = 'block';
        } else {
            object.style.display = 'none';
        }
}

function toggleCurrent (object) {
    if ( object.classList.contains('current-nav') ) {
        object.classList.remove('current-nav');
    } else {
        object.classList.add('current-nav');
    }
}