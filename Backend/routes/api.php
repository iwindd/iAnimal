<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserManagementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::put('/update-name', [UserController::class, 'updateName']);
    Route::put('/update-password', [UserController::class, 'updatePassword']);
});

Route::resource('animals', AnimalController::class)->middleware('admin:index');
Route::resource('categories', CategoryController::class)->middleware('admin:index');
Route::resource('likes', LikeController::class)->middleware('auth');
Route::resource('users', UserManagementController::class)->middleware('admin');