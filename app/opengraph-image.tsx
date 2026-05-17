import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#020617",
          color: "white",
          padding: "72px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 900,
              fontSize: 36,
              lineHeight: 1.25,
              color: "#cbd5e1",
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          {siteConfig.url}
        </div>
      </div>
    ),
    size
  );
}