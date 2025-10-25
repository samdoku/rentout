type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
	logo: (props: IconProps) => <svg {...props}></svg>,
	shoppingBagBlack: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" viewBox="4.75 2.25 15.5 19.5" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.50035 9.3C5.487 8.31988 6.27024 7.51426 7.25035 7.5H17.7503C18.7305 7.51426 19.5137 8.31988 19.5004 9.3V17.4C19.5276 19.3605 17.9608 20.972 16.0004 21H9.00035C7.03989 20.972 5.4731 19.3605 5.50035 17.4V9.3Z"
				stroke="#000000"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M16.0004 10.2V6.6C16.0276 4.63953 14.4608 3.02797 12.5004 3C10.5399 3.02797 8.9731 4.63953 9.00035 6.6V10.2"
				stroke="#000000"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	shoppingBagRed: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="none" viewBox="4.75 2.25 15.5 19.5" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.50035 9.3C5.487 8.31988 6.27024 7.51426 7.25035 7.5H17.7503C18.7305 7.51426 19.5137 8.31988 19.5004 9.3V17.4C19.5276 19.3605 17.9608 20.972 16.0004 21H9.00035C7.03989 20.972 5.4731 19.3605 5.50035 17.4V9.3Z"
				stroke="red"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M16.0004 10.2V6.6C16.0276 4.63953 14.4608 3.02797 12.5004 3C10.5399 3.02797 8.9731 4.63953 9.00035 6.6V10.2"
				stroke="red"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	shoppingBagWhite: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="none" viewBox="4.75 2.25 15.5 19.5" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.50035 9.3C5.487 8.31988 6.27024 7.51426 7.25035 7.5H17.7503C18.7305 7.51426 19.5137 8.31988 19.5004 9.3V17.4C19.5276 19.3605 17.9608 20.972 16.0004 21H9.00035C7.03989 20.972 5.4731 19.3605 5.50035 17.4V9.3Z"
				stroke="#FFFFFF"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M16.0004 10.2V6.6C16.0276 4.63953 14.4608 3.02797 12.5004 3C10.5399 3.02797 8.9731 4.63953 9.00035 6.6V10.2"
				stroke="#FFFFFF"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	search: () => (
		<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="none" viewBox="4.75 4.25 15.5 15.5">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
				stroke="#000000"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
		</svg>
	),
	leftArrow: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" {...props}>
			<path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
		</svg>
	),
	rightArrow: (props?: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				fill: "none",
				height: "12px",
				width: "12px",
				stroke: "currentcolor",
				strokeWidth: "5.33333",
				overflow: "visible",
			}}
			{...props}
		>
			<path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
		</svg>
	),
	home: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" id="home" {...props}>
			<path
				fill="none"
				stroke="#000000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
				transform="translate(2.5 2)"
			></path>
		</svg>
	),
	homeBlack: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" id="home" {...props}>
			<path
				fill="black"
				stroke="#000000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
				transform="translate(2.5 2)"
			></path>
		</svg>
	),
	cart: (props?: IconProps) => (
		<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				opacity="1"
				d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
				stroke="#000000"
				strokeWidth="2"
			/>
			<path
				opacity="1"
				d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
				stroke="#000000"
				strokeWidth="2"
			/>
			<path
				d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
				stroke="#000000"
				strokeWidth="2"
			/>
		</svg>
	),
	cartBlack: (props?: IconProps) => (
		<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				opacity="1"
				d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
				stroke="#000000"
				fill="black"
				strokeWidth="2"
			/>
			<path
				opacity="1"
				d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
				stroke="#000000"
				fill="black"
				strokeWidth="2"
			/>
			<path
				d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
				stroke="#000000"
				fill="black"
				strokeWidth="2"
			/>
		</svg>
	),
	orders: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
			<path
				fillRule="evenodd"
				d="M4.976 1.5a2.75 2.75 0 0 0-2.72 2.347l-.662 4.46a9 9 0 0 0-.094 1.282v1.661a3.25 3.25 0 0 0 3.25 3.25h6.5a3.25 3.25 0 0 0 3.25-3.25v-1.66q0-.645-.095-1.283l-.66-4.46a2.75 2.75 0 0 0-2.72-2.347h-6.05Zm-1.237 2.567a1.25 1.25 0 0 1 1.237-1.067h6.048c.62 0 1.146.454 1.237 1.067l.583 3.933h-2.484c-.538 0-1.015.344-1.185.855l-.159.474a.25.25 0 0 1-.237.171h-1.558a.25.25 0 0 1-.237-.17l-.159-.475a1.25 1.25 0 0 0-1.185-.855h-2.484zm-.738 5.433-.001.09v1.66c0 .966.784 1.75 1.75 1.75h6.5a1.75 1.75 0 0 0 1.75-1.75v-1.75h-2.46l-.1.303a1.75 1.75 0 0 1-1.66 1.197h-1.56a1.75 1.75 0 0 1-1.66-1.197l-.1-.303h-2.46Z"
			></path>
		</svg>
	),
	ordersBlack: (props?: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
			<path
				fillRule="evenodd"
				d="M2.255 3.847a2.75 2.75 0 0 1 2.72-2.347h6.05a2.75 2.75 0 0 1 2.72 2.347l.66 4.46q.095.638.095 1.282v1.661a3.25 3.25 0 0 1-3.25 3.25h-6.5a3.25 3.25 0 0 1-3.25-3.25v-1.66q0-.645.094-1.283zm2.72-.847a1.25 1.25 0 0 0-1.236 1.067l-.583 3.933h2.484c.538 0 1.015.344 1.185.855l.159.474a.25.25 0 0 0 .237.171h1.558a.25.25 0 0 0 .237-.17l.159-.475a1.25 1.25 0 0 1 1.185-.855h2.484l-.583-3.933a1.25 1.25 0 0 0-1.236-1.067z"
			></path>
		</svg>
	),
	user: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="24" height="24">
			<path
				d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 8a5 5 0 0 0-2 9.58v2.1l-.15.03a11 11 0 0 0-6.94 4.59C9.26 27.59 12.46 29 16 29s6.74-1.41 9.09-3.7a11 11 0 0 0-6.93-4.59l-.16-.03v-2.1a5 5 0 0 0 3-4.35V14a5 5 0 0 0-5-5zm0-6A13 13 0 0 0 5.56 23.75a13.02 13.02 0 0 1 5.54-4.3l.35-.13-.02-.02A7 7 0 0 1 9 14.27L9 14a7 7 0 1 1 11.78 5.12l-.23.2.04.02c2.33.88 4.36 2.41 5.85 4.4A13 13 0 0 0 16 3z"
				fill="#B0B0B0"
			></path>
		</svg>
	),
	userBlack: () => (
		<svg
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "currentcolor", strokeWidth: 2.66667, overflow: "visible" }}
			width="24"
			height="24"
		>
			<g fill="none" stroke="#000000" strokeWidth="2.66667px">
				<circle cx="16" cy="16" r="14" stroke="#000000" fill="none" strokeWidth="2.66667px" />
				<path
					d="m26.46 25.62c-1.58-2.81-4.26-4.9-7.46-5.73v-.72c1.79-1.04 3-2.96 3-5.17 0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.14 3 5.17v.72c-3.16.82-5.83 2.87-7.42 5.64"
					stroke="#000000"
					fill="none"
					strokeWidth="2.66667px"
				/>
			</g>
		</svg>
	),
	category: (props?: IconProps) => (
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
				stroke="#B0B0B0"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
				stroke="#B0B0B0"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
				stroke="#B0B0B0"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
				stroke="#B0B0B0"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	categoryBlack: (props?: IconProps) => (
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
				stroke="#000000"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
				stroke="#000000"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
				stroke="#000000"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
				stroke="#000000"
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	house: (props?: IconProps) => (
		<svg
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			data-testid="icon-mobile-home"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
			width="28"
			height="28"
			{...props}
		>
			<path
				fillRule="evenodd"
				d="m3.614 9.789.386-.3V15a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9.488l.386.3a1 1 0 1 0 1.228-1.578L14.916 3a4.75 4.75 0 0 0-5.832 0L2.386 8.21a1 1 0 0 0 1.228 1.579Zm10.074-5.21a2.75 2.75 0 0 0-3.376 0L5.998 7.934 6 8v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8c0-.022 0-.044.002-.066L13.688 4.58Z"
				clipRule="evenodd"
				fill="black"
			></path>
			<path d="M5 20a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z" fill="black"></path>
		</svg>
	),
	houseWhite: (props?: IconProps) => (
		<svg
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			data-testid="icon-mobile-home"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
			width="28"
			height="28"
			{...props}
		>
			<path
				fillRule="evenodd"
				d="m3.614 9.789.386-.3V15a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9.488l.386.3a1 1 0 1 0 1.228-1.578L14.916 3a4.75 4.75 0 0 0-5.832 0L2.386 8.21a1 1 0 0 0 1.228 1.579Zm10.074-5.21a2.75 2.75 0 0 0-3.376 0L5.998 7.934 6 8v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8c0-.022 0-.044.002-.066L13.688 4.58Z"
				clipRule="evenodd"
				fill="white"
			></path>
			<path d="M5 20a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z" fill="white"></path>
		</svg>
	),
	bad: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			aria-label="Rule did not pass"
			role="img"
			focusable="false"
			style={{
				display: "block",
				height: "10px",
				width: "10px",
				fill: "currentcolor",
			}}
			width="16"
			height="16"
		>
			<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3 4L8 7 5 4 4 5l3 3-3 3 1 1 3-3 3 3 1-1-3-3 3-3-1-1z" fill="#C13515"></path>
		</svg>
	),
	good: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			aria-label="Rule passed"
			role="img"
			focusable="false"
			style={{
				display: "block",
				height: "10px",
				width: "10px",
				fill: "currentcolor",
			}}
			width="16"
			height="16"
		>
			<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.16 4.87L6.67 9.36 4.42 7.1 3.29 8.23l3.38 3.38L12.29 6z" fill="#008A05"></path>
		</svg>
	),
	alert: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				height: "16px",
				width: "16px",
				fill: "white",
			}}
		>
			<path d="M8 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM9.6 0v9.6H6.4V0z"></path>
		</svg>
	),
	error: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			aria-label="Error"
			role="img"
			focusable="false"
			style={{
				display: "block",
				height: "12px",
				width: "12px",
				fill: "currentcolor",
			}}
			width="12"
			height="12"
		>
			<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z" fill="#C13515"></path>
		</svg>
	),
	plus: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				fill: "none",
				height: "12px",
				width: "12px",
				stroke: "currentcolor",
				strokeWidth: "5.33333",
				overflow: "visible",
			}}
			width="32"
			height="32"
		>
			<path d="M2 16h28M16 2v28" stroke="#717171" fill="none" strokeWidth="5.33333px"></path>
		</svg>
	),
	plusDisabled: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				fill: "none",
				height: "12px",
				width: "12px",
				stroke: "currentcolor",
				strokeWidth: "5.33333",
				overflow: "visible",
			}}
			width="32"
			height="32"
		>
			<path d="M2 16h28M16 2v28" stroke="#EBEBEB" fill="none" strokeWidth="5.33333px"></path>
		</svg>
	),
	minus: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				fill: "none",
				height: "12px",
				width: "12px",
				stroke: "currentcolor",
				strokeWidth: "5.33333",
				overflow: "visible",
			}}
			width="32"
			height="32"
		>
			<path d="M2 16h28" stroke="#717171" fill="none" strokeWidth="5.33333px"></path>
		</svg>
	),
	minusDisabled: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{
				display: "block",
				fill: "none",
				height: "12px",
				width: "12px",
				stroke: "currentcolor",
				strokeWidth: "5.33333",
				overflow: "visible",
			}}
			width="32"
			height="32"
		>
			<path d="M2 16h28" stroke="#EBEBEB" fill="none" strokeWidth="5.33333px"></path>
		</svg>
	),
	explore: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="24" height="24">
			<path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" stroke="#B0B0B0" strokeWidth="4px"></path>
		</svg>
	),
	exploreBlack: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="24" height="24">
			<path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" stroke="#000000" strokeWidth="4px"></path>
		</svg>
	),
	wishlists: (props?: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			width="24"
			height="24"
			{...props}
		>
			<path
				d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
				stroke="#B0B0B0"
				fill="none"
				strokeWidth="2.66667px"
			></path>
		</svg>
	),
	wishlistsBlack: (props?: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			width="24"
			height="24"
			{...props}
		>
			<path
				d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
				stroke="#000000"
				fill="none"
				strokeWidth="2.66667px"
			></path>
		</svg>
	),
	wish: () => (
		<svg
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{ display: "block", fill: "rgba(0, 0, 0, 0.5)", height: "32px", width: "32px", strokeWidth: 2, overflow: "visible" }}
			width="32"
			height="32"
		>
			<path
				d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
				stroke="#FFFFFF"
				fillOpacity="0.5"
				fill="#000000"
				strokeWidth="2px"
			/>
		</svg>
	),
	heartFilled: () => (
		<svg
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			aria-hidden="true"
			role="presentation"
			focusable="false"
			style={{ display: "block", fill: "red", height: "32px", width: "32px", strokeWidth: 2, overflow: "visible" }}
			width="32"
			height="32"
		>
			<path
				d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
				stroke="#FFFFFF"
				fillOpacity="0.5"
				fill="red"
				strokeWidth="2px"
			/>
		</svg>
	),
	inbox: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="24" height="24">
			<path
				d="M26 2a5 5 0 0 1 5 4.78V21a5 5 0 0 1-4.78 5h-6.06L16 31.08 11.84 26H6a5 5 0 0 1-4.98-4.56L1 21.22V7a5 5 0 0 1 4.78-5H6zm0 2H6a3 3 0 0 0-3 2.82V21a3 3 0 0 0 2.82 3H12.8l3.2 3.92L19.2 24H26a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3z"
				fill="#B0B0B0"
			></path>
		</svg>
	),
};
