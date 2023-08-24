<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function updateName(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255']
        ]);

        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->name = $request->input('name');
        $user->save();

        return response()->noContent();
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', Rules\Password::defaults()],
            'new_password' => ['required', 'string', 'min:8', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Auth::user();

        if (!Hash::check($request->input('old_password'), $user->password)) {
            return response()->json(['error' => 'Invalid old password'], 401);
        }

        /** @var \App\Models\User $user **/
        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        return response()->noContent();
    }
}
