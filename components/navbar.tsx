"use client";

import * as React from "react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { BiMenu } from "react-icons/bi";
import { CgLogIn, CgLogOut } from "react-icons/cg";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function NavigationBar() {
	return (
		<div className="px-5 min-h-[4rem] items-center flex border-b-orange-300 border-2 gap-5">
			<div className="flex-none">
				<Sheet>
					<SheetTrigger>
						<Button variant={"ghost"} size={"icon"}>
							<BiMenu className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"} className="w-60">
						<SheetHeader></SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
			<div className="flex-1">
				<h1 className="font-semibold text-xl">
					<span className="text-orange-400 dark:text-orange-300">Super</span>App
				</h1>
			</div>
			<div className="flex-none gap-2 flex">
				<ModeToggle />
				<Button variant={"ghost"} size={"icon"}>
					<CgLogIn className="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</div>
		</div>
	);
}
