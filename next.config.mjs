/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/workspaces",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
