const dev = process.env.NODE_ENV !== 'production';

export const URL = dev ? 'http://localhost:3000' : 'https://trakit-two.vercel.app';

export function camelCaseToTitleCase(str: string): string {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}