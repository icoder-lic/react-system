export const getFloor = (item, value) => {
    if (value[0] == 1 && value[1] == 1) {
        return "1层";
    } else if (value[0] == 1 && value[1] == 6) {
        return "6层以下";
    } else if (value[0] == 6 && value[1] == 12) {
        return "6层到12层";
    } else if (value[0] == 12 && value[1] == 36) {
        return "12层以上";
    }
}
export const getRoom = (item, value) => {
    switch (value) {
        case 1:
            return "一居";
        case 2:
            return "两居";
        case 3:
            return "三居";
        case 4:
            return "四居";
        case 5:
            return "五居以上";
    }
}