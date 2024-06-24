import moment from "moment/moment";

export default function dateFormatter(date, format){
    return date ? moment(date).format(format || "DD-MM-YYYY") : "N/A";
}