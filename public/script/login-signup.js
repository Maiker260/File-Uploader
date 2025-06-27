const get = (id) => document.getElementById(id);

const loginFormOption = get("loginOption");
const signUpFormOption = get("signUpOption");
const loginForm = get("loginForm");
const signUpForm = get("signUpForm");
const submitBtn = get("submitBtn");
const form = get("form");

const clearURL = () => {
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url.toString());
};

const toggleClasses = (mode) => {
    loginFormOption.classList.toggle("form-option-active");
    signUpFormOption.classList.toggle("form-option-active");
    signUpForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    submitBtn.textContent = mode;
    form.action = mode == "Login" ? "/login" : "/sign-up";
};

loginFormOption.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginFormOption.classList.contains("form-option-active")) return;
    toggleClasses("Login");
    clearURL();
});

signUpFormOption.addEventListener("click", (e) => {
    e.preventDefault();
    if (signUpFormOption.classList.contains("form-option-active")) return;
    toggleClasses("Sign Up");
    clearURL();
});

// Remove query parameters in the URL
if (window.history.replaceState) {
    clearURL();
}
