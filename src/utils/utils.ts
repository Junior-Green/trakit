const dev = process.env.NODE_ENV !== 'production';

export const URL = dev ? 'http://localhost:3000' : 'https://trakit-two.vercel.app';

export function camelCaseToTitleCase(str: string): string {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function formatDate(date: Date): string {
    const months: any = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'Novemeber',
        11: 'December'
    };

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}