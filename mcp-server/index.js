import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';

const server = new Server(
    {
        name: "sinergi-visi-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "get_products",
            description: "Get all products from Sinergi Visi Ecommerce",
            inputSchema: {
                type: "object",
                properties: {},
            },
        },
        {
            name: "get_orders",
            description: "Get all orders from Sinergi Visi Ecommerce (requires admin context)",
            inputSchema: {
                type: "object",
                properties: {},
            },
        }
    ],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "get_products": {
            try {
                const response = await axios.get(`${LARAVEL_API_URL}/mcp/products`);
                return {
                    content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
                };
            } catch (error) {
                return {
                    content: [{ type: "text", text: `Error fetching products: ${error.message}` }],
                    isError: true,
                };
            }
        }
        
        case "get_orders": {
            try {
                const response = await axios.get(`${LARAVEL_API_URL}/mcp/orders`);
                return {
                    content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
                };
            } catch (error) {
                return {
                    content: [{ type: "text", text: `Error fetching orders: ${error.message}` }],
                    isError: true,
                };
            }
        }

        default:
            throw new Error(`Unknown tool: ${request.params.name}`);
    }
});

// Start the server
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);
