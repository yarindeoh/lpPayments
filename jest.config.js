module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    moduleNameMapper: {
        '^common(.*)$': '<rootDir>/src/common$1',
        '^utils(.*)$': '<rootDir>/src/utils$1',
        '^src(.*)$': '<rootDir>/src$1',
        '^resources(.*)$': '<rootDir>/resources$1'
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$':
            '<rootDir>src/common/utils/fileTransformer.js'
    }
};
