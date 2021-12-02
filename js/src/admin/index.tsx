const gamification = require('@fof-gamification');
import app from 'flarum/admin/app';
import GroupBadge from "flarum/common/components/GroupBadge";
import Select from "flarum/common/components/Select";
import Switch from "flarum/common/components/Switch";
import {extend} from "flarum/common/extend";
import Model from "flarum/common/Model";
import Group from "flarum/common/models/Group";
import {setting} from "../common/helpers";
import {GroupInterface} from "../common/Interfaces";
import type ItemList from "flarum/common/utils/ItemList";
import withAttr from 'flarum/common/utils/withAttr';

app.initializers.add('gamification-extras', () => {
  gamification.Rank.groups = Model.attribute('groups');
  // @ts-ignore
  Group.prototype.stickyRank = Model.hasOne('sticky_rank');

  const ranks = app.store.all('ranks');
  const groups: { [index: number]: string | null } = {
    0: null
  };
  for (const group of app.store.all('groups')) {
    groups[group.id()] = group.nameSingular()
  }

  extend(gamification.SettingsPage.prototype, 'settingsItems', function (items: ItemList) {
    ranks.map((rank) => {
      items.add('gamification-extras.group-linking',
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

      // @ts-ignore
      items.add('gamification-extras.sticky_rank',
        <fieldset className="Form-group">
          <legend>{app.translator.trans('fof-gamification.admin.page.sticky-ranks.title')}</legend>
          <label>{app.translator.trans('fof-gamification.admin.page.sticky-ranks.label')}</label>
          <div className="helpText">{app.translator.trans('fof-gamification.admin.page.sticky-ranks.help')}</div>
          <table className="Ranks--Container">
            {app.store.all('groups').map((group: GroupInterface) => {
              return (
                <>
                  <tr>
                    <td><GroupBadge group={group}/></td>
                    <td>
                      <b className="Ranks-group"
                         style="margin-right: 8px; margin-left: 5px;">{group.nameSingular()}</b>
                    </td>
                    <td>
                      <Select className="FormControl name"
                              options={ranks}
                              value={group.stickyRank() ? group.stickyRank().id() : ''}
                              placeholder={app.translator.trans('fof-gamification.admin.page.ranks.help.name')}
                              onchange={(value: number) => updateStickyRank(group, value)}/>
                    </td>
                  </tr>
                  <tr style="height: 8px;"/>
                </>
              );
            })}
        </table>
        <Switch state={setting('onlyOneStickyRank')} onchange={setting('onlyOneStickyRank')}
                className="votes-switch">
          {app.translator.trans('fof-gamification.admin.page.sticky-ranks.only_one_sticky_rank')}
        </Switch>
      </fieldset>
      );
    });
  });

  function updateGroups(rank: Model, value: number) {
    rank.save({ groups: [value] });
  }

  function updateStickyRank(group: GroupInterface, value: number) {
    const emptyValue = {
      data: []
    }
    group.save({ relationships: { sticky_rank: value ? (app.store.getById('ranks', value) ?? emptyValue) : emptyValue } })
  }
});
