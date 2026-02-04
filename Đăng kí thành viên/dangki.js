const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.className = "show " + type; 
    toast.innerText = message;
    
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('up-name').value;
    const email = document.getElementById('up-email').value;
    const password = document.getElementById('up-password').value;
    const users = JSON.parse(localStorage.getItem('adidas_users')) || [];
    const isUserExist = users.some(user => user.email === email);
    if (isUserExist) {
        showToast("Email này đã được sử dụng!", "error");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem('adidas_users', JSON.stringify(users));

    showToast("Đăng ký thành công! Hãy đăng nhập.", "success");

    signUpForm.reset();
    signInButton.click(); 
});


const signInForm = document.getElementById('signInForm');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('in-email').value;
    const password = document.getElementById('in-password').value;
    const users = JSON.parse(localStorage.getItem('adidas_users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        showToast("Đăng nhập thành công! Đang chuyển hướng...", "success");
        localStorage.setItem('adidas_current_user', JSON.stringify(validUser));
        setTimeout(() => {
            window.location.href = "../index1.html"; 
        }, 1500);

    } else {
        showToast("Email hoặc mật khẩu không đúng!", "error");
    }
});
