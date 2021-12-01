<?php

namespace Maicol07\GamificationExtras\Listener;

use Flarum\Post\Event\Posted;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Gamification\Gamification;
use FoF\Gamification\Rank;

class AddGroupHandler
{
    private SettingsRepositoryInterface $settings;
    private Gamification $gamification;

    /**
     * EventHandlers constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param Gamification                $gamification
     */
    public function __construct(SettingsRepositoryInterface $settings, Gamification $gamification)
    {
        $this->settings = $settings;
        $this->gamification = $gamification;
    }

    /** @noinspection RepetitiveMethodCallsInspection */
    public function handle(Posted $event): void
    {
        if ('0' !== $this->settings->get('fof-gamification.autoUpvotePosts') && $event->post->exists()) {
            $actor = $event->actor;
            $ranks = Rank::where('points', '<=', $actor->votes)->get();

            if ($ranks) {
                $actor->groups()->detach($actor->ranks()->pluck('groups'));
                $actor->groups()->attach($ranks->pluck('groups'));
            }
        }
    }
}
