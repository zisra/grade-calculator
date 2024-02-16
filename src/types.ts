export type Category = {
	title: string;
	weight: number;
};
export type GradeEntry = {
	name: string;
	category: string;
	score: number;
	totalScore: number;
};

// env types
declare module 'bun' {
	interface Env {
		USERNAME: string;
		PASSWORD: string;
	}
}
