<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    protected $fillable = [
        'order_id',
        'reason',
        'type',
        'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
