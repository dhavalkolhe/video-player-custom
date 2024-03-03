/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

const customColors = {
  backBlack: "#0F0F0F",
  backGrey: "#212121",
  offWhite: "#E7E7E7",
};

export const theme = {
  colors: {
    ...colors,
    ...customColors,
  },
  fontFamily: { roboto: ["Roboto", "sans-serif"] },
  extend: {},
};
export const plugins = [];
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
