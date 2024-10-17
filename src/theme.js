const baseTheme = {
    fontSizes: {
        small: '12px',
        medium: '14px',
        large: '16px',
        xlarge: '20px',
    },
    spaces: {
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    breakpoints: {
        mobile: '768px',
    }
};

export const lightTheme = {
    ...baseTheme,
    colors: {
        primaryBg: '#ffffff',
        secondaryBg: '#f6f8fa',
        textPrimary: '#24292e',
        textSecondary: '#586069',
        accentPrimary: '#0366d6',
        accentSecondary: '#2188ff',
        borderColor: '#e1e4e8',
        hoverColor: '#fcffff',
        sliderBg: '#ccc',
    },
};

export const darkTheme = {
    ...baseTheme,
    colors: {
        primaryBg: '#0d1117',
        secondaryBg: '#161b22',
        textPrimary: '#c9d1d9',
        textSecondary: '#8b949e',
        accentPrimary: '#58a6ff',
        accentSecondary: '#79c0ff',
        borderColor: '#30363d',
        hoverColor: '#161b22',
        sliderBg: '#333',
    },
};