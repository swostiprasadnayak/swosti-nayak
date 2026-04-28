"use client";
import React, { useState } from "react";
import { Folder, FileText, LayoutGrid, MonitorPlay, Menu } from "lucide-react";
export default function FinderWindow() {
    const [activeTab, setActiveTab] = useState("Early demos");
    return (
        <div style={{ width: "100%", background: "var(--bg-card)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", height: "400px" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)", gap: "16px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FE5F57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
                </div>
                <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
                    <Menu size={16} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>{activeTab}</span>
                </div>
            </div>
            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                <div style={{ width: "200px", background: "var(--bg-blur)", borderRight: "1px solid var(--border-subtle)", padding: "16px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", padding: "0 8px", marginBottom: "4px", fontWeight: 600 }}>Favourites</div>
                    {["Early demos", "Documents", "Applications"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", border: "none", background: activeTab === tab ? "rgba(0,0,0,0.06)" : "transparent", cursor: "pointer", textAlign: "left", fontSize: "0.85rem", color: activeTab === tab ? "#111" : "rgba(0,0,0,0.6)", fontWeight: activeTab === tab ? 500 : 400 }}
                        >
                            {tab === "Early demos" && <MonitorPlay size={14} color="#3b82f6" />}
                            {tab === "Documents" && <FileText size={14} color="#3b82f6" />}
                            {tab === "Applications" && <LayoutGrid size={14} color="#3b82f6" />}
                            {tab}
                        </button>
                    ))}
                </div>
                <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", gap: "24px", alignContent: "flex-start", flexWrap: "wrap", color: "var(--text-primary)" }}>
                    {activeTab === "Early demos" && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", width: "100px" }}>
                            <div style={{ width: 80, height: 60, background: "var(--bg-secondary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }} />
                            <span style={{ fontSize: "0.75rem", textAlign: "center", lineHeight: 1.2 }}>early demos (double click me).mp4</span>
                        </div>
                    )}
                    {activeTab === "Documents" && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", width: "100px" }}>
                            <Folder size={48} color="#93c5fd" fill="#bfdbfe" strokeWidth={1} />
                            <span style={{ fontSize: "0.75rem", textAlign: "center" }}>untitled folder</span>
                        </div>
                    )}
                    {activeTab === "Applications" && (
                        <>
                            {["Figma", "Slack", "Linear", "ChatGPT"].map(app => (
                                <div key={app} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", width: "80px" }}>
                                    <div style={{ width: 48, height: 48, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px" }} />
                                    <span style={{ fontSize: "0.75rem" }}>{app}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
