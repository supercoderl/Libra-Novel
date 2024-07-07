import moment from "moment/moment";

//Format date
export const dateFormatter = (date, format) => {
    return date ? moment(date).format(format || "DD-MM-YYYY") : "N/A";
}

//Get time ago
export const timeAgo = (date) => {
    return moment(date).fromNow();
}