import GetGroups from "../../../modules/Groups/application/GetGroups";
import DeleteGroup from "../../../modules/Groups/application/DeleteGroup";
import GroupsRepository from "../../../modules/Groups/repository/GroupsRepository";
import { GroupDataObject } from "../../../modules/Groups/domain/GroupInterface";
import {
  uniqueGroupIds,
  uniqueGroupsById,
} from "../../../shared/helpers/groupHelpers";
import { mapToGroup } from "../types/groupMapper";
import { Group } from "../types/group";

const repo = new GroupsRepository();

export const groupsService = {
  async getAll(): Promise<Group[]> {
    const app = new GetGroups(repo);
    const data = await app.getGroups();
    return uniqueGroupsById(data).map(mapToGroup);
  },

  async getByUser(userId: number): Promise<Group[]> {
    const app = new GetGroups(repo);
    const ids = uniqueGroupIds(await app.getGroupsByUserId(userId));

    const groups = await Promise.all(
      ids.map(async (id: number) => {
        try {
          return await app.getGroupById(id);
        } catch (error) {
          console.warn("Ignoring unavailable group:", id, error);
          return null;
        }
      })
    );

    const availableGroups = groups.filter(
      (group): group is GroupDataObject => Boolean(group),
    );

    return uniqueGroupsById(availableGroups)
      .map(mapToGroup);
  },

  async delete(id: number): Promise<void> {
    const app = new DeleteGroup(repo);
    await app.deleteGroup(id);
  },
};
