"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Squircle } from "corner-smoothing";

const POSTS = [
  {
    id: "1",
    author: "Swosti",
    avatar: "/avatar.jpg", 
    location: "New Delhi, India",
    time: "2 w",
    content: "New text-to-image AI models unlocked powerful ways to overcome user adoption barriers. I combined them with intuitive voice input to let users generate rich materials and virtual environments in real-time. Final features below!",
    mediaUrl: "/jckkcfj.webp", 
  },
  {
    id: "2",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "3 w",
    content: "When designing the new interaction models, we focused heavily on reducing cognitive load. The result is an interface that anticipates your needs.",
    mediaUrl: "/jckkcfj.webp",
  },
  {
    id: "3",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "4 w",
    content: "Exploring the intersection of spatial computing and generative AI. How can we make these complex tools feel as natural as drawing on paper?",
    mediaUrl: "/jckkcfj.webp",
  },
  {
    id: "4",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "5 w",
    content: "The future of interfaces is not just about looking good, it's about behaving intelligently. Proud to share some progress on the Antigravity project.",
    mediaUrl: "/jckkcfj.webp",
  }
];

export default function PostsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    // ROOT: Padded to push the grey box from top and left
    <div style={{ position: "relative", width: "100%", height: "100%", padding: "5vh 0 0 12%", overflow: "hidden" }}>
      
      {/* THE GREY BOX (Island) */}
      <Squircle 
        cornerRadius={48} 
        style={{ 
          width: "100%", 
          height: "100%", 
          background: "#F0F0F0", 
          overflowY: "auto", 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)"
        }}
      >
        {/* INNER CONTAINER: Explicitly centered within the grey box */}
        <div style={{ width: "100%", padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "90%", maxWidth: "580px", display: "flex", flexDirection: "column", gap: "32px" }}>
            {POSTS.map((post) => (
              <Squircle 
                key={post.id} 
                cornerRadius={24} 
                style={{ background: "#FBFBFB", padding: "32px 28px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", cursor: "pointer" }}
                onClick={() => setExpandedId(post.id)}
              >
                <motion.div layoutId={`post-container-${post.id}`}>
                  
                  {/* Post Header */}
                  <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                       <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1c2b33", display: "flex", alignItems: "center", gap: "4px" }}>
                        {post.author} 
                        <img src="/icons/SVG.png" alt="verified" style={{ width: 14, height: 14, objectFit: "contain" }} /> 
                        <span style={{ color: "#8e8e93", fontWeight: 400, fontSize: "0.8rem" }}>• {post.time}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#8e8e93", fontWeight: 500 }}>{post.location}</div>
                    </div>
                  </motion.div>

                  {/* Post Media: 4/3 aspect ratio */}
                  <motion.div layoutId={`post-media-${post.id}`} style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", marginBottom: "20px", background: "#f0f0f0" }}>
                    <img src={post.mediaUrl} alt="Post media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ 
                      position: "absolute", 
                      bottom: "12px", 
                      right: "12px", 
                      background: "rgba(231, 231, 231, 0.7)", 
                      width: "42.39px",
                      height: "42.39px",
                      borderRadius: "7.95px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      backdropFilter: "blur(5.3px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}>
                      <img src="/icons/Frame 1932992809.png" alt="expand" style={{ width: 20, height: 20 }} />
                    </div>
                  </motion.div>

                  {/* Post Actions & Content */}
                  <motion.div layoutId={`post-footer-${post.id}`}>
                    <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 500, color: "#1c2b33" }}>
                        <img src="/icons/Vector.png" alt="like" style={{ width: 22, height: 22 }} /> 119 likes
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 500, color: "#5c6770" }}>
                        <img src="/icons/Container.png" alt="share" style={{ width: 22, height: 22 }} /> Share
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#1c2b33", lineHeight: 1.6, margin: 0 }}>
                      <span style={{ fontWeight: 600 }}>{post.author}</span> 
                      <img src="/icons/SVG.png" alt="verified" style={{ width: 12, height: 12, margin: "0 6px", display: "inline-block" }} />
                      {post.content}
                    </p>
                  </motion.div>

                </motion.div>
              </Squircle>
            ))}
          </div>
        </div>
      </Squircle>

      {/* EXPANDED OVERLAY */}
      <AnimatePresence>
        {expandedId && (
          <>
            {/* Backdrop: Covering the entire window */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              style={{ 
                position: "absolute", 
                top: "-5vh", 
                left: "-12%", 
                width: "113.7vw", 
                height: "100vh", 
                background: "rgba(240, 240, 240, 0.95)", 
                zIndex: 100, 
                backdropFilter: "blur(10px)" 
              }}
              onClick={() => setExpandedId(null)}
            />
            
            {/* Centering Container */}
            <div style={{ 
              position: "absolute", 
              top: "-5vh", 
              left: "-12%", 
              width: "82vw", 
              height: "88vh", 
              zIndex: 101, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              pointerEvents: "none"
            }}>
              <Squircle 
                cornerRadius={32} 
                style={{ 
                  background: "#FBFBFB", 
                  width: "95%", 
                  maxWidth: "850px", 
                  padding: "40px", 
                  pointerEvents: "auto", 
                  boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
                  transform: "translate(40px, 40px)" // Updated to 40px right and 40px down
                }}
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                        <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1c2b33", display: "flex", alignItems: "center", gap: "6px" }}>
                          {post.author} 
                          <img src="/icons/SVG.png" alt="verified" style={{ width: 16, height: 16, objectFit: "contain" }} />
                          <span style={{ color: "#8e8e93", fontWeight: 400, fontSize: "0.9rem" }}>• {post.time}</span>
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#8e8e93", fontWeight: 500 }}>{post.location}</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      layoutId={`post-media-${post.id}`} 
                      style={{ position: "relative", width: "100%", height: "42vh", minHeight: "380px", borderRadius: "16px", overflow: "hidden", marginBottom: "24px", background: "#f0f0f0" }}
                    >
                      <img src={post.mediaUrl} alt="Post media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button 
                        onClick={() => setExpandedId(null)}
                        style={{ 
                          position: "absolute", 
                          bottom: "16px", 
                          right: "16px", 
                          background: "rgba(231, 231, 231, 0.7)", 
                          border: "none", 
                          padding: "12px", 
                          borderRadius: "12px", 
                          color: "#1c2b33", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          cursor: "pointer",
                          backdropFilter: "blur(5.3px)"
                        }}
                      >
                        <img src="/icons/Frame 1932992809.png" alt="minimize" style={{ width: 24, height: 24, transform: "scale(-1, -1)" }} />
                      </button>
                    </motion.div>

                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#1c2b33" }}>
                          <img src="/icons/Vector.png" alt="like" style={{ width: 24, height: 24 }} /> 119 likes
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 500, color: "#5c6770" }}>
                          <img src="/icons/Container.png" alt="share" style={{ width: 24, height: 24 }} /> Share
                        </div>
                      </div>
                      <p style={{ fontSize: "1rem", color: "#1c2b33", lineHeight: 1.7, margin: 0 }}>
                        <span style={{ fontWeight: 700 }}>{post.author}</span> 
                        <img src="/icons/SVG.png" alt="verified" style={{ width: 14, height: 14, margin: "0 8px", display: "inline-block" }} />
                        {post.content}
                      </p>
                    </motion.div>

                  </motion.div>
                ))}
              </Squircle>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
