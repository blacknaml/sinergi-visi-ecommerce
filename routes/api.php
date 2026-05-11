<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\McpController;

use App\Http\Middleware\McpAuthMiddleware;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware([McpAuthMiddleware::class])->group(function () {
    Route::get('/mcp/products', [McpController::class, 'products']);
    Route::get('/mcp/orders', [McpController::class, 'orders']);
    Route::get('/mcp/orders/{orderNumber}', [McpController::class, 'orderByNumber']);
});
