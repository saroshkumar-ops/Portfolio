import { Archivo, Instrument_Serif, Roboto_Flex } from "next/font/google";

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth", "opsz"],
  display: "swap",
});
