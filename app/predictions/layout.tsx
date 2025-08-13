import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predictions App - Predictions",
  description: "Predictions page of the Predictions App",
};

export default function PredictionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl m-auto p-4 bg-dark-bg-1">
      <h1 className="font-bold text-2xl text-center">Predictions App</h1>
      {children}
    </div>
  );
}
