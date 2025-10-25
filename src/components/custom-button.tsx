import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "./ui/loader";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				xs: "h-8 text-[.8125rem] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

const loaderSizeByButtonSize: Record<NonNullable<ButtonProps["size"]>, string> = {
	xs: "h-3.5 w-3.5",
	sm: "h-3.5 w-3.5",
	default: "h-4 w-4",
	lg: "h-5 w-5",
	icon: "h-5 w-5",
};

function CustomLoader({ className, loadingState }: { className?: string; loadingState: boolean }) {
	return (
		<div className={cn(className, "absolute inset-0 flex items-center justify-center", !loadingState && "opacity-0")}>
			<Loader className="bg-white" />
		</div>
	);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	/** Preferred prop for loading state */
	isLoading?: boolean;
	/** Alias for isLoading – both are supported */
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, isLoading, loading, disabled, children, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		const loadingState = isLoading ?? loading ?? false;
		const computedSize = (size ?? "default") as NonNullable<ButtonProps["size"]>;

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }), loadingState && "flex invisible")}
				data-loading={loadingState ? "true" : undefined}
				aria-busy={loadingState || undefined}
				aria-disabled={disabled || loadingState || undefined}
				disabled={disabled || loadingState}
				ref={ref}
				{...props}
			>
				{children}
				<CustomLoader loadingState={loadingState} className={loaderSizeByButtonSize[computedSize]} />
				{/* <div className={cn("absolute inset-0 flex items-center justify-center", !loadingState && "opacity-0")}>
					<Loader className="bg-white" />
				</div> */}
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
