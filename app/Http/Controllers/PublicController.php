<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'products' => Product::with(['category', 'images'])->latest()->take(8)->get(),
            'categories' => Category::all(),
            'canLogin' => true,
            'canRegister' => true,
        ]);
    }

    public function products(Request $request)
    {
        $query = Product::with(['category', 'images']);

        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        if ($request->has('search')) {
            $query->where('name', 'ilike', '%' . $request->search . '%');
        }

        return Inertia::render('Products/Index', [
            'products' => $query->latest()->get(),
            'categories' => Category::all(),
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    public function productDetail($id)
    {
        return Inertia::render('Products/Show', [
            'product' => Product::with(['category', 'images'])->findOrFail($id)
        ]);
    }
}
