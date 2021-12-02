const gamification = require('@fof-gamification');

import {extend} from "flarum/common/extend";
import Model from "flarum/common/Model";
import User from "flarum/common/models/User";
import PostUser from "flarum/forum/components/PostUser";
import UserCard from "flarum/forum/components/UserCard";
import {VnodeDOM} from "mithril";
import {findFirstVdomChild, setting} from "../common/helpers";
import {GroupInterface} from "../common/Interfaces";

interface UserInterface extends User {
  groups(): GroupInterface[];
  ranks(): Model[]
}

function getStickyRanks(user: UserInterface) {
  let groupsWithStickyRank: GroupInterface[] = [];

  if (user.groups()) {
    // Filter groups to check which of these have a sticky rank
    groupsWithStickyRank = user.groups().filter((group) => {
      return group.stickyRank();
    });

    if (setting('onlyOneStickyRank') && groupsWithStickyRank.length) {
      let higher: GroupInterface;

      for (const group of groupsWithStickyRank) {
        const rank = group.stickyRank()
        // @ts-ignore
        if (!higher || rank.points > higher.points) {
          higher = group;
        }
      }

      // @ts-ignore
      groupsWithStickyRank = [higher];
    }
  }

  return groupsWithStickyRank.map((group: GroupInterface) => group.stickyRank());
}

export default function stickyRanks() {
  extend(UserCard.prototype, 'view', function (this: UserCard, vnode: VnodeDOM) {
    // @ts-ignore
    const user: UserInterface = this.attrs.user;
    const amt = Number(setting('rankAmt', true));
    const stickyRanks = getStickyRanks(user);

    findFirstVdomChild(vnode, '.UserCard-profile .UserCard-badges', (badges) => {
      badges.children = [];

      if (stickyRanks.length > 0) {
        const ranks = stickyRanks
          .map((rank, i) => {
            if (!amt || i < amt) {
              return <li className="User-Rank">{gamification.rankLabel(rank)}</li>;
            }
            return null;
          });

        for (const rank of ranks) {
          if (rank) {
            // @ts-ignore
            badges.children.push(rank);
          }
        }
      }
    });

    return vnode;
  });

  extend(PostUser.prototype, 'view', function (this: PostUser, vnode: VnodeDOM) {
    // @ts-ignore
    const post = this.attrs.post;
    const user = post.user();
    if (!user) {
      return vnode;
    }

    const header_node = findFirstVdomChild(vnode, 'h3');
    const amt = Number(setting('rankAmt')) ?? user.ranks().length;
    const stickyRanks = getStickyRanks(user);

    if (stickyRanks.length > 0 && header_node) {
      header_node.children = [
        // @ts-ignore
        ...header_node.children,
        ...stickyRanks
          .splice(0, amt)
          .map((rank) => <span className="Post-Rank">{gamification.rankLabel(rank)}</span>)
        ].filter(function (el) {
          return el.tag !== undefined;
        });
      }

    return vnode;
  });
}
