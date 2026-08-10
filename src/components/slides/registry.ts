import type { ComponentType } from "react";
import { S01 } from "./deck/S01";
import { S02 } from "./deck/S02";
import { S03 } from "./deck/S03";
import { S04 } from "./deck/S04";
import { SKerangkaTeori, SKerangkaKonsep } from "./deck/SKerangka";
import { S05 } from "./deck/S05";
import { S06 } from "./deck/S06";
import { STabel31, STabel32 } from "./deck/STabel";
import { S08 } from "./deck/S08";
import { S09 } from "./deck/S09";
import { SConfusion } from "./deck/SConfusion";
import { S10 } from "./deck/S10";
import { SProbDist } from "./deck/SProbDist";
import { S11 } from "./deck/S11";
import { S12 } from "./deck/S12";
import { SShapBar } from "./deck/SShapBar";
import { SShapBees } from "./deck/SShapBees";
import { SModel } from "./deck/SModel";
import { SValiditas } from "./deck/SValiditas";
import { SParamCount } from "./deck/SParamCount";
import { S13 } from "./deck/S13";
import { S16 } from "./deck/S16";
import { S14 } from "./deck/S14";
import { S15 } from "./deck/S15";
import { SGraceSejajar } from "./deck/SGraceSejajar";
import { P41, P42, P43, P44, P45, P46, P47 } from "./deck/Pembahasan";
import { S17 } from "./deck/S17";
import { S18 } from "./deck/S18";
import { S19 } from "./deck/S19";
import { S20 } from "./deck/S20";
import { S21 } from "./deck/S21";
import { SRumusanTujuan } from "./deck/SRumusanTujuan";
import { SManfaat } from "./deck/SManfaat";
import { SMetode1 } from "./deck/SMetode1";
import { SMetode2 } from "./deck/SMetode2";
import { SMetode3 } from "./deck/SMetode3";
import { SMetode4 } from "./deck/SMetode4";
import { SMetode5 } from "./deck/SMetode5";
import { SMetode6 } from "./deck/SMetode6";

export type SlideEntry = { title: string; Component: ComponentType };

export const SLIDES: SlideEntry[] = [
  { title: "Halaman judul tesis", Component: S01 },
  { title: "Pembunuh senyap di IGD", Component: S02 },
  { title: "Keterbatasan GRACE & TIMI", Component: S03 },
  { title: "Machine learning: paradigma baru", Component: S04 },
  { title: "Kerangka teori", Component: SKerangkaTeori },
  { title: "Kerangka konsep", Component: SKerangkaKonsep },
  { title: "Desain studi & alur STROBE", Component: S05 },
  { title: "13 prediktor", Component: S06 },
  { title: "Pengembangan model & protokol validasi", Component: SModel },
  { title: "Tabel 3.1 — karakteristik dasar", Component: STabel31 },
  { title: "Tabel 3.2 — STEMI vs NSTEMI", Component: STabel32 },
  { title: "Analisis jumlah parameter optimal", Component: SParamCount },
  { title: "Kurva ROC — AUC 0,819", Component: S08 },
  { title: "Mengapa model ini valid", Component: SValiditas },
  { title: "Dua ambang batas", Component: S09 },
  { title: "Matriks konfusi", Component: SConfusion },
  { title: "Kalibrasi, DCA & PR", Component: S10 },
  { title: "Distribusi probabilitas", Component: SProbDist },
  { title: "Feature importance (Gini)", Component: S11 },
  { title: "Analisis SHAP — kontribusi global", Component: SShapBar },
  { title: "Analisis SHAP — beeswarm", Component: SShapBees },
  { title: "Analisis SHAP — waterfall pasien", Component: S12 },
  { title: "Triase tiga tingkat", Component: S13 },
  { title: "Tiga luaran", Component: S16 },
  { title: "RF vs XGBoost", Component: S14 },
  { title: "RF vs GRACE 2.0", Component: S15 },
  { title: "Perbandingan variabel sejajar", Component: SGraceSejajar },
  { title: "Pembahasan 4.1 — performa model", Component: P41 },
  { title: "Pembahasan 4.2 — pemilihan algoritma", Component: P42 },
  { title: "Pembahasan 4.3 — fungsi ginjal", Component: P43 },
  { title: "Pembahasan 4.4 — triase bertingkat", Component: P44 },
  { title: "Pembahasan 4.5 — GRACE di Asia", Component: P45 },
  { title: "Pembahasan 4.6 — studi ML lain", Component: P46 },
  { title: "Pembahasan 4.7 & 4.8 — SKG & komposit", Component: P47 },
  { title: "Pembahasan 4.9 — implikasi klinis", Component: S17 },
  { title: "Pembahasan 4.10 — keterbatasan", Component: S18 },
  { title: "Pembahasan 4.11 — TRIPOD+AI", Component: S19 },
  { title: "Kesimpulan", Component: S20 },
  { title: "Saran & referensi", Component: S21 },
];
