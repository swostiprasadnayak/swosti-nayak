"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Heart, Share2 } from "lucide-react";
import { Squircle } from "corner-smoothing";

// Dummy data based on the user's video
const POSTS = [
  {
    id: "1",
    author: "Swosti",
    avatar: "/icon.png", // Updated to use a likely existing icon
    location: "New Delhi, India",
    time: "2 w",
    content: "New text-to-image AI models unlocked powerful ways to overcome user adoption barriers. I combined them with intuitive voice input to let users generate rich materials and virtual environments in real-time. Final features below!",
    mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    author: "Swosti",
    avatar: "/icon.png",
    location: "New Delhi, India",
    time: "2 w",
    content: "Exploring the intersection of cognitive science and interface design. Building tools that feel like an extension of thought.",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  }
];

export default function PostsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#e5e5ea", padding: "40px 20px", overflowY: "auto" }}>
      
      {/* Header */}
      <h2 style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 600, color: "#111", marginBottom: "32px" }}>Posts</h2>

      {/* Post List */}
      <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        {POSTS.map((post) => (
          <Squircle 
            key={post.id} 
            cornerRadius={24} 
            style={{ background: "#fff", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", cursor: "pointer" }}
            onClick={() => setExpandedId(post.id)}
          >
            <motion.div layoutId={`post-container-${post.id}`}>
              
              {/* Post Header */}
              <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                   {/* Fallback avatar if image fails */}
                   <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#111", display: "flex", alignItems: "center", gap: "4px" }}>
                    {post.author} <span style={{ color: "#00adef" }}>✓</span> <span style={{ color: "#888", fontWeight: 400, fontSize: "0.85rem" }}>• {post.time}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#888" }}>{post.location}</div>
                </div>
              </motion.div>

              {/* Post Media */}
              <motion.div layoutId={`post-media-${post.id}`} style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", marginBottom: "16px", background: "#f0f0f0" }}>
                <img src={post.mediaUrl} alt="Post media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.5)", padding: "8px", borderRadius: "8px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Maximize2 size={16} />
                </div>
              </motion.div>

              {/* Post Actions & Content */}
              <motion.div layoutId={`post-footer-${post.id}`}>
                <div style={{ display: "flex", gap: "16px", marginBottom: "12px", color: "#333" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600 }}><Heart size={18} fill="#ff3b30" color="#ff3b30" /> 119 likes</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 500, color: "#666" }}><Share2 size={18} /> Share</div>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600 }}>{post.author}</span> {post.content}
                </p>
              </motion.div>

            </motion.div>
          </Squircle>
        ))}
      </div>

      {/* Expanded Post Overlay */}
      <AnimatePresence>
        {expandedId && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              style={{ position: "fixed", inset: 0, background: "rgba(229, 229, 234, 0.95)", zIndex: 100, backdropFilter: "blur(10px)" }}
              onClick={() => setExpandedId(null)}
            />
            
            {/* Expanded Card */}
            <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <Squircle 
                cornerRadius={32} 
                style={{ background: "#fff", width: "90%", maxWidth: "800px", padding: "32px", pointerEvents: "auto", boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ccc", overflow: "hidden" }}>
                        <img src={post.avatar} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => e.currentTarget.style.display = 'none'} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111", display: "flex", alignItems: "center", gap: "4px" }}>
                          {post.author} <span style={{ color: "#00adef" }}>✓</span> <span style={{ color: "#888", fontWeight: 400, fontSize: "0.9rem" }}>• {post.time}</span>
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
                        style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(0,0,0,0.5)", border: "none", padding: "12px", borderRadius: "12px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        <Minimize2 size={20} />
                      </button>
                    </motion.div>

                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", color: "#333" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", fontWeight: 600 }}><Heart size={20} fill="#ff3b30" color="#ff3b30" /> 119 likes</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", fontWeight: 500, color: "#666" }}><Share2 size={20} /> Share</div>
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
