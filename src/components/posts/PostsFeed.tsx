"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Heart, Share2 } from "lucide-react";
import { Squircle } from "corner-smoothing";

// Dummy data with 4 posts using the Lively image and custom avatar
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
    time: "2 w",
    content: "Exploring the intersection of cognitive science and interface design. Building tools that feel like an extension of thought.",
    mediaUrl: "/jckkcfj.webp",
  },
  {
    id: "3",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "3 w",
    content: "When designing the new interaction models, we focused heavily on reducing cognitive load. The result is an interface that anticipates your needs.",
    mediaUrl: "/jckkcfj.webp",
  },
  {
    id: "4",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "1 mo",
    content: "A deep dive into the architecture of our latest feature set. By leveraging shared layout animations, we created a truly immersive experience.",
    mediaUrl: "/jckkcfj.webp",
  }
];

export default function PostsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
      
      {/* Grey Card Container */}
      <Squircle 
        cornerRadius={32} 
        style={{ 
          width: "100%", 
          maxWidth: "700px", 
          height: "100%", 
          background: "#e5e5ea", 
          padding: "40px 20px", 
          overflowY: "auto",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
        }}
      >
        {/* Post List */}
        <div style={{ maxWidth: "520px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          {POSTS.map((post) => (
            <Squircle 
              key={post.id} 
              cornerRadius={24} 
              style={{ background: "#fff", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", cursor: "pointer" }}
              onClick={() => setExpandedId(post.id)}
            >
              <motion.div layoutId={`post-container-${post.id}`}>
                
                {/* Post Header */}
                <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                     <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#111", display: "flex", alignItems: "center", gap: "4px" }}>
                      {post.author} 
                      <img src="/icons/SVG.png" alt="verified" style={{ width: 14, height: 14, objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<span style="color:#00adef">✓</span>'); }} /> 
                      <span style={{ color: "#888", fontWeight: 400, fontSize: "0.85rem" }}>• {post.time}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>{post.location}</div>
                  </div>
                </motion.div>

                {/* Post Media */}
                <motion.div layoutId={`post-media-${post.id}`} style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", marginBottom: "16px", background: "#f0f0f0" }}>
                  <img src={post.mediaUrl} alt="Post media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.4)", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                    <img src="/icons/Frame 1932992809.png" alt="expand" style={{ width: 16, height: 16 }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>'); }} />
                  </div>
                </motion.div>

                {/* Post Actions & Content */}
                <motion.div layoutId={`post-footer-${post.id}`}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "12px", color: "#333" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600 }}>
                      <img src="/icons/Vector.png" alt="like" style={{ width: 18, height: 18 }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3b30" stroke="#ff3b30" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'); }} /> 119 likes
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 500, color: "#666" }}>
                      <img src="/icons/Container.png" alt="share" style={{ width: 18, height: 18 }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'); }} /> Share
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 600 }}>{post.author}</span> {post.content}
                  </p>
                </motion.div>

              </motion.div>
            </Squircle>
          ))}
        </div>
      </Squircle>

      {/* Expanded Post Overlay */}
      <AnimatePresence>
        {expandedId && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              style={{ position: "fixed", inset: 0, background: "rgba(255, 255, 255, 0.8)", zIndex: 100, backdropFilter: "blur(20px)" }}
              onClick={() => setExpandedId(null)}
            />
            
            {/* Expanded Card */}
            <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <Squircle 
                cornerRadius={32} 
                style={{ background: "#fff", width: "90%", maxWidth: "800px", padding: "32px", pointerEvents: "auto", boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                        <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111", display: "flex", alignItems: "center", gap: "4px" }}>
                          {post.author} 
                          <img src="/icons/SVG.png" alt="verified" style={{ width: 16, height: 16, objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<span style="color:#00adef">✓</span>'); }} />
                          <span style={{ color: "#888", fontWeight: 400, fontSize: "0.9rem" }}>• {post.time}</span>
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#888" }}>{post.location}</div>
                      </div>
                    </motion.div>

                    {/* Media grows massively */}
                    <motion.div 
                      layoutId={`post-media-${post.id}`} 
                      style={{ position: "relative", width: "100%", height: "50vh", borderRadius: "16px", overflow: "hidden", marginBottom: "24px", background: "#f0f0f0" }}
                    >
                      <img src={post.mediaUrl} alt="Post media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button 
                        onClick={() => setExpandedId(null)}
                        style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(0,0,0,0.4)", border: "none", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}
                      >
                        <img src="/icons/Frame 1932992809.png" alt="collapse" style={{ width: 20, height: 20, transform: "scale(-1, -1)" }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>'); }} />
                      </button>
                    </motion.div>

                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", color: "#333" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", fontWeight: 600 }}>
                          <img src="/icons/Vector.png" alt="like" style={{ width: 20, height: 20 }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="20" height="20" viewBox="0 0 24 24" fill="#ff3b30" stroke="#ff3b30" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'); }} /> 119 likes
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", fontWeight: 500, color: "#666" }}>
                          <img src="/icons/Container.png" alt="share" style={{ width: 20, height: 20 }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.insertAdjacentHTML('afterend', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'); }} /> Share
                        </div>
                      </div>
                      <p style={{ fontSize: "1rem", color: "#333", lineHeight: 1.6 }}>
                        <span style={{ fontWeight: 600 }}>{post.author}</span> {post.content}
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
