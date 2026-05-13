<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Claim;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Product Management
    public function products()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with(['category', 'images'])->get(),
            'categories' => Category::all()
        ]);
    }

    public function productStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|max:2048',
            'main_image_index' => 'nullable|integer'
        ]);

        $product = Product::create($request->except(['images', 'main_image_index', 'image']));

        if ($request->hasFile('images')) {
            $mainIndex = $request->input('main_image_index', 0);
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path,
                    'is_main' => ($index == $mainIndex)
                ]);

                if ($index == $mainIndex) {
                    $product->update(['image_path' => $path]);
                }
            }
        }

        return back();
    }

    public function productUpdate(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|max:2048',
            'main_image_id' => 'nullable|integer|exists:product_images,id'
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->except(['images', 'main_image_id', 'image']));

        // Add new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path,
                    'is_main' => false // newly uploaded images are not main by default in update
                ]);
            }
        }

        // Set main image
        if ($request->filled('main_image_id')) {
            $product->images()->update(['is_main' => false]);
            $mainImage = $product->images()->findOrFail($request->main_image_id);
            $mainImage->update(['is_main' => true]);
            $product->update(['image_path' => $mainImage->image_path]);
        } else if ($product->images()->count() > 0 && !$product->images()->where('is_main', true)->exists()) {
            // Ensure at least one is main if there are images
            $mainImage = $product->images()->first();
            $mainImage->update(['is_main' => true]);
            $product->update(['image_path' => $mainImage->image_path]);
        }

        return back();
    }

    public function productDestroy($id)
    {
        Product::findOrFail($id)->delete();
        return back();
    }

    public function productImageDestroy($imageId)
    {
        $image = \App\Models\ProductImage::findOrFail($imageId);
        $productId = $image->product_id;
        
        // Remove file
        if (\Illuminate\Support\Facades\Storage::disk('public')->exists($image->image_path)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($image->image_path);
        }
        
        $wasMain = $image->is_main;
        $image->delete();

        // If main image was deleted, set another one as main
        if ($wasMain) {
            $product = Product::find($productId);
            $newMain = \App\Models\ProductImage::where('product_id', $productId)->first();
            if ($newMain) {
                $newMain->update(['is_main' => true]);
                $product->update(['image_path' => $newMain->image_path]);
            } else {
                $product->update(['image_path' => null]);
            }
        }

        return back();
    }

    // User Management
    public function users()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::where('role', 'buyer')->get()
        ]);
    }

    // Reports
    public function reports()
    {
        return Inertia::render('Admin/Reports/Index', [
            'orders' => Order::with('user')->latest()->get(),
            'claims' => Claim::with(['order.user'])->latest()->get()
        ]);
    }

    public function claims()
    {
        return Inertia::render('Admin/Claims/Index', [
            'claims' => Claim::with(['order.user'])->latest()->get()
        ]);
    }

    public function orderShow($id)
    {
        $order = Order::with(['items.product', 'address', 'claim', 'user', 'histories'])->findOrFail($id);
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,shipped,done,cancelled'
        ]);

        $order = Order::findOrFail($id);
        
        if ($order->status !== $request->status) {
            $order->update(['status' => $request->status]);
            $order->histories()->create([
                'status' => $request->status,
                'notes' => 'Status pesanan diperbarui oleh Admin.'
            ]);
        }

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
