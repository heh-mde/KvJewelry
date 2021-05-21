$(function () {
    $('.switch_form').click(function () {
        let loginContainer = $('.login_form_container');
        let registerContainer = $('.register_form_container');
        if (loginContainer.hasClass('non-active')) {
            loginContainer.removeClass('non-active');
            registerContainer.addClass('non-active');
        } else {
            registerContainer.removeClass('non-active');
            loginContainer.addClass('non-active');
        }
    })
})

$(function () {
    $('.register_form').on('submit', registerUser);
})

$(function () {
    $('.login_form').on('submit', loginUser);
})

async function loginUser(event) {
    event.preventDefault();
    let uname = $('.login_form > input[name="uname"]');
    let pass = $('.login_form > input[name="psw"]');
    $('.login_warning').remove();
    const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
            getRandNum: true
        })
    }).then(async function (res) {
        let r = await res.json();
        let array = new Int8Array(10);
        window.crypto.getRandomValues(array);
        let clientSalt = array.join("");
        clientSalt = new Hashes.SHA256().hex(clientSalt);
        let passSHA = new Hashes.SHA512().hex(pass[0].value);
        const res2 = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                tryLogin: true,
                sha: passSHA + r.serverSalt + clientSalt,
                clientSalt,
                uname: uname[0].value
            })
        }).then(async function (res) {
            let r = await res.json();
            if (!r.isSuccessful) {
                pass.after(`<div class="login_warning">Неверное имя пользователя или пароль.</div>`)
            } else {
                window.location.href = 'http://localhost:63000/'; //IMPORTANT TO CHANGE
            }
        }).catch(function (err) {
            console.log(err);
        })
    }).catch(function (err) {
        console.log(err);
    })
}

async function registerUser(event) {
    event.preventDefault();
    let uname = $('.register_form > input[name="uname"]');
    let email = $('.register_form > input[name="email"]');
    let pass = $('.register_form > input[name="psw"]');
    let name = $('.register_form > input[name="name"]');
    let surname = $('.register_form > input[name="surname"]');
    $('.name_warning').remove();
    $('.email_warning').remove();
    $('.uname_incorrect').remove();
    $('.email_incorrect').remove();
    $('.pass_incorrect').remove();
    $('.name_incorrect').remove();
    $('.surname_incorrect').remove();
    let flag = 0;
    if (uname[0].value.length > 30 || uname[0].value.length < 4 || uname[0].value.replace(/[a-zA-Z0-9_]+/g, "")) {
        uname.after(`<div class="uname_incorrect">Имя пользователя должно содержать не больше 30 символов и состоять только из букв, цифр и символа _.</div>`);
        flag = 1;
    }

    if (!/^[^\s@]+@[^\s@]+$/.test(email[0].value)) {
        email.after(`<div class="email_incorrect">Указана неверная почта.</div>`);
        flag = 1;
    }

    if (pass[0].value.length < 8 || pass[0].value.length > 40 || pass[0].value.replace(/[a-zA-Z0-9_]+/g, "")) {
        pass.after(`<div class="pass_incorrect">Пароль должен состоять из латинских символов, цифр и знака _. Длинна пароля 8-40 символов.</div>`);
        flag = 1;
    }

    if (name[0].value.replace(/[ A-Za-z-А-Яа-я]/g, "") || name[0].value.length > 255) {
        name.after(`<div class="name_incorrect">Имя может содержать кирилицу либо латиницу, пробелы и символ -.</div>`);
        flag = 1;
    }

    if (surname[0].value.replace(/[ A-Za-z-А-Яа-я]/g, "") || surname[0].value.length > 255) {
        surname.after(`<div class="surname_incorrect">Фамилия может содержать кирилицу либо латиницу, пробелы и символ -.</div>`);
        flag = 1;
    }

    if (!flag) {
        const passSHA = new Hashes.SHA512().hex(pass[0].value);
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                uname: uname[0].value,
                email: email[0].value,
                pass: passSHA,
                name: name[0].value,
                surname: surname[0].value
            })
        }).then(async function (res) {
            let r = await res.json();
            if (r.login_exists) {
                uname.after(`<div class="name_warning">Имя ${uname} уже занято</div>`);
            }
            if (r.mail_exists) {
                email.after(`<div class="email_warning">Указанная почта уже занята</div>`);
            }
            if (r.created) {
                let regContainer = $('.register_form_container');
                regContainer.addClass('non-active');
                regContainer.after(`<div class="successful_reg">Поздравляем с успешной регистрацией!</div>`);
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
}