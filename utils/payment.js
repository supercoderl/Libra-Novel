export const getIcon = (provider) => {
    let icon = "";
    switch (provider) {
        case "paypal":
            icon = "https://static-00.iconduck.com/assets.00/visa-icon-2048x1286-fhy0jwfc.png";
            break;
        case "amex":
            icon = "https://static-00.iconduck.com/assets.00/amex-icon-2048x1332-eum84nfa.png";
            break;
        case "mastercard":
            icon = "https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1286-s6y46dfh.png";
            break;
        case "bank":
            icon = "https://static-00.iconduck.com/assets.00/credit-card-emoji-2048x1317-btgi2qqv.png";
            break;
        case "stripe":
            icon = "https://cdn.iconscout.com/icon/free/png-256/free-cc-stripe-3521328-2944747.png?f=webp&w=256";
            break;
    }

    return icon;
}

export const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "**** **** **** 0000";
    // Chuyển cardNumber thành chuỗi để dễ thao tác
    const cardStr = cardNumber.toString();

    // Tách chuỗi thành mảng các ký tự
    const cardArray = cardStr.split('');

    // Đếm số lượng ký tự số
    let digitCount = 0;
    for (let i = cardArray.length - 1; i >= 0; i--) {
        if (cardArray[i] >= '0' && cardArray[i] <= '9') {
            digitCount++;
            // Nếu đã giữ lại đủ 4 ký tự số cuối, thoát khỏi vòng lặp
            if (digitCount > 4) {
                cardArray[i] = '*';
            }
        } else if (cardArray[i] === '-') {
            cardArray[i] = ' ';
        }
    }

    // Kết hợp các ký tự trong mảng thành chuỗi đã được mask
    return cardArray.join('');
}