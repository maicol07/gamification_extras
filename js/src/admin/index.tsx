const gamification = require('@fof-gamification');
import app from 'flarum/admin/app';
import Select from "flarum/common/components/Select";
import {extend} from "flarum/common/extend";
import Model from "flarum/common/Model";
import Group from "flarum/common/models/Group";
import type ItemList from "flarum/common/utils/ItemList";
import withAttr from 'flarum/common/utils/withAttr';

interface GroupInterface extends Group {
  id(): number;

  nameSingular(): string;
}


app.initializers.add('gamification-extras', () => {
  gamification.Rank.groups = Model.attribute('groups');

  const ranks = app.store.all('ranks');
  const groups: { [index: number]: string | null } = {
    0: null
  };
  app.store.all('groups').forEach((group: GroupInterface) => groups[group.id()] = group.nameSingular());

  extend(gamification.SettingsPage.prototype, 'settingsItems', function (items: ItemList) {
    ranks.map((rank) => {
      items.add('gamification-extras',
        <fieldset className="Form-group">
          <legend>Gamification Extras</legend>
          <label>Some extra features provided by <a href="https://maicol07.it">maicol07</a></label>
          <Select className="FormControl Ranks-group"
                  value={Array.isArray(rank.groups()) ? rank.groups()[0] : rank.groups()}
                  options={groups}
                  placeholder={app.translator.trans('gamification-extras.admin.page.ranks.group')}
                  onchange={withAttr('value', (value: number) => updateGroups(rank, value))}
          />
        </fieldset>
      );
    });
  });

  function updateGroups(rank: Model, value: number) {
    rank.save({ groups: [value] });
  }
});
