import nextPwa from "next-pwa";

const withPWA = nextPwa({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
});

const nextConfig = {
    reactStrictMode: false,
};

export default withPWA(nextConfig);
