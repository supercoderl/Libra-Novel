//Slip the first string of GUID before the first "-"
export const splitFirstGuid = (value) => {
    if (!value) return 'N/A';
    return value.split('-')[0];
}

//Concat firstname and lastname to fullname
export const concatName = (firstname, lastname) => {
    if (!firstname && !lastname) return 'N/A';
    else if (!firstname && lastname) return lastname;
    else if (firstname && !lastname) return firstname;
    else return lastname + ' ' + firstname;
}

//Slit genres
export const splitGenres = (value) => {
    if (value && value.length > 0) {
        return value.join(", ");
    }
    return "N/A";
}

//Capitalize the first letter
export const capitalizeFirstLetter = (value) => {
    if (!value) return "N/A";
    return value.charAt(0).toUpperCase() + value.slice(1);
}

//Hash email
const hashEmail = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        const char = email.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash >>> 0; // Convert to unsigned 32-bit integer
}

//Encode email to number as facebook user
export const encodeEmailToNumber = (email) => {
    if(!email) return 'error';
    const hash = hashEmail(email);
    const positiveHash = Math.abs(hash);
    const numString = positiveHash.toString() + '0000000000'.slice(positiveHash.toString().length);
    return numString.slice(0, 15);
}