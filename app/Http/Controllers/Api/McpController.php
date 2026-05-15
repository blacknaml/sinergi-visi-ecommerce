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

    public function storeClaim(Request $request)
    {
        $validated = $request->validate([
            'order_number' => 'required|string|exists:orders,order_number',
            'reason' => 'required|string',
            'type' => 'required|in:refund,claim',
            'status' => 'nullable|string'
        ]);

        $order = Order::where('order_number', $validated['order_number'])->first();

        $claim = $order->claim()->create([
            'reason' => $validated['reason'],
            'type' => $validated['type'],
            'status' => $validated['status'] ?? 'pending'
        ]);

        if ($validated['type'] === 'refund' && ($validated['status'] ?? 'pending') === 'completed') {
            $order->update(['status' => 'refund']);
            $order->histories()->create([
                'status' => 'refund',
                'notes' => 'Status pesanan diubah menjadi refund karena klaim telah selesai.'
            ]);
        }

        return response()->json([
            'message' => 'Klaim berhasil dicatat ke sistem eCommerce.',
            'claim' => $claim
        ], 201);
    }
}
