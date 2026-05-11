<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'rating',
        'image_path'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    protected $appends = ['main_image'];

    public function getMainImageAttribute()
    {
        $main = $this->images()->where('is_main', true)->first();
        if ($main) {
            return $main->image_path;
        }
        $first = $this->images()->first();
        return $first ? $first->image_path : $this->image_path; // fallback to legacy image_path if no product_images exist
    }
}
