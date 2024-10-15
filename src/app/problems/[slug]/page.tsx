"use client";

import "@/ace/ace";
import { ModeToggle } from "@/components/base/ModeToggle";
import ProblemStatement from "@/components/base/Problem";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Languages from "@/constants/Languages";
import Themes from "@/constants/Themes";
import Welcome from "@/markdown/welcome.mdx";
import {
	ChevronLeft,
	ChevronRight,
	List,
	Play,
	Send,
	Settings,
} from "lucide-react";
import { useState } from "react";
import AceEditor from "react-ace";

type languageSupport = {
	languageName: string;
	value: string;
};

type themeStyle = {
	themeName: string;
	value: string;
};

export default function ProblemsDemo() {
	const [language, setLanguage] = useState("c_cpp");
	const [theme, setTheme] = useState("monokai");
	const [code, setCode] = useState("");

	async function handleSubmission() {
		try {
			console.log(code);
			console.log(language);
			const response = await fetch(
				"http://localhost:5009/api/v1/submissions/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						code,
						language,
						userId: "1",
						problemId: "66ca26b3bfff599f0ddf3fa6",
					}),
				}
			);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<main className="flex flex-col mx-auto justify-center items-center px-4">
			<header className="flex w-full items-center justify-between p-2">
				<div className="flex items-center space-x-4">
					<span className="text-2xl font-bold text-blue-500">
						100xCode
					</span>
					<Button
						variant="ghost"
						size="icon"
					>
						<List className="h-5 w-5" />
					</Button>
					<Button variant="ghost">Problem List</Button>
					<Button
						variant="ghost"
						size="icon"
					>
						<ChevronLeft className="h-5 w-5" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
					>
						<ChevronRight className="h-5 w-5" />
					</Button>
					{/* <Button
						variant="ghost"
						size="icon"
					>
						<Maximize2 className="h-5 w-5" />
					</Button> */}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
					>
						<Play className="h-4 w-4 mr-2" />
						Run
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="text-green-500"
						onClick={handleSubmission}
					>
						<Send className="h-4 w-4 mr-2" />
						Submit
					</Button>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="ghost"
						size="sm"
					>
						Register
					</Button>
					<span>or</span>
					<Button
						variant="ghost"
						size="sm"
					>
						Sign in
					</Button>
					<ModeToggle />
					<Button
						variant="ghost"
						size="icon"
					>
						<Settings className="h-5 w-5" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="text-yellow-400 hover:text-yellow-400"
					>
						Premium
					</Button>
				</div>
			</header>
			<ResizablePanelGroup
				direction="horizontal"
				className="w-full min-h-screen rounded-lg border"
			>
				<ResizablePanel defaultSize={50}>
					<ScrollArea className="h-screen p-4 py-6">
						<ProblemStatement>
							<Welcome />
						</ProblemStatement>
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={50}>
							<div className="flex justify-start items-center gap-6 px-6 pt-4">
								<div>
									<Select defaultValue={language}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Choose language" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{Languages.map(
													(
														language: languageSupport
													) => (
														<SelectItem
															key={language.value}
															value={
																language.value
															}
														>
															{
																language.languageName
															}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Select defaultValue={theme}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Choose theme" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{Themes.map(
													(theme: themeStyle) => (
														<SelectItem
															key={theme.value}
															value={theme.value}
														>
															{theme.themeName}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex h-full items-center justify-center p-6">
								<AceEditor
									name="codeEditor"
									mode={language}
									theme={theme}
									value={code}
									onChange={(e: string) => setCode(e)}
									setOptions={{
										enableBasicAutocompletion: true,
										enableLiveAutocompletion: true,
										showLineNumbers: true,
										fontSize: 16,
									}}
									width="100%"
									height="100%"
								/>
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel defaultSize={50}>
							<div className="flex h-full items-center justify-center p-6"></div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
