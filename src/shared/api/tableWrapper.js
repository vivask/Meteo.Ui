import { jwtClient } from '../../shared/api/jwtClient';
import { useLoaderStore } from '../../shared/stores/useLoaderStore';
import { useRelationStore } from '../../shared/stores/useRelationStore';

const store = useRelationStore();

export const _Get = async (api, rows, force) => {
  if (!force && !store.modified(api)) {
    return rows.value;
  } else {
    return await jwtClient
      .get(api)
      .then((response) => {
        store.refresh(api);
        useLoaderStore().useSpinner(false);
        return response.data.data;
      })
      .catch(() => {
        return [];
      });
  }
};

export const _Insert = async (api, rows, target) => {
  return await jwtClient
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

export const _Update = async (api, rows, target) => {
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

export const _Delete = async (api, rows, target) => {
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

export const _Ignore = async (api, rows, target) => {
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

export const _Restore = async (target) => {
  return await _Ignore(target);
};

export const _Selected = (row, selected) => {
  let data = selected;
  if (data.length == 0) {
    data.push(row);
  }
  return data;
};

const _filter = (rows, target) => {
  if (target?.length > 0) {
    return rows.value.filter((item) => !target.includes(item));
  } else {
    return rows.value.filter((item) => item.id !== target.id);
  }
};
