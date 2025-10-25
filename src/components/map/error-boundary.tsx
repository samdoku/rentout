"use client";

import React from "react";

type Props = {
	children: React.ReactNode;
	fallback: React.ReactNode;
	/** Optional: change these to reset the boundary (e.g., when retrying) */
	resetKeys?: unknown[];
	/** Optional: report/log errors somewhere */
	onError?: (error: Error, info: { componentStack: string }) => void;
};

type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		this.props.onError?.(error, { componentStack: info.componentStack ?? "" });
	}

	componentDidUpdate(prevProps: Props) {
		if (this.state.hasError && JSON.stringify(prevProps.resetKeys) !== JSON.stringify(this.props.resetKeys)) {
			this.setState({ hasError: false });
		}
	}

	render() {
		if (this.state.hasError) return this.props.fallback;
		return this.props.children;
	}
}
