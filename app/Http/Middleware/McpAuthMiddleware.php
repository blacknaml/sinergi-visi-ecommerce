<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class McpAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-MCP-Token');
        $expectedToken = config('services.mcp.token');

        if (!$token || $token !== $expectedToken) {
            return response()->json([
                'error' => 'Unauthorized. Invalid or missing MCP Token.',
                'message' => 'Please provide a valid X-MCP-Token header.'
            ], 401);
        }

        return $next($request);
    }
}
