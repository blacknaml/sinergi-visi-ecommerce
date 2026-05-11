<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;

class McpController extends Controller
{
    public function products()
    {
        return response()->json(Product::with(['category', 'images'])->get());
    }

    public function orders()
    {
        return response()->json(Order::with(['user', 'items.product', 'address', 'claim', 'histories'])->get());
    }

    public function orderByNumber($orderNumber)
    {
        $order = Order::with(['user', 'items.product', 'address', 'claim', 'histories'])
            ->where('order_number', $orderNumber)
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Pesanan tidak ditemukan'], 404);
        }

        return response()->json($order);
    }
}
