let styleMode = localStorage.getItem('styleMode');
const styleToggle = document.querySelector('.theme-toggle');
const button = document.querySelector('#theme');

const enableDarkStyle = () => {
    document.body.classList.add('darkstyle');
    button.classList.add('active')
    localStorage.setItem('styleMode', 'dark');
}

const disableDarkStyle = () => {
    document.body.classList.remove('darkstyle');
    button.classList.remove('active')
    localStorage.setItem('styleMode', null);
}

styleToggle.addEventListener('click', () => {
    styleMode = localStorage.getItem('styleMode');
    if (styleMode !== 'dark'){
        enableDarkStyle();
    } else {
        disableDarkStyle();
    }
});

if(styleMode === 'dark') {
    enableDarkStyle();
}