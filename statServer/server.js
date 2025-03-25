const express = require("express");
const si = require("systeminformation");
const cors = require("cors"); 

const app = express();
app.use(cors());

app.get("/stats", async (req, res) => {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const net = await si.networkStats();
        const disk = await si.fsSize();

        res.json({
            cpuLoad: cpu.currentLoad.toFixed(2) + "%",
            freeMem: (mem.available / 1024 / 1024).toFixed(2) + " MB",
            totalMem: (mem.total / 1024 / 1024).toFixed(2) + " MB",
            network: net,
            storage: disk.map(d => ({
                mount: d.mount,
                free: (d.available / 1024 / 1024 / 1024).toFixed(2) + " GB",
                total: (d.size / 1024 / 1024 / 1024).toFixed(2) + " GB",
            }))
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to get system stats" });
    }
});

const PORT = 3001; // in dev mode next runs on port 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
