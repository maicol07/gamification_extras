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

use Flarum\Api\Serializer\GroupSerializer;
use Flarum\Api\Controller;
use Flarum\Extend;
use Flarum\Group\Event\Saving;
use Flarum\Group\Group;
use Flarum\Post\Event\Deleted;
use Flarum\Post\Event\Posted;
use FoF\Extend\Extend\ExtensionSettings;
use FoF\Gamification\Api\Serializers\RankSerializer;
use FoF\Gamification\Events\PostWasVoted;
use FoF\Gamification\Rank;
use Maicol07\GamificationExtras\Listener;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    /* ***** Group linking ***** */
    (new Extend\ApiSerializer(RankSerializer::class))
        ->attribute('groups', function ($serializer, $model) {
            return $model->groups;
        }),

    (new Extend\Event())
        ->listen(PostWasVoted::class, Listener\SaveGroupsToDatabase::class)
        ->listen(Posted::class, Listener\AddGroupHandler::class)
        ->listen(Deleted::class, Listener\RemoveGroupHandler::class)
        ->listen(Saving::class, Listener\SyncGroupsStickyRanks::class),

    /* ***** Sticky ranks ***** */
    (new Extend\Model(Group::class))
        ->belongsTo('sticky_rank', Rank::class,'sticky_rank'),

    (new ExtensionSettings())
        ->setPrefix('gamification-extras.')
        ->addKeys([
            'onlyOneStickyRank'
        ]),

    (new Extend\ApiSerializer(GroupSerializer::class))
        ->hasOne('sticky_rank', RankSerializer::class),

    (new Extend\ApiController(Controller\ListGroupsController::class))
        ->addInclude('sticky_rank'),

    (new Extend\ApiController(Controller\CreateGroupController::class))
        ->addInclude('sticky_rank'),

    (new Extend\ApiController(Controller\UpdateGroupController::class))
        ->addInclude('sticky_rank'),

    (new Extend\ApiController(Controller\ShowForumController::class))
        ->addInclude('groups.sticky_rank')
];
