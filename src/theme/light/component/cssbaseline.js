import InterWoff from '../../../assets/fonts/Inter-Regular.woff';
import KhandWoff from '../../../assets/fonts/khand-v14-latin-regular.woff';

export const cssBaselineStyle = {
    MuiCssBaseline: {
        styleOverrides: `
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Inter'), local('Inter-Regular'), url(${InterWoff}) format('woff'),url(${InterWoff}) format('woff2');
                }
                 @font-face {
                    font-family: 'Khand';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Khand'), local('khand-v14-latin-regular'), url(${KhandWoff}) format('woff'),url(${KhandWoff}) format('woff2');
                }
      `
    }
}

