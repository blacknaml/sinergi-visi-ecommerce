<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin Account
        User::create([
            'name' => 'Admin SinergiVisi',
            'email' => 'admin@sinergivisi.my.id',
            'password' => Hash::make('password'),
            'role' => 'seller',
        ]);

        // Buyer Account
        User::create([
            'name' => 'Buyer SinergiVisi',
            'email' => 'buyer@sinergivisi.my.id',
            'password' => Hash::make('password'),
            'role' => 'buyer',
        ]);
    }
}
