type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    personalInfo: (props?: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="32" height="32" {...props}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 2H3v18h26zm-3 12v2h-8v-2zm-16-8a3 3 0 0 1 2.5 4.67A5 5 0 0 1 15 20h-2a3 3 0 0 0-2-2.83V14a1 1 0 0 0-2-.12v3.29A3 3 0 0 0 7 20H5a5 5 0 0 1 2.5-4.33A3 3 0 0 1 10 11zm16 4v2h-8v-2zm0-4v2h-8v-2z" fill="#222222"></path></svg>
    ),
    security: (props?: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="32" height="32" {...props}><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z" fill="#222222"></path></svg>
    ),
    payments: (props?: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="32" height="32" {...props}><path d="M25 4a2 2 0 0 1 2 1.85V8h2.04c1.04 0 1.88.82 1.96 1.85V26c0 1.05-.8 1.92-1.81 2H6.96a1.98 1.98 0 0 1-1.95-1.85L5 26v-2H3a2 2 0 0 1-2-1.85V6a2 2 0 0 1 1.85-2H3zm2 18a2 2 0 0 1-1.85 2H7v2h22V10h-2zM25 6H3v16h22zm-3 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8-8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#222222"></path></svg>
    ),
    globalPreferences: (props?: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="32" height="32" {...props}><path d="M24 31a7 7 0 0 0 0-14H8a7 7 0 0 0 0 14zm5-7a5 5 0 1 1-5-5 5 5 0 0 1 5 5zM3 24a5 5 0 0 1 5-5h11.11a6.98 6.98 0 0 0 0 10H8a5 5 0 0 1-5-5zM24 1H8a7 7 0 0 0 0 14h16a7 7 0 0 0 0-14zM3 8a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm21 5H12.89a6.98 6.98 0 0 0 0-10H24a5 5 0 0 1 0 10z" fill="#222222"></path></svg>
    ),
    notifications: (props?: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" width="32" height="32" {...props}><path d="M30.83 3.73a2 2 0 0 0-2.64-1.02L11.79 10H7a6 6 0 0 0-.26 12H11v7h2v-6.46l15.19 6.75A2 2 0 0 0 31 27.46V4.54a2.02 2.02 0 0 0-.17-.81ZM6.82 20A4 4 0 0 1 7 12h4v8H7.02ZM29 27.46l-16-7.1v-8.71l16-7.11Z" fill="#222222"></path></svg>
    ),
}