<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Claim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'seller') {
            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'users' => User::where('role', 'buyer')->count(),
                    'products' => Product::count(),
                    'orders' => Order::count(),
                    'claims' => Claim::count(),
                ],
                'recentOrders' => Order::with('user')->latest()->take(5)->get()
            ]);
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'orders' => $user->orders()->count(),
                'pendingOrders' => $user->orders()->where('status', 'pending')->count(),
                'completedOrders' => $user->orders()->where('status', 'done')->count(),
            ],
            'recentOrders' => $user->orders()->latest()->take(5)->get()
        ]);
    }
}
