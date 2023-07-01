export const metadata = {
    title: 'Dashboard',
    generator: 'Next.js',
    applicationName: 'TrakIt',
    authors: [{ name: 'Junior' }],
    colorScheme: 'dark',
    creator: 'Junior Green',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
}

export default async function Dashboard() {
    const percentStats = new Set<number>()
    const nonPercentStats = new Set<number>()
    

    return (
        <div className="w-full h-full p-10">
            <div className="grid grid-cols-5 items-center justify-center">

            </div>
        </div>
    )
}