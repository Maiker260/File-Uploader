const get = (id) => document.getElementById(id);

const loginFormOption = get("loginOption");
const signUpFormOption = get("signUpOption");
const loginForm = get("loginForm");
const signUpForm = get("signUpForm");
const submitBtn = get("submitBtn");
const form = get("form");
const banner = document.getElementById("successBanner");

// Hide Banner if the User creation was sucessfully.
if (banner) {
    setTimeout(() => {
        banner.classList.add("fade-out");
    }, 3000);
}

// Remove URL attributes.
const clearURL = () => {
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url.toString());
};

// Toggle between Login and Sign Up
const toggleClasses = (mode) => {
    const isLogin = mode === "Login";

    loginFormOption.classList.toggle("form-option-active");
    signUpFormOption.classList.toggle("form-option-active");
    signUpForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    submitBtn.textContent = mode;
    form.action = isLogin ? "/login" : "/sign-up";
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
