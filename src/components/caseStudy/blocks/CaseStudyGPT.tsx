"use client";
import React, { useState } from "react";
import { MessageSquare, Cpu, Menu } from "lucide-react";
export default function CaseStudyGPT() {
    const [activeChat, setActiveChat] = useState("Project inquiries");
    return (
        <div style={{ width: "100%", background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", display: "flex", height: "500px" }}>
            <div style={{ width: "240px", background: "#f9f9f9", padding: "20px 12px", borderRight: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "24px", padding: "0 8px" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center" }}><Menu size={16} /></div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center" }}><MessageSquare size={16} /></div>
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.4)", fontWeight: 600, padding: "0 8px", marginBottom: "8px" }}>Today</div>
                {["Project inquiries", "Pancake recipe"].map(chat => (
                    <button
                        key={chat} onClick={() => setActiveChat(chat)}
                        style={{ padding: "10px 12px", borderRadius: "8px", border: "none", background: activeChat === chat ? "#fff" : "transparent", boxShadow: activeChat === chat ? "0 2px 5px rgba(0,0,0,0.02)" : "none", textAlign: "left", fontSize: "0.85rem", fontWeight: activeChat === chat ? 500 : 400, color: "#111", cursor: "pointer" }}
                    >
                        {chat}
                    </button>
                ))}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>SwostiGPT 5.5</span>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#111" }} />
                </div>
                <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
                    {activeChat === "Project inquiries" ? (
                        <>
                            <div style={{ alignSelf: "flex-end", background: "#f0f0f0", padding: "12px 16px", borderRadius: "16px 16px 0 16px", maxWidth: "70%", fontSize: "0.9rem" }}>What were your learnings from this project?</div>
                            <div style={{ alignSelf: "flex-start", display: "flex", gap: "12px", maxWidth: "80%" }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#10a37f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}><Cpu size={14} /></div>
                                <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(0,0,0,0.8)" }}>1) This project challenged my skills in designing humane and effective interfaces.<br /><br />2) I got the opportunity to enhance my programming abilities and better understand tradeoffs.</div>
                            </div>
                        </>
                    ) : (
                        <div style={{ alignSelf: "flex-end", background: "#f0f0f0", padding: "12px 16px", borderRadius: "16px 16px 0 16px", maxWidth: "70%", fontSize: "0.9rem" }}>Can you give me a recipe for Norwegian pancakes?</div>
                    )}
                </div>
            </div>
        </div>
    );
}
