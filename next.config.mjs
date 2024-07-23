/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/all-projects",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
