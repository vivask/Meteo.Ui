import { jwtClient } from '../../shared/api/jwtClient';
import { useRelationStore } from '../../shared/stores/useRelationStore';

const store = useRelationStore();

export function useTableWrapper(api, rows) {
  const Get = async (force) => {
    if (!force && !store.modified(api)) {
      return rows.value;
    } else {
      return await jwtClient
        .get(api)
        .then(({ success, result }) => {
          if (!success) {
            return [];
          } else {
            store.refresh(api);
            return result;
          }
        })
        .catch(() => {
          return [];
        });
    }
  };

  const Insert = async (target) => {
    return await jwtClient
      .put(api, target)
      .then(({ success, result }) => {
        if (success) {
          target.id = result;
          rows.value.push(target);
          store.modify(api);
        }
        return rows.value;
      })
      .catch(() => {
        return rows.value;
      });
  };

  const Update = async (target) => {
    return await jwtClient
      .post(api, target)
      .then(() => {
        const idx = rows.value.findIndex((item) => item.id === target.id);
        rows.value[idx] = target;
        store.modify(api);
        return rows.value;
      })
      .catch(() => {
        return rows.value;
      });
  };

  const Delete = async (target) => {
    const url = api + '/' + target.id;
    return jwtClient
      .delete(url, target)
      .then(() => {
        store.modify(api);
        return _filter(target);
      })
      .catch(() => {
        return rows.value;
      });
  };

  const Ignore = async (target) => {
    return jwtClient
      .put(api, target)
      .then(() => {
        store.modify(api);
        return _filter(target);
      })
      .catch(() => {
        return rows.value;
      });
  };

  const Restore = async (target) => {
    return await Ignore(target);
  };

  const Selected = (row, selected) => {
    let data = selected;
    if (data.length == 0) {
      data.push(row);
    }
    return data;
  };

  const _filter = (target) => {
    if (target?.length > 0) {
      return rows.value.filter((item) => !target.includes(item));
    } else {
      return rows.value.filter((item) => item.id !== target.id);
    }
  };

  return { Get, Insert, Update, Delete, Ignore, Restore, Selected };
}
