<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $kitchenware = Category::where('name', 'Kitchenware')->first();
        $glassware = Category::where('name', 'Glassware')->first();
        $ceramicware = Category::where('name', 'Ceramicware')->first();

        Product::create([
            'name' => 'Stainless Steel Pot',
            'description' => 'Premium stainless steel pot for your kitchen.',
            'price' => 250000,
            'stock' => 50,
            'category_id' => $kitchenware->id,
            'rating' => 4.5,
            'image_path' => 'https://images.unsplash.com/photo-1584990344321-27682ad0f144?auto=format&fit=crop&q=80&w=800'
        ]);

        Product::create([
            'name' => 'Crystal Wine Glass',
            'description' => 'Elegant crystal wine glass for special occasions.',
            'price' => 150000,
            'stock' => 100,
            'category_id' => $glassware->id,
            'rating' => 4.8,
            'image_path' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
        ]);

        Product::create([
            'name' => 'Ceramic Dinner Plate',
            'description' => 'Beautiful ceramic dinner plate with floral patterns.',
            'price' => 85000,
            'stock' => 200,
            'category_id' => $ceramicware->id,
            'rating' => 4.2,
            'image_path' => 'https://images.unsplash.com/photo-1544975054-94678121652f?auto=format&fit=crop&q=80&w=800'
        ]);
    }
}
