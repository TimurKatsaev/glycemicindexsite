let loginMode = localStorage.getItem('loginMode');
const header = document.querySelector('.header');
const exitButton = document.querySelector('#exit');

const enableLoginMode = () => {
    header.classList.add('active');
    localStorage.setItem('loginMode', 'active');
}

const disableLoginMode = () => {
    header.classList.remove('active');
    localStorage.setItem('loginMode', null);
}

exitButton.addEventListener('click', () => {
    loginMode = localStorage.getItem('loginMode');
    if (loginMode !== 'active'){
        enableLoginMode();
    } else {
        disableLoginMode();
    }
});

if(loginMode === 'active') {
    enableLoginMode();
}