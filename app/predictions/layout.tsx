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
    <div className="max-w-[1280px] m-auto sm:p-4 p-2 ">
      <h1 className="font-bold text-2xl text-center bg-dark-bg-1 py-4 rounded-lg mb-4">Predictions App</h1>
      {children}
    </div>
  );
}
