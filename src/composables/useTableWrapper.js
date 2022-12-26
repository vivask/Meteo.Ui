import { useRelationStore } from '@/stores/useRelationStore';

const store = useRelationStore();

export function useTableWrapper(api, axios, rows) {
  const Get = async (force) => {
    if (!force && !store.modified(api)) {
      return rows.value;
    } else {
      return await axios
        .get(api)
        .then((response) => {
          store.refresh(api);
          return response.data.data;
        })
        .catch(() => {
          return [];
        });
    }
  };

  const Insert = async (target) => {
    return await axios
      .put(api, target)
      .then((resp) => {
        target.id = resp.data.data;
        rows.value.push(target);
        store.modify(api);
        return rows.value;
      })
      .catch(() => {
        return rows.value;
      });
  };

  const Update = async (target) => {
    return await axios
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
    return axios
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
    return axios
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
