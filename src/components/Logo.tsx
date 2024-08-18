import { Link } from "react-router-dom";
import { useTheme } from "@/services/providers/ThemeProvider";

export function Logo({
    height = "32",
    width = "32",
}: {
    height?: string;
    width?: string;
}) {
    const { theme } = useTheme();

    return (
        <svg
            version="1.0"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300.000000 300.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                fill={theme === "dark" ? "#ffffff" : "#000000"}
                stroke="none"
            >
                <path d="M1051 1970 c-29 -13 -37 -5 114 -120 66 -51 126 -97 132 -102 15 -12 258 51 246 63 -5 4 -87 43 -183 85 -182 81 -252 98 -309 74z m157 -49 c94 -32 212 -90 212 -104 0 -13 -60 -37 -91 -37 -12 0 -72 43 -176 127 -24 19 -29 33 -13 33 6 0 37 -9 68 -19z" />{" "}
                <path d="M1975 1893 c-47 -11 -283 -79 -604 -173 -190 -55 -360 -100 -378 -100 -29 0 -47 12 -113 75 -44 42 -88 75 -99 75 -36 0 -51 -12 -51 -39 0 -29 67 -212 97 -263 24 -43 76 -68 137 -68 54 0 230 34 404 78 61 15 112 25 112 22 0 -3 -34 -112 -74 -242 -81 -262 -81 -261 3 -219 65 34 107 89 248 326 l138 231 205 67 c271 89 272 90 268 124 -4 33 -70 87 -126 103 -37 10 -130 12 -167 3z m188 -54 c40 -21 57 -35 57 -51 0 -11 -59 -35 -215 -85 -216 -69 -223 -73 -255 -113 -17 -21 -30 -41 -30 -44 0 -4 -50 -91 -112 -193 -108 -180 -186 -282 -206 -269 -6 4 -2 30 10 68 27 83 77 253 89 302 9 35 7 42 -13 62 l-23 23 -140 -34 c-282 -68 -398 -81 -437 -51 -26 20 -118 221 -118 258 0 23 42 2 85 -43 96 -98 126 -101 350 -34 88 26 167 49 175 51 8 2 67 19 130 37 120 36 299 87 410 118 92 25 190 25 243 -2z" />{" "}
            </g>
        </svg>
    );
}

export function NamedLogoWithLink() {
    const isMobile = window.innerWidth < 768;
    return (
        <Link to="/" className="flex flex-row items-center gap-3">
            <Logo height={isMobile ? "80" : "100"} width={isMobile ? "80" : "100"} />
        </Link>
    );
}
