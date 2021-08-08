import { card } from "./card";
import { badge } from "./badge";
import { themeColors } from "./colors";
import { spacers, gridBreakpoints } from "./variables";

const theme = {
    breakpoints: [gridBreakpoints.xs, gridBreakpoints.sm, gridBreakpoints.md, gridBreakpoints.lg, gridBreakpoints.xl, gridBreakpoints.xxl],
    fontSizes: [
        8,10,12, 14, 16, 20, 24, 32, 48, 64
    ],
    colors: themeColors,
    space: [
        spacers[0], spacers[1], spacers[2], spacers[3], spacers[4], spacers[5]
    ],
    fonts: {
        body: "IRANSans,BYekan,Verdana, Geneva, Tahoma, sans- serif",
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
        card,
        badge
    },
    text: {
    },
    buttons: {
        primary: {
            color: themeColors.white,
            bg: themeColors.primary,
        },
        warning: {
            color: themeColors.black,
            bg: themeColors.warning,
        },
        danger: {
            color: themeColors.white,
            bg: themeColors.danger,
        },
        dark: {
            color: themeColors.white,
            bg: themeColors.dark,
        },
        cyan: {
            color: themeColors.white,
            bg: themeColors.cyan,
        },
        creamy: {
            color: themeColors.white,
            bg: themeColors.creamy,
        },
        indigo: {
            color: themeColors.white,
            bg: themeColors.indigo,
        },
        info: {
            color: themeColors.white,
            bg: themeColors.info,
        },
        success: {
            color: themeColors.black,
            bg: themeColors.success,
        },
        secondary: {
            color: themeColors.white,
            bg: themeColors.secondary,
        },
        purple: {
            color: themeColors.white,
            bg: themeColors.purple,
        },
    }
}

console.log("theme =>",theme);

export default theme;