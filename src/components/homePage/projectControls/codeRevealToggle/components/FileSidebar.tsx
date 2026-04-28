"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, GitBranch } from "lucide-react";

type TreeNode = { name: string; path: string; type: "file" | "folder"; children: Record<string, TreeNode> };

export default function FileSidebar({ selectedFile, onSelectFile }: any) {
    const [fileList, setFileList] = useState<string[]>([]);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["components", "src/components", "app", "src/app", "src"]));

    useEffect(() => {
        import("@/data/codeDB.json").then((module) => setFileList(Object.keys(module.default)));
    }, []);

    const fileTree = useMemo(() => {
        const root: TreeNode = { name: "root", type: "folder", children: {}, path: "root" };
        fileList.forEach(path => {
            const parts = path.split("/");
            let current = root;
            parts.forEach((part, i) => {
                if (i === parts.length - 1) {
                    current.children[part] = { name: part, type: "file", path: path, children: {} };
                } else {
                    const folderPath = parts.slice(0, i + 1).join("/");
                    if (!current.children[part]) {
                        current.children[part] = { name: part, type: "folder", children: {}, path: folderPath };
                    }
                    current = current.children[part];
                }
            });
        });
        return root;
    }, [fileList]);

    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path); else next.add(path);
            return next;
        });
    };

    const renderTree = (node: TreeNode, level: number = 0) => {
        const isExpanded = expandedFolders.has(node.path);
        const isSelected = selectedFile === node.path;
        const isFolder = node.type === "folder";

        return (
            <div key={node.path} style={{ display: "flex", flexDirection: "column" }}>
                <button
                    onClick={() => isFolder ? toggleFolder(node.path) : onSelectFile(node.path)}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px",
                        paddingLeft: `${level * 16 + 8}px`, border: "none",
                        background: isSelected ? "#f1f5f9" : "transparent",
                        borderRadius: "6px", cursor: "pointer", textAlign: "left", width: "100%",
                        color: isSelected ? "#0f172a" : "#475569", fontSize: "0.95rem",
                    }}
                >
                    {isFolder ? (
                        <>
                            {isExpanded ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#94a3b8" />}
                            {isExpanded ? <FolderOpen size={16} fill="#3b82f6" color="#3b82f6" /> : <Folder size={16} fill="#3b82f6" color="#3b82f6" />}
                        </>
                    ) : (
                        <FileText size={14} color="#cbd5e1" style={{ marginLeft: "22px" }} />
                    )}
                    <span style={{ fontWeight: isFolder ? 500 : 400 }}>{node.name}</span>
                </button>
                {isFolder && isExpanded && Object.values(node.children).map(child => renderTree(child, level + 1))}
            </div>
        );
    };

    return (
        <div style={{ width: "260px", background: "#ffffff", borderRight: "1px solid rgba(0,0,0,0.06)", overflowY: "auto", padding: "20px 16px", flexShrink: 0 }}>
            {/* Root Node Header */}
            <div style={{ marginBottom: "20px" }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px",
                    border: "1px solid rgba(0,0,0,0.08)", borderRadius: "6px", background: "#f8fafc",
                    fontSize: "0.95rem", fontWeight: 600, color: "#334155", cursor: "default"
                }}>
                    <GitBranch size={16} color="#64748b" style={{ transform: "rotate(90deg)" }} />
                    portfolio-site
                </div>
            </div>

            {/* Render internal folders (skipping 'root' wrapper directly to children) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingLeft: "4px" }}>
                {Object.values(fileTree.children).map(child => renderTree(child, 0))}
            </div>
        </div>
    );
}
