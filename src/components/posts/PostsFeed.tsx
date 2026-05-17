"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Squircle } from "corner-smoothing";
import classes from "./postsFeed.module.css";

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
    <div className={classes.root}>
      
      {/* THE GREY BOX (Island) */}
      <Squircle cornerRadius={48} className={classes.island}>
        
        {/* INNER CONTAINER: Centered feed without manual translation */}
        <div className={classes.feedContainer}>
          <div className={classes.postList}>
            {POSTS.map((post) => (
              <Squircle
                key={post.id}
                cornerRadius={24}
                className={classes.postCard}
                onClick={() => setExpandedId(post.id)}
              >
                <motion.div layoutId={`post-container-${post.id}`}>
                  
                  {/* Post Header */}
                  <motion.div layoutId={`post-header-${post.id}`} className={classes.postHeader}>
                    <div className={classes.avatar}>
                       <img src={post.avatar} alt={post.author} />
                    </div>
                    <div className={classes.authorInfo}>
                      <div className={classes.authorName}>
                        {post.author} 
                        <img src="/icons/SVG.png" alt="verified" className={classes.verifiedIcon} /> 
                        <span className={classes.postTime}>• {post.time}</span>
                      </div>
                      <div className={classes.postLocation}>{post.location}</div>
                    </div>
                  </motion.div>

                  {/* Post Media: 4/3 aspect ratio */}
                  <motion.div layoutId={`post-media-${post.id}`} className={classes.postMedia}>
                    <img src={post.mediaUrl} alt="Post media" />
                    <div className={classes.expandBtn}>
                      <img src="/icons/Frame 1932992809.png" alt="expand" />
                    </div>
                  </motion.div>

                  {/* Post Actions & Content */}
                  <motion.div layoutId={`post-footer-${post.id}`}>
                    <div className={classes.postActions}>
                      <div className={`${classes.actionItem} ${classes.like}`}>
                        <img src="/icons/Vector.png" alt="like" className={classes.actionIcon} /> 119 likes
                      </div>
                      <div className={`${classes.actionItem} ${classes.share}`}>
                        <img src="/icons/Container.png" alt="share" className={classes.actionIcon} /> Share
                      </div>
                    </div>
                    <p className={classes.postText}>
                      <span>{post.author}</span> 
                      <img src="/icons/SVG.png" alt="verified" className={classes.verifiedIcon} style={{ margin: "0 6px", display: "inline-block" }} />
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
              className={classes.expandedBackdrop}
              onClick={() => setExpandedId(null)}
            />
            
            {/* SCROLLABLE WRAPPER */}
            <div 
              className={classes.expandedScrollWrapper}
              onClick={(e) => {
                 if(e.target === e.currentTarget) setExpandedId(null);
              }}
            >
              <Squircle 
                cornerRadius={32} 
                className={classes.expandedCard}
              >
                {POSTS.filter(p => p.id === expandedId).map(post => (
                  <motion.div key="expanded" layoutId={`post-container-${post.id}`}>
                    
                    {/* Header */}
                    <motion.div layoutId={`post-header-${post.id}`} className={classes.postHeader} style={{ marginBottom: "24px" }}>
                      <div className={classes.avatar} style={{ width: 48, height: 48 }}>
                        <img src={post.avatar} alt={post.author} />
                      </div>
                      <div className={classes.authorInfo}>
                        <div className={classes.authorName} style={{ fontSize: "1.05rem" }}>
                          {post.author} 
                          <img src="/icons/SVG.png" alt="verified" className={classes.verifiedIcon} style={{ width: 16, height: 16 }} />
                          <span className={classes.postTime} style={{ fontSize: "0.9rem" }}>• {post.time}</span>
                        </div>
                        <div className={classes.postLocation} style={{ fontSize: "0.9rem" }}>{post.location}</div>
                      </div>
                    </motion.div>

                    {/* Media */}
                    <motion.div 
                      layoutId={`post-media-${post.id}`} 
                      className={classes.expandedMedia}
                    >
                      <img src={post.mediaUrl} alt="Post media" />
                      <button 
                        onClick={() => setExpandedId(null)}
                        className={classes.minimizeBtn}
                      >
                        <img src="/icons/Frame 1932992809.png" alt="minimize" />
                      </button>
                    </motion.div>

                    {/* Actions */}
                    <motion.div layoutId={`post-footer-${post.id}`}>
                      <div className={classes.postActions} style={{ marginBottom: "20px" }}>
                        <div className={`${classes.actionItem} ${classes.like}`} style={{ fontSize: "1rem" }}>
                          <img src="/icons/Vector.png" alt="like" className={classes.actionIcon} style={{ width: 24, height: 24 }} /> 119 likes
                        </div>
                        <div className={`${classes.actionItem} ${classes.share}`} style={{ fontSize: "1rem" }}>
                          <img src="/icons/Container.png" alt="share" className={classes.actionIcon} style={{ width: 24, height: 24 }} /> Share
                        </div>
                      </div>
                      <p className={classes.postText} style={{ fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "40px" }}>
                        <span style={{ fontWeight: 700 }}>{post.author}</span> 
                        <img src="/icons/SVG.png" alt="verified" className={classes.verifiedIcon} style={{ margin: "0 8px", display: "inline-block" }} />
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
