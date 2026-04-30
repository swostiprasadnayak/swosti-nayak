import { useTheme } from "@/app/contexts/ThemeContext";

export default function MusicCard({ player }: any) {
    const { track, progress, isPlaying, togglePlay, nextTrack, prevTrack, seek, currentTime, duration } = player;
    const { isDark } = useTheme();

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const remainingTime = (duration && !isNaN(duration))
        ? `-${formatTime(duration - currentTime)}`
        : "-0:00";

    return (
        <Squircle cornerRadius={24} style={{
            flex: 1, padding: "20px 18px",
            background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.85)",
            border: "none",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            width: "100%", height: "100%", boxSizing: "border-box", minWidth: 0, margin: 0,
            boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.02)",
            transition: "all 0.2s ease"
        }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <Squircle cornerRadius={16} style={{ width: 60, height: 60, background: isDark ? "#333" : "#eee", flexShrink: 0, overflow: "hidden" }}>
                    {track?.thumbnail ? (
                        <img src={track.thumbnail} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: isDark ? "linear-gradient(135deg, #444 0%, #333 100%)" : "linear-gradient(135deg, #eee 0%, #ddd 100%)" }} />
                    )}
                </Squircle>
                <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0,0,0,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.02em" }}>{track?.title || "No Track"}</h4>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0,0,0,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600 }}>{track?.artist || "Unknown Artist"}</p>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "14px" }}>
                <div style={{ position: "relative", flex: 1, height: 6, background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.05)", borderRadius: 10 }}>
                    <div style={{ width: `${progress || 0}%`, height: "100%", background: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0,0,0,0.15)", borderRadius: 10 }} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress || 0}
                        onChange={(e) => seek(parseFloat(e.target.value))}
                        style={{
                            position: "absolute", inset: "-10px 0", width: "100%", cursor: "pointer", appearance: "none", background: "transparent", zIndex: 2
                        }}
                    />
                </div>
                <span style={{ fontSize: "0.9rem", color: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0,0,0,0.45)", fontWeight: 600, minWidth: "38px", textAlign: "right" }}>
                    {remainingTime}
                </span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "14px", color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0,0,0,0.65)" }}>
                <Rewind size={22} fill="currentColor" style={{ cursor: "pointer", opacity: 0.8 }} onClick={prevTrack} />
                <div onClick={togglePlay} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </div>
                <FastForward size={22} fill="currentColor" style={{ cursor: "pointer", opacity: 0.8 }} onClick={nextTrack} />
            </div>
        </Squircle>
    );
}
