import Model from "flarum/common/Model";
import Group from "flarum/common/models/Group";

export interface GroupInterface extends Group {
  id(): number;
  nameSingular(): string;
  stickyRank(): Model;
}
