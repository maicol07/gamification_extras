<?php

/*
 * This file is part of maicol07/flarum-gamification-extras.
 *
 * Copyright (c) 2021 maicol07.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Maicol07\GamificationExtras;

use Flarum\Extend;
use Flarum\Post\Event\Deleted;
use Flarum\Post\Event\Posted;
use FoF\Gamification\Api\Serializers\RankSerializer;
use FoF\Gamification\Events\PostWasVoted;
use Maicol07\GamificationExtras\Listener;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\ApiSerializer(RankSerializer::class))
        ->attribute('groups', function ($serializer, $model) {
            return $model->groups;
        }),

    (new Extend\Event())
        ->listen(PostWasVoted::class, Listener\SaveGroupsToDatabase::class)
        ->listen(Posted::class, Listener\AddGroupHandler::class)
        ->listen(Deleted::class, Listener\RemoveGroupHandler::class)
];
