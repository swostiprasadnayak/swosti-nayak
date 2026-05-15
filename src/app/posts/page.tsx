"use client";
import PostsFeed from "@/components/posts/PostsFeed";
import { Squircle } from "corner-smoothing";

export default function PostsPage() {
  return (
    <main style={{ 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "url('https://images.unsplash.com/photo-1506744626753-26c5b0d06626?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat", // A nice placeholder background like the screenshot
      padding: "20px"
    }}>
      {/* The main white window */}
      <Squircle
        cornerRadius={24}
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "85vh",
          background: "#fff",
          boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* macOS Title bar */}
        <div style={{ height: "48px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid #f0f0f0", background: "#fff", flexShrink: 0 }}>
          {/* macOS buttons */}
          <div style={{ position: "absolute", left: "16px", display: "flex", gap: "8px" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#27c93f" }} />
          </div>
          {/* Title */}
          <div style={{ fontSize: "13px", fontWeight: 500, color: "#888" }}>Posts</div>
        </div>

        {/* The content area */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", padding: "32px", background: "#fff" }}>
          <PostsFeed />
        </div>
      </Squircle>
    </main>
  );
}
