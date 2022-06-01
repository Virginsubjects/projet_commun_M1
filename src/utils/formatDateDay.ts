export const formatDateDay = (day?: number) => {
    switch (day) {
        case 1:
            return 'Lun.';
        case 2:
            return 'Mar.';
        case 3:
            return 'Mer.';
        case 4:
            return 'Jeu.';
        case 5:
            return 'Ven.';
        case 6:
            return 'Sam.';
        case 7:
            return 'Dim.';
        default:
            return '';
    }
}

export default formatDateDay;