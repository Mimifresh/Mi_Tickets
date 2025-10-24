
export const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(email) {
    if(!email) return "Email is required";
    if(!emailRegex.test(email.trim())) return "Enter a valid email address (e.g., yourname@gmail.com)";
    return null;
}

export function validateName(name){
    if(!name) return "Name is required";
    if(name.trim().length < 3) return "Name must be at least 3 characters long";
    return null;
}

export function validatePassword(password){
    if(!password) return "Password is required";
    if(password.length < 6) return "Password must be at least 6 characters long";
    return null;
}