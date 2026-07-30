import type { ComponentType } from "react";
import { S01 } from "./deck/S01";
import { S02 } from "./deck/S02";
import { S03 } from "./deck/S03";
import { S04 } from "./deck/S04";
import { S05 } from "./deck/S05";
import { S06 } from "./deck/S06";
import { S07 } from "./deck/S07";
import { S08 } from "./deck/S08";
import { S09 } from "./deck/S09";
import { S10 } from "./deck/S10";
import { S11 } from "./deck/S11";
import { S12 } from "./deck/S12";
import { S13 } from "./deck/S13";
import { S14 } from "./deck/S14";
import { S15 } from "./deck/S15";
import { S16 } from "./deck/S16";
import { S17 } from "./deck/S17";
import { S18 } from "./deck/S18";
import { S19 } from "./deck/S19";
import { S20 } from "./deck/S20";
import { S21 } from "./deck/S21";

export type SlideEntry = { title: string; Component: ComponentType };

export const SLIDES: SlideEntry[] = [
  { title: "Judul & AUC 0,819", Component: S01 },
  { title: "Pembunuh senyap di IGD", Component: S02 },
  { title: "Keterbatasan GRACE & TIMI", Component: S03 },
  { title: "Machine learning: paradigma baru", Component: S04 },
  { title: "Desain studi & alur partisipan", Component: S05 },
  { title: "13 prediktor", Component: S06 },
  { title: "Karakteristik kohort", Component: S07 },
  { title: "Performa model AUC 0,819", Component: S08 },
  { title: "Dua ambang batas", Component: S09 },
  { title: "Kalibrasi & manfaat klinis", Component: S10 },
  { title: "eGFR & ureum dominan", Component: S11 },
  { title: "SHAP: melampaui peringkat", Component: S12 },
  { title: "Triase tiga tingkat", Component: S13 },
  { title: "RF vs XGBoost", Component: S14 },
  { title: "RF vs GRACE 2.0", Component: S15 },
  { title: "Tiga luaran", Component: S16 },
  { title: "Implikasi klinis", Component: S17 },
  { title: "Keterbatasan", Component: S18 },
  { title: "Kepatuhan TRIPOD+AI", Component: S19 },
  { title: "Kesimpulan", Component: S20 },
  { title: "Saran & referensi", Component: S21 },
];
