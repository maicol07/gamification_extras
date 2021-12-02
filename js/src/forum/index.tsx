import app from 'flarum/forum/app';
import stickyRanks from './sticky_ranks';

app.initializers.add('gamification-extras', () => {
  stickyRanks();
});
