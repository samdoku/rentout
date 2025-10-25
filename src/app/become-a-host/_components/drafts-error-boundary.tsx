// src/app/become-a-host/_components/DraftsErrorBoundary.tsx
"use client";

import React, { ErrorInfo } from "react";

interface Props {
	children: React.ReactNode;
}

interface State {
	hasError: boolean;
	errorKey: number; // to force reset
}

export class DraftsErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, errorKey: 0 };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Error in drafts section:", error, info);
	}

	handleRetry = () => {
		this.setState((prev) => ({
			hasError: false,
			errorKey: prev.errorKey + 1, // force children re-render
		}));
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="p-4 border mb-8 border-red-400 bg-red-100 rounded-md text-red-700">
					<p>Could not load your drafts. Please try again later.</p>
					<button onClick={this.handleRetry} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
						Retry
					</button>
				</div>
			);
		}

		// wrap children with key so that retry re-renders them
		return <React.Fragment key={this.state.errorKey}>{this.props.children}</React.Fragment>;
	}
}
