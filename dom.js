
function setFormMessage(formElement, type, message){
    const messageElement=formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}


function setInputError(inputElement, message){
        inputElement.classList.add("form__input--error");
        inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error")
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

// this event listener is for when content gets loaded, it the established jsvariables for
// log in and create account forms, and activates all the other listeners.
document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

// these event listeners looks for a click on the link to switch between signing in and 
// creating createAccountForm. It uses preventDefault to make sure the website doesn't 
// try to load a new page as it is a link.    
    document.querySelector("#linkCreateAccount").addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });
    document.querySelector("#linkLogin").addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

// This is where a submit attempt occurs, and the page current is set to bounce back an
// error message using the setFormMessage function
    loginForm.addEventListener("submit", e =>{
        e.preventDefault();
        //perform your ajax/fetch login here if you used it

        setFormMessage(loginForm, "error", "invalid attempt");
    });

// This one is cool, when you remove focus from an input, this motion is called blur. This listener listens
// for the defocus and then runs the test(is this a sign-up attempt[using the id to determine] and if so... is
// it) more than 0 characters(have started typing) but less than 10(the req. min for a user name)
    document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if(e.target.id === "signupUsername" && e.target.value.length>0 && e.target.value.length< 10){
                setInputError(inputElement,"Username must be atleast 10 characters in length");
            }
        })
// Here we listen for input and clear that message, making it so if they activate the error but then add
// more characters it clears out the demand message

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        })
    })
}) ;