import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from 'axios';

/**
 * SINERGI VISI MCP BRIDGE SERVER
 * -----------------------------
 * Bridge server ini menghubungkan Model Context Protocol (MCP) Client 
 * (seperti Claude Desktop) dengan REST API Laravel Sinergi Visi.
 */

// Konfigurasi dari Environment
const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8001/api';
const MCP_TOKEN = process.env.MCP_API_TOKEN || 'e4b649b1a606137102298d589546ef9c3bab1daed5df032a71cffaf0e5e43fc1';

// Setup Axios dengan Default Headers
const api = axios.create({
    baseURL: LARAVEL_API_URL,
    headers: {
        'X-MCP-Token': MCP_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const server = new Server(
    {
        name: "sinergi-visi-mcp-bridge",
        version: "1.1.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Mendefinisikan Tools yang tersedia untuk AI
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "get_products",
            description: "Mengambil daftar semua produk dari katalog Sinergi Visi.",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_orders",
            description: "Mengambil daftar semua pesanan pelanggan (khusus Admin).",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_order_details",
            description: "Mengambil detail pesanan spesifik berdasarkan Nomor Order (misal: ORD-12345ABC).",
            inputSchema: {
                type: "object",
                properties: {
                    order_number: { type: "string", description: "Format: ORD-XXXXXX" }
                },
                required: ["order_number"]
            },
        },
        {
            name: "submit_claim",
            description: "Mendaftarkan klaim kerusakan barang baru ke dalam sistem Ecommerce.",
            inputSchema: {
                type: "object",
                properties: {
                    order_number: { type: "string" },
                    reason: { type: "string", description: "Alasan atau hasil analisis kerusakan" },
                    type: { type: "string", enum: ["claim", "refund"] }
                },
                required: ["order_number", "reason", "type"]
            },
        }
    ],
}));

// Logika penanganan eksekusi Tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "get_products": {
                const response = await api.get('/mcp/products');
                return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
            }
            
            case "get_orders": {
                const response = await api.get('/mcp/orders');
                return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
            }

            case "get_order_details": {
                const response = await api.get(`/mcp/orders/${args.order_number}`);
                return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
            }

            case "submit_claim": {
                const response = await api.post('/mcp/claims', {
                    order_number: args.order_number,
                    reason: args.reason,
                    type: args.type,
                    status: 'pending'
                });
                return { 
                    content: [{ type: "text", text: `Sukses! Klaim berhasil dicatat. ID Klaim: ${response.data.claim.id}` }] 
                };
            }

            default:
                throw new Error(`Tool tidak ditemukan: ${name}`);
        }
    } catch (error) {
        const errorData = error.response?.data || error.message;
        return {
            content: [{ type: "text", text: `Error: ${JSON.stringify(errorData)}` }],
            isError: true,
        };
    }
});

// Menjalankan Server MCP via Standard Input/Output (Stdio)
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);
console.error("Sinergi Visi MCP Bridge Server is running...");
