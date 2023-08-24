<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Animal;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     */
    public function index()
    {
        $userId = auth()->id();

        $animals = Animal::select('animals.*')
            ->selectSub(function ($query) use ($userId) {
                $query->from('likes')
                    ->whereColumn('animals.id', 'likes.animal_id')
                    ->selectRaw('COUNT(id)');
            }, 'likes')
            ->selectSub(function ($query) use ($userId) {
                $query->from('likes')
                    ->whereColumn('animals.id', 'likes.animal_id')
                    ->where('likes.user_id', $userId)
                    ->select('id');
            }, 'like_id')
            ->get();

        return $animals;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'detail' => 'required',
            'categories' => 'required',
            'image' => 'required|image',
            'found' => 'required'
        ]);

        try {
            $imageName = Str::random() . "." . $request->image->getClientOriginalExtension();
            /** @var \Illuminate\Filesystem\FilesystemAdapter */
            $filesystem = Storage::disk('public');
            $filesystem->putFileAs('images', $request->image, $imageName);

            Animal::create($request->post() + ['image' => $imageName]);

            return response()->noContent();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, animal $animal)
    {
        $request->validate([
            'name' => 'required',
            'detail' => 'required',
            'categories' => 'required',
            'image' => 'nullable',
            'found' => 'required'
        ]);

        try {
            $animal->fill($request->post())->update();

            if ($request->hasFile('image')) {
                if ($animal->image) {
                    $exists = Storage::disk('public')->exists("public/images/{$animal->image}");
                    if ($exists) {
                        Storage::disk('public')->delete("public/images/{$animal->image}");
                    }
                }

                $imageName = Str::random() . "." . $request->image->getClientOriginalExtension();
                /** @var \Illuminate\Filesystem\FilesystemAdapter */
                $filesystem = Storage::disk('public');
                $filesystem->putFileAs('images', $request->image, $imageName);

                $animal->image = $imageName;
                $animal->save();
            }

            return response()->noContent();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(animal $animal)
    {
        try {
            if ($animal->image) {
                $exists = Storage::disk('public')->exists("public/images/{$animal->image}");
                if ($exists) {
                    Storage::disk('public')->delete("public/images/{$animal->image}");
                }
            }

            $animal->delete();
            return response()->noContent();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
