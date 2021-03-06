const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});


module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	async rewrites() {
		return [{
			source: "/:any*",
			destination: "/",
		}]
	},
	async headers() {
		return [{
			source: '/:any*',
			headers: [
				{
					key: 'Content-Security-Policy',
					value: "default-src 'unsafe-inline' 'self'; font-src 'none'; img-src 'self' data:; script-src 'unsafe-eval' 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; frame-src 'self' https://www.google.com/;",
				},
				{
					key: 'Referrer-Policy',
					value: 'origin-when-cross-origin',
				},
			]
		}]
	}
});


