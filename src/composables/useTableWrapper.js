import { useRelationStore } from '@/stores/useRelationStore';

const store = useRelationStore();

export function useTableWrapper(api, axios, rows) {
  const Get = async () => {
    if (!store.modified(api)) {
      return rows;
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

  const Insert = async (array, target) => {
    return await axios
      .put(api, target)
      .then((resp) => {
        target.id = resp.data.data;
        array.push(target);
        return array;
      })
      .catch(() => {
        return array;
      });
  };

  const Update = async (array, target) => {
    return await axios
      .post(api, target)
      .then(() => {
        const idx = array.findIndex((item) => item.id === target.id);
        array[idx] = target;
        return array;
      })
      .catch(() => {
        return array;
      });
  };

  const Delete = async (array, target) => {
    const url = api + '/' + target.id;
    return axios
      .delete(url, target)
      .then(() => {
        return _filter(array, target);
      })
      .catch(() => {
        return array;
      });
  };

  const Ignore = async (array, target) => {
    return axios
      .put(api, target)
      .then(() => {
        return _filter(array, target);
      })
      .catch(() => {
        return array;
      });
  };

  const Restore = async (array, target) => {
    return await Ignore(array, target);
  };

  const Selected = (row, selected) => {
    let data = selected;
    if (data.length == 0) {
      data.push(row);
    }
    return data;
  };

  const _filter = (array, target) => {
    if (target?.length > 0) {
      return array.filter((item) => !target.includes(item));
    } else {
      return array.filter((item) => item.id !== target.id);
    }
  };

  return { Get, Insert, Update, Delete, Ignore, Restore, Selected };
}
