<?php

namespace Maicol07\GamificationExtras\Listener;

use Flarum\Post\Event\Deleted;
use FoF\Gamification\Rank;

class RemoveGroupHandler
{
    public function handle(Deleted $event): void
    {
        $user = $event->post->user;
        $user->save();
        $ranks = Rank::whereBetween('points', [$user->votes + 1, $user->votes + 2])->get();

        if (null !== $ranks) {
            $user->ranks()->detach($ranks);
            $user->groups()->detach($ranks->pluck('groups'));
        }
    }
}
