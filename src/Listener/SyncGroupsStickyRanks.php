<?php

namespace Maicol07\GamificationExtras\Listener;

use Flarum\Group\Event\Saving;
use FoF\Gamification\Rank;
use Illuminate\Support\Arr;

class SyncGroupsStickyRanks
{
    public function handle(Saving $event): void
    {
        $group = $event->group;
        if ($group) {
            $rank = Arr::get($event->data, 'relationships.sticky_rank.data.id');
            if (empty($rank)) {
                $group->sticky_rank()->dissociate();
            } else {
                $group->sticky_rank()->associate(Rank::where('id', $rank)->first());
            }
        }
    }
}
