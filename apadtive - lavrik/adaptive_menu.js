document.querySelectorAll('.menu-toggle')[0].addEventListener('click', () => {

    const isMenuOpen = document.querySelectorAll('.menu.clearfix')[0];

    if ( isMenuOpen.style.display === 'block' ) {
        isMenuOpen.removeAttribute('style');
    } else {
        isMenuOpen.style.display = 'block';
    }

});