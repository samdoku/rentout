type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
	house: (props?: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="45"
			height="45"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 45 45"
			style={{ width: "45px", height: "45px", contentVisibility: "visible" }}
			{...props}
		>
			<defs>
				<clipPath id="__lottie_element_2273">
					<path d="M0 0H45V45H0z"></path>
				</clipPath>
			</defs>
			<g clipPath="url(#__lottie_element_2273)">
				<g display="block" opacity="1" transform="translate(.875 8)">
					<g opacity="1" transform="translate(16 14.5)">
						<path
							fill="#222"
							fillOpacity="1"
							d="M1.954-13.719l.175.164L15.201-.713 13.799.713l-1.8-1.768L12 12.5a2 2 0 01-1.851 1.994L10 14.5h-20a2.001 2.001 0 01-1.995-1.851L-12 12.5l-.001-13.554-1.798 1.767-1.402-1.426 13.058-12.829a3 3 0 014.097-.177zm-2.586 1.504l-.096.087-9.273 9.109L-10 12.5l4.999-.001L-5 2.5C-5 1.446-4.184.582-3.149.505L-3 .5h6c1.054 0 1.918.816 1.995 1.851L5 2.5l-.001 9.999L10 12.5 9.999-3.02.7-12.156a1.001 1.001 0 00-1.332-.059zM3 2.5h-6l-.001 9.999h6L3 2.5z"
						></path>
					</g>
				</g>
				<g display="none">
					<path fill="#FFF" d="M0 0H120V120H0z"></path>
				</g>
			</g>
		</svg>
	),
	apartment: (props?: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="45"
			height="45"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 45 45"
			style={{ width: "45px", height: "45px", contentVisibility: "visible" }}
			{...props}
		>
			<defs>
				<clipPath id="__lottie_element_2281">
					<path d="M0 0H45V45H0z"></path>
				</clipPath>
			</defs>
			<g clipPath="url(#__lottie_element_2281)">
				<g display="block" opacity="1" transform="translate(2 8.5)">
					<g opacity="1" transform="translate(14 14)">
						<path
							fill="#222"
							fillOpacity="1"
							d="M12-9H4v-3a2.006 2.006 0 00-2-2h-14a2.005 2.005 0 00-2 2v24a2.005 2.005 0 002 2h24a2.004 2.004 0 002-2V-7a2.006 2.006 0 00-2-2zM-3 12h-4V7h4v5zm5 0h-3V7a2.002 2.002 0 00-2-2h-4a2.006 2.006 0 00-2 2v5h-3l-.001-24H2v24zm10 0H4V-7h8v19zM9 0a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 019 0zM7-4a1.002 1.002 0 011.195-.981 1.003 1.003 0 01.729 1.364A1.001 1.001 0 017-4zm-8 4a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-1 0zm0-4a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-1-4zm0-4a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-1-8zm-6 8a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-7 0zm0-4a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-7-4zm0-4a1.002 1.002 0 01-1.195.981 1.003 1.003 0 01-.729-1.364A1.001 1.001 0 01-7-8z"
						></path>
					</g>
				</g>
				<g display="none">
					<path fill="#FFF" d="M0 0H120V120H0z"></path>
				</g>
			</g>
		</svg>
	),
};
