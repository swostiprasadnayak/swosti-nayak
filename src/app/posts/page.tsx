"use client";
import { useRouter } from "next/navigation";
import PostsFeed from "@/components/posts/PostsFeed";
import { Squircle } from "corner-smoothing";
import { motion } from "framer-motion";

export default function PostsPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <main style={{ 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "#e2e2e2",
      padding: "20px",
      position: "relative"
    }}>
      {/* Backdrop that closes on click */}
      <div 
        onClick={handleClose}
        style={{ position: "absolute", inset: 0, zIndex: 0, cursor: "pointer" }} 
      />

      {/* The main white window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{ zIndex: 10, width: "100%", maxWidth: "1100px", height: "85vh", pointerEvents: "none" }}
      >
        <Squircle
          cornerRadius={24}
          style={{
            width: "100%",
            height: "100%",
            background: "#fff",
            boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            pointerEvents: "auto"
          }}
        >
          {/* macOS Title bar */}
          <div style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid #f2f2f2", background: "#fff", flexShrink: 0 }}>
            {/* macOS buttons */}
            <div style={{ position: "absolute", left: "16px", display: "flex", gap: "8px" }}>
              <div onClick={handleClose} style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f56", cursor: "pointer" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ffbd2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#27c93f" }} />
            </div>
            {/* Title */}
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>Posts</div>
          </div>

          {/* The content area */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <PostsFeed />
          </div>
        </Squircle>
      </motion.div>
    </main>
  );
}
