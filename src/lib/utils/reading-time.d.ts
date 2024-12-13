declare module 'reading-time/lib/reading-time' {
	function readingTime(text: string): {
		text: string;
		time: number;
		minutes: number;
		words: number;
		speed: number;
	};

	export = readingTime;
}
