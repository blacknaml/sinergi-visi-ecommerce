<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index');
        }

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
            'addresses' => $user->addresses,
            'total' => $cartItems->sum(fn($item) => $item->product->price * $item->quantity)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'payment_method' => 'required|string'
        ]);

        $user = auth()->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index');
        }

        return DB::transaction(function () use ($user, $cartItems, $request) {
            $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'user_id' => $user->id,
                'address_id' => $request->address_id,
                'status' => 'pending',
                'total_price' => $total,
                'payment_method' => $request->payment_method
            ]);

            $order->histories()->create([
                'status' => 'pending',
                'notes' => 'Pesanan berhasil dibuat.'
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ]);
                
                // Reduce stock
                $item->product->decrement('stock', $item->quantity);
            }

            $user->cartItems()->delete();

            return redirect()->route('orders.index')->with('success', 'Pesanan berhasil dibuat.');
        });
    }
}
