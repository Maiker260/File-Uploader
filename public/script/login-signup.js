const getById = (id) => document.getElementById(id);

const {
    loginOption,
    signUpOption,
    loginForm,
    signUpForm,
    submitBtn,
    form,
    successBanner,
} = {
    loginOption: getById("loginOption"),
    signUpOption: getById("signUpOption"),
    loginForm: getById("loginForm"),
    signUpForm: getById("signUpForm"),
    submitBtn: getById("submitBtn"),
    form: getById("form"),
    successBanner: getById("successBanner"),
};

// Hide Banner if the User creation was sucessfully.
if (successBanner) {
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

    loginOption.classList.toggle("form-option-active");
    signUpOption.classList.toggle("form-option-active");
    signUpForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    submitBtn.textContent = mode;
    form.action = isLogin ? "/login" : "/sign-up";
};

loginOption.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginOption.classList.contains("form-option-active")) return;
    toggleClasses("Login");
    clearURL();
});

signUpOption.addEventListener("click", (e) => {
    e.preventDefault();
    if (signUpOption.classList.contains("form-option-active")) return;
    toggleClasses("Sign Up");
    clearURL();
});

// Remove query parameters in the URL
if (window.history.replaceState) {
    clearURL();
}
