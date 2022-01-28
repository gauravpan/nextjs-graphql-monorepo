import type { NextPage } from "next";
import { ReactNode } from "react";

export type AppPage = NextPage & {
  getLayout: (page: ReactNode) => ReactNode;
  authenticate?: boolean;
};
