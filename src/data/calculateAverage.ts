import { Category, GradeEntry } from '../types';

const categories: Category[] = [
	{
		title: 'Academic Behavior',
		weight: 0.1,
	},
	{
		title: 'Formative Assessments',
		weight: 0.4,
	},
	{
		title: 'Summative Assessments',
		weight: 0.5,
	},
];
const gradeEntries: GradeEntry[] = [
	{
		name: '2b lab packet',
		category: 'Academic Behavior',
		score: 8,
		totalScore: 10,
	},
	{
		name: 'Test Unit 2',
		category: 'Summative Assessments',
		score: 73,
		totalScore: 100,
	},
	{
		name: 'Empirical POGIL',
		category: 'Academic Behavior',
		score: 5,
		totalScore: 5,
	},
	{
		name: 'qz 2b.01',
		category: 'Formative Assessments',
		score: 18,
		totalScore: 18,
	},
];

const processedGradeEntries = categories.map((category) => {
	const relevantGradeEntries = gradeEntries.filter(
		(grade) => grade.category === category.title
	);

	const points = relevantGradeEntries.reduce(
		(a, b) => {
			return {
				totalScore: a.totalScore + b.totalScore,
				score: a.score + b.score,
			};
		},
		{ totalScore: 0, score: 0 }
	);

	return {
		category,
		averageScore: points.score / points.totalScore,
	};
});

const score = processedGradeEntries
	.map((entry) => {
		return entry.category.weight * entry.averageScore * 100;
	})
	.reduce((a, b) => a + b, 0);

console.log(score.toFixed(2));
