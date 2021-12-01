<?php

namespace Maicol07\GamificationExtras\Listener;

use FoF\Gamification\Events\PostWasVoted;
use FoF\Gamification\Rank;

class SaveGroupsToDatabase
{
    public function handle(PostWasVoted $event): void
    {
        $user = $event->vote->post->user;
        if ($user) {
            $old_groups = $user->ranks()->pluck('groups')->unique();

            $ranks = Rank::where('points', '<=', $user->votes);
            $new_groups = $ranks->pluck('groups')->unique();

            $user->ranks()->sync($ranks->pluck('id'));

            $user->groups()->detach($old_groups);

            if (!($new_groups->containsOneItem() && $new_groups->first() === "null")) {
                $user->groups()->attach($new_groups);
            }
        }
    }
}
