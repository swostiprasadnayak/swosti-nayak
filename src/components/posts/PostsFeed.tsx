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
    detailedContent: `
      <h2>The Evolution of Generative Interfaces</h2>
      <p>Design systems were built to scale manual interface creation. They're now content fodder for AI. The perfect worker for parsing components, outlining specs, and shuffling identical boxes around. One that doesn't complain about the boring parts of it all.</p>
      <img src="/jckkcfj.webp" alt="Interface concept" style="width: 100%; border-radius: 12px; margin: 24px 0;" />
      <p>Now it's starting to kill them off. Imagine building yet another form that looks like all the other forms. This is as refreshing as competitive clicking accept on cookie banners.</p>
      <p>You can generate a design system using AI, build a complex dashboard and then realize nobody really needs it anymore. AI ate its own tail when it comes to generative user interfaces.</p>
      <h3>The End of the Static Grid</h3>
      <p>We're moving towards a world where interfaces are as fluid as the data they represent. No more fixed layouts, just intent-driven generation.</p>
      <p>Imagine a future where the interface is generated in real-time based on your specific context. Not just the data, but the very controls and layouts themselves. This is the goal of the Antigravity project.</p>
      <p>By leveraging large multimodal models, we can translate user intent directly into functional UI patterns. This reduces the friction between thought and action, allowing for a more creative and productive experience.</p>
    `
  },
  {
    id: "2",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "3 w",
    content: "When designing the new interaction models, we focused heavily on reducing cognitive load. The result is an interface that anticipates your needs.",
    mediaUrl: "/jckkcfj.webp",
    detailedContent: "<h3>Focusing on Cognitive Load</h3><p>Detailed analysis of how users perceive complex data visualizations in real-time environments.</p>"
  },
  {
    id: "3",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "4 w",
    content: "Exploring the intersection of spatial computing and generative AI. How can we make these complex tools feel as natural as drawing on paper?",
    mediaUrl: "/jckkcfj.webp",
    detailedContent: "<h3>Spatial Computing & AI</h3><p>Bridging the gap between 2D interfaces and 3D immersive workspaces.</p>"
  },
  {
    id: "4",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "5 w",
    content: "The future of interfaces is not just about looking good, it's about behaving intelligently. Proud to share some progress on the Antigravity project.",
    mediaUrl: "/jckkcfj.webp",
    detailedContent: "<h3>Intelligent Behavior</h3><p>Moving beyond aesthetic polish to functional intelligence in UI components.</p>"
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
        {/* INNER CONTAINER: Shifted 70px left */}
        <div style={{ 
          width: "100%", 
          padding: "40px 0", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          transform: "translateX(-70px)"
        }}>
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
            
            {/* SCROLLABLE WRAPPER: Now the whole card scrolls with its content */}
            <div style={{ 
              position: "absolute", 
              top: "-5vh", 
              left: "-12%", 
              width: "82vw", 
              height: "100vh", 
              zIndex: 101, 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              overflowY: "auto", // SCROLLING HAPPENS HERE
              paddingTop: "10vh",
              paddingBottom: "10vh",
              pointerEvents: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
            onClick={(e) => {
               if(e.target === e.currentTarget) setExpandedId(null);
            }}
            >
              <Squircle 
                cornerRadius={32} 
                style={{ 
                  background: "#FBFBFB", 
                  width: "95%", 
                  maxWidth: "850px", 
                  height: "auto", // CARD GROWS WITH CONTENT
                  padding: "40px", 
                  pointerEvents: "auto", 
                  boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
                  transform: "translate(50px, 0)",
                  marginBottom: "40px"
                }}
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    {/* Header */}
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

                    {/* Media */}
                    <motion.div 
                      layoutId={`post-media-${post.id}`} 
                      style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", marginBottom: "24px", background: "#f0f0f0" }}
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

                    {/* Actions */}
                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#1c2b33" }}>
                          <img src="/icons/Vector.png" alt="like" style={{ width: 24, height: 24 }} /> 119 likes
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 500, color: "#5c6770" }}>
                          <img src="/icons/Container.png" alt="share" style={{ width: 24, height: 24 }} /> Share
                        </div>
                      </div>
                      <p style={{ fontSize: "1.1rem", color: "#1c2b33", lineHeight: 1.7, marginBottom: "40px" }}>
                        <span style={{ fontWeight: 700 }}>{post.author}</span> 
                        <img src="/icons/SVG.png" alt="verified" style={{ width: 14, height: 14, margin: "0 8px", display: "inline-block" }} />
                        {post.content}
                      </p>
                    </motion.div>

                    {/* EXTENDED MEDIUM-STYLE CONTENT */}
                    <div 
                      className="post-content-rich"
                      style={{ 
                        color: "#1c2b33", 
                        fontSize: "1.1rem", 
                        lineHeight: 1.8, 
                        borderTop: "1px solid #f0f0f0", 
                        paddingTop: "40px",
                        fontFamily: "Inter, sans-serif"
                      }}
                      dangerouslySetInnerHTML={{ __html: post.detailedContent }}
                    />

                  </motion.div>
                ))}
              </Squircle>
            </div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .post-content-rich h2 { font-size: 1.8rem; font-weight: 700; margin: 32px 0 16px; }
        .post-content-rich h3 { font-size: 1.4rem; font-weight: 600; margin: 24px 0 12px; }
        .post-content-rich p { margin-bottom: 24px; color: #333; }
      `}</style>

    </div>
  );
}
