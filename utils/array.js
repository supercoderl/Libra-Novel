import hutao from '@/public/assets/images/banner/hutao.jpg';
import tingyun from '@/public/assets/images/banner/tingyun.jpg';
import yaemiko from '@/public/assets/images/banner/yaemiko.jpg';
import furina from '@/public/assets/images/banner/furina.png';
import nahida from '@/public/assets/images/banner/nahida.jpg';

//Shuffle an array
export const shuffleArray = (array) => {
    if (!array) return [];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Get week list: Today, yesterday, ... decrease day
export const weeks = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

    const today = new Date();
    const todayIndex = today.getDay();

    const weekArray = [];

    for (let i = 0; i < 7; i++) {
        const dayIndex = (todayIndex - i + 7) % 7;
        if (i === 0) {
            weekArray.push('Today');
        } else if (i === 1) {
            weekArray.push('Yesterday');
        } else {
            weekArray.push(shortDays[dayIndex]);
        }
    }

    return weekArray;
}

//Shuffle banner
export const shuffleBanner = () => {
    const banners = [hutao, tingyun, yaemiko, furina, nahida];

    for (let i = banners.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [banners[i], banners[j]] = [banners[j], banners[i]];
    }
    return banners;
}

//Random banner
export const randomBanner = () => {
    const shuffledBanners = shuffleBanner();
    const randomIndex = Math.floor(Math.random() * shuffledBanners.length);
    return shuffledBanners[randomIndex];
}

//Convert an array object to tree
export const convertArrayToTreeNodes = (array) => {
    return array.map(item => ({
        value: item.value.toString(),
        label: item.label,
        children: item.children && item.children.length > 0 ? convertArrayToTreeNodes(item.children) : undefined,
    }));
};

//Convert item in array to string
export const convertArrayToCheckedNodes = (array) => {
    return array.map(item => ({
        value: item.value.toString()
    }));
}

//Calculate total page
export const calculateTotalPages = (total, pageSize) => {
    return Math.ceil(total / pageSize);
}