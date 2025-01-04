(function() {
    const footer = document.getElementById('footer');
    if ('undefined' !== typeof footer) {
        const date = new Date();
        footer.innerHTML = '&copy; Poplauki <a href="https://wirtaw.github.io/">Vladimir Poplavskij</a> ' + date.getFullYear() + '.';
    }
    const langContext = document.getElementById('langContext');
    if (langContext && 'undefined' !== typeof langContext) {
      langContext.innerHTML = `${navigator.languages.join(';').toString()}`;
    }

    const burger = document.querySelector('.burger');
    if (burger && 'undefined' !== typeof burger) {
        const menu = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
}());