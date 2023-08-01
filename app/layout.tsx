import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SuperApp",
	description: "SuperApp by nightmunch",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className={inter.className}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<div className="flex flex-col">
							<NavigationBar />
							{children}
						</div>
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
