<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$methods): Response
    {
        $routeAction = $request->route()->getActionMethod(); // Get the current route action method

        if ($request->user() !== null && $request->user()->permission === 1) {
            return $next($request);
        }

        if (in_array($routeAction, $methods)){
            return $next($request);
        }

        return response('no allowed', 403);
    }
}
