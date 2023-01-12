export default {
	cugUser: process.env.SLUIE2ET_CUG_USER?.toString() ?? '',
	cugPw: process.env.SLUIE2ET_CUG_PW?.toString() ?? '',
	env: process.env.SLUIE2ET_ENV?.toUpperCase() ?? 'NONE',
	baseUrl: process.env.SLUIE2ET_URL?.toLowerCase() ?? 'URL NOT SET!',
	hasDisclaimer: process.env.SLUIE2ET_HAS_DISCLAIMER === '1',
};
