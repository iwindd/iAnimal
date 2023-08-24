<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

use Exception;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = auth()->id();

        return Like::select(['likes.created_at', 'likes.id', 'animals.name'])
            ->join('animals', 'animals.id', '=', 'likes.animal_id')
            ->where('likes.user_id', $userId)
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $likeId   = 0;
        $already  = Like::where('user_id', auth()->id())
            ->where('animal_id', $request->id)
            ->first('id');


        if (!$already) {
            $query = Like::create([
                'user_id' => auth()->id(),
                'animal_id' => $request->id
            ]);

            $likeId = $query->id;
        } else {
            $likeId = $already->id;
        }

        return response()->json([
            'message' => 'success',
            'likeId' => $likeId
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy(Like $like)
    {
        try {
            $like->delete();

            return response()->noContent();
        } catch (Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
