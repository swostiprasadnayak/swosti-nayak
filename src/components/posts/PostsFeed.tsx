"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Squircle } from "corner-smoothing";
import { Maximize2, Minimize2, Send } from "lucide-react";

// Post icons as inline SVG (were low-res PNGs with baked-in backgrounds):
// crisp at any size and themed via the --posts-* tokens.
const HeartIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      fill="#ff3040" stroke="#ff3040" strokeWidth="1" strokeLinejoin="round"
    />
  </svg>
);
const ShareIcon = ({ size }: { size: number }) => (
  <Send size={size} strokeWidth={2} color="var(--posts-share)" aria-hidden="true" />
);
const VerifiedBadge = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Verified" style={{ flexShrink: 0, ...style }}>
    <path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      fill="#0095f6"
    />
    <path d="m9 12 2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
      
      <img src="/images/posts/post-2.jpg" alt="Analog Intentions" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      
      <p>Now it's starting to kill them off. Imagine building yet another form that looks like all the other forms. This is as refreshing as competitive clicking accept on cookie banners.</p>
      
      <img src="/images/posts/post-3.jpg" alt="Spatial Gadget Prototype" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      
      <p>You can generate a design system using AI, build a complex dashboard and then realize nobody really needs it anymore. AI ate its own tail when it comes to generative user interfaces.</p>
      
      <h3>The End of the Static Grid</h3>
      <p>We're moving towards a world where interfaces are as fluid as the data they represent. No more fixed layouts, just intent-driven generation.</p>
      
      <img src="/images/posts/post-4.jpg" alt="Design System Breakdown" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      
      <p>By leveraging large multimodal models, we can translate user intent directly into functional UI patterns. This reduces the friction between thought and action, allowing for a more creative and productive experience.</p>
      <div style="height: 60px;"></div>
    `
  },
  {
    id: "2",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "3 w",
    content: "Exploring the beauty of physical tactile interactions. How can we bring the satisfying 'click' of an analog calendar into the digital realm?",
    mediaUrl: "/images/posts/post-2.jpg",
    detailedContent: `
      <h2>Tactile Analogies in Digital Space</h2>
      <p>There is a specific joy in physical objects—the weight, the resistance, and the definitive state of a mechanical switch. As we move deeper into glass-slab interfaces, we risk losing this grounding connection.</p>
      <img src="/images/posts/post-2.jpg" alt="Analog Calendar" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      <p>Our research focuses on haptic feedback loops that simulate these physical constraints. When you scroll through a list in Antigravity, the friction is modeled after real-world physics, making the digital feel tangible.</p>
    `
  },
  {
    id: "3",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "4 w",
    content: "Latest hardware prototype for our spatial computing agent. A dedicated physical node for ambient intelligence.",
    mediaUrl: "/images/posts/post-3.jpg",
    detailedContent: `
      <h2>Ambient Intelligence: Beyond the Screen</h2>
      <p>The screen shouldn't be the only way we interact with AI. This prototype explores a dedicated physical form for our design agent—a device that lives on your desk and communicates through light, sound, and subtle motion.</p>
      <img src="/images/posts/post-3.jpg" alt="Spatial Gadget" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      <p>This 'spatial node' acts as a bridge between your physical environment and your digital workspace. It can sense your presence, adjust your lighting, and even 'whisper' design suggestions as you work.</p>
    `
  },
  {
    id: "4",
    author: "Swosti",
    avatar: "/avatar.jpg",
    location: "New Delhi, India",
    time: "5 w",
    content: "Breaking down the mechanics of our new design system. Every component is now a living entity with its own behavioral logic.",
    mediaUrl: "/images/posts/post-4.jpg",
    detailedContent: `
      <h2>Deconstructing the Design System</h2>
      <p>Traditional design systems are static libraries of assets. Our new approach treats components as living organisms. They don't just have styles; they have behaviors, states, and contextual awareness.</p>
      <img src="/images/posts/post-4.jpg" alt="System Breakdown" style="width: 100%; border-radius: 16px; margin: 32px 0;" />
      <p>By breaking down the DNA of a component—its material properties, transparency, and interaction logic—we can generate infinite variations that remain consistent with the core brand identity.</p>
    `
  }
];

export default function PostsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    // ROOT: Padded to push the grey box from top and left
    <div className="posts-feed-root" style={{ position: "relative", overflow: "hidden" }}>
      
      {/* THE GREY BOX (Island) */}
      <Squircle 
        cornerRadius={28} 
        style={{ 
          width: "100%", 
          height: "100%", 
          background: "var(--posts-island)", 
          overflowY: "auto", 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          boxShadow: "inset 0 0 0 1px var(--posts-island-edge)"
        }}
      >
        {/* INNER CONTAINER: Shifted 70px left on desktop */}
        <div className="posts-inner-container">
          <div style={{ width: "90%", maxWidth: "680px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {POSTS.map((post) => (
              <Squircle
                key={post.id}
                cornerRadius={24}
                style={{ background: "var(--posts-card)", padding: "20px 20px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", cursor: "pointer" }}
                onClick={() => setExpandedId(post.id)}
              >
                <motion.div layoutId={`post-container-${post.id}`}>
                  
                  {/* Post Header */}
                  <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ccc", overflow: "hidden", position: "relative" }}>
                       <Image src={post.avatar} alt={post.author} fill sizes="36px" style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--posts-text)", display: "flex", alignItems: "center", gap: "4px" }}>
                        {post.author} 
                        <VerifiedBadge size={14} /> 
                        <span style={{ color: "var(--posts-muted)", fontWeight: 400, fontSize: "0.8rem" }}>• {post.time}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--posts-muted)", fontWeight: 500 }}>{post.location}</div>
                    </div>
                  </motion.div>

                  {/* Post Media: 4/3 aspect ratio */}
                  <motion.div layoutId={`post-media-${post.id}`} style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", marginBottom: "14px", background: "var(--posts-media)" }}>
                    <Image src={post.mediaUrl} alt="Post media" fill sizes="(max-width: 768px) 90vw, 400px" loading="lazy" style={{ objectFit: "cover" }} />
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
                      <Maximize2 size={18} strokeWidth={2.25} color="#1c2b33" aria-label="Expand" />
                    </div>
                  </motion.div>

                  {/* Post Actions & Content */}
                  <motion.div layoutId={`post-footer-${post.id}`}>
                    <div style={{ display: "flex", gap: "20px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 500, color: "var(--posts-text)" }}>
                        <HeartIcon size={22} /> 119 likes
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 500, color: "var(--posts-share)" }}>
                        <ShareIcon size={20} /> Share
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--posts-text)", lineHeight: 1.6, margin: 0 }}>
                      <span style={{ fontWeight: 600 }}>{post.author}</span> 
                      <VerifiedBadge size={13} style={{ margin: "0 6px", display: "inline-block", verticalAlign: "-2px" }} />
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
              className="posts-expanded-backdrop"
              onClick={() => setExpandedId(null)}
            />
            
            {/* SCROLLABLE WRAPPER */}
            <div 
              className="posts-expanded-wrapper"
              onClick={(e) => {
                 if(e.target === e.currentTarget) setExpandedId(null);
              }}
            >
              <Squircle 
                cornerRadius={32} 
                className="posts-expanded-card"
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    {/* Header */}
                    <motion.div layoutId={`post-header-${post.id}`} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ccc", overflow: "hidden", position: "relative" }}>
                        <Image src={post.avatar} alt={post.author} fill sizes="48px" style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--posts-text)", display: "flex", alignItems: "center", gap: "6px" }}>
                          {post.author} 
                          <VerifiedBadge size={16} />
                          <span style={{ color: "var(--posts-muted)", fontWeight: 400, fontSize: "0.9rem" }}>• {post.time}</span>
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "var(--posts-muted)", fontWeight: 500 }}>{post.location}</div>
                      </div>
                    </motion.div>

                    {/* Media */}
                    <motion.div 
                      layoutId={`post-media-${post.id}`} 
                      style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", marginBottom: "24px", background: "var(--posts-media)" }}
                    >
                      <Image src={post.mediaUrl} alt="Post media" fill sizes="(max-width: 768px) 90vw, 700px" loading="lazy" style={{ objectFit: "cover" }} />
                      <button 
                        aria-label="Minimise"
                        onClick={() => setExpandedId(null)}
                        style={{ 
                          position: "absolute", 
                          bottom: "16px", 
                          right: "16px", 
                          background: "rgba(231, 231, 231, 0.7)", 
                          border: "none", 
                          padding: "12px", 
                          borderRadius: "12px", 
                          color: "var(--posts-text)", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          cursor: "pointer",
                          backdropFilter: "blur(5.3px)"
                        }}
                      >
                        <Minimize2 size={20} strokeWidth={2.25} color="#1c2b33" aria-hidden="true" />
                      </button>
                    </motion.div>

                    {/* Actions */}
                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "var(--posts-text)" }}>
                          <HeartIcon size={24} /> 119 likes
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 500, color: "var(--posts-share)" }}>
                          <ShareIcon size={22} /> Share
                        </div>
                      </div>
                      <p style={{ fontSize: "1.1rem", color: "var(--posts-text)", lineHeight: 1.7, marginBottom: "40px" }}>
                        <span style={{ fontWeight: 700 }}>{post.author}</span> 
                        <VerifiedBadge size={15} style={{ margin: "0 8px", display: "inline-block", verticalAlign: "-2px" }} />
                        {post.content}
                      </p>
                    </motion.div>

                    {/* EXTENDED MEDIUM-STYLE CONTENT */}
                    <div 
                      className="post-content-rich"
                      style={{ 
                        color: "var(--posts-text)", 
                        fontSize: "1.1rem", 
                        lineHeight: 1.8, 
                        borderTop: "1px solid var(--posts-rule)", 
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
        .post-content-rich p { margin-bottom: 24px; color: var(--posts-rich-text); }
        /* Hard width caps so nothing in the rich body can push the panel
           wider than its column (was overflowing on small phones). */
        .post-content-rich { max-width: 100%; word-wrap: break-word; overflow-wrap: anywhere; }
        .post-content-rich img,
        .post-content-rich video,
        .post-content-rich iframe,
        .post-content-rich svg,
        .post-content-rich canvas { max-width: 100%; height: auto; display: block; }
        .post-content-rich pre,
        .post-content-rich code { max-width: 100%; white-space: pre-wrap; word-break: break-word; }
        .post-content-rich table { max-width: 100%; display: block; overflow-x: auto; }
      `}</style>

    </div>
  );
}
