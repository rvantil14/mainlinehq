import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mainline HQ | AI Automation for Trade Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111111",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "40px",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "2px",
              fontStyle: "italic",
            }}
          >
            MAIN
          </span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#FFFFFF",
              background: "#E8630A",
              padding: "4px 10px",
              borderRadius: "4px",
              letterSpacing: "2px",
            }}
          >
            HQ
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "2px",
              fontStyle: "italic",
            }}
          >
            LINE
          </span>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          AI Automation for{" "}
          <span style={{ color: "#E8630A" }}>Trade Businesses</span>
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#9CA3AF",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          We answer your phone, book your jobs, send your invoices, and follow up
          with every customer. 24/7.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            padding: "14px 32px",
            background: "#E8630A",
            borderRadius: "8px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            mainlinehq.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
