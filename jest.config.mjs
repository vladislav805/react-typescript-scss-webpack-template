import tsconfig from './tsconfig.json' with { type: 'json' };

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    rootDir: 'src',
    testMatch: [
        '**/*.test.ts',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                ...tsconfig.compilerOptions,
                verbatimModuleSyntax: false,
            },
        }],
    },
    maxConcurrency: 8,
    coverageReporters: ['text'],
};
