<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => auth()->user()->orders()->with('items.product')->latest()->get()
        ]);
    }

    public function show($id)
    {
        $order = auth()->user()->orders()->with(['items.product', 'address', 'claim', 'histories'])->findOrFail($id);
        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    public function cancel($id)
    {
        $order = auth()->user()->orders()->findOrFail($id);
        if ($order->status === 'pending') {
            $order->update(['status' => 'cancelled']);
            $order->histories()->create([
                'status' => 'cancelled',
                'notes' => 'Pesanan dibatalkan oleh pembeli.'
            ]);
        }
        return back();
    }
}
