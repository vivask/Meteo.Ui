import { jwtClient } from './jwtClient';

const relations = {
  '/proxy/autovpn': [{ '/proxy/ignorevpn': true }],
  '/proxy/ignorevpn': [{ '/proxy/autovpn': true }],
  '/schedule/tasks': [{ '/schedule/jobs': true }],
  '/schedule/jobs': [{ '/schedule/cron': true }],
  '/sshclient/sshkeys': [{ '/sshclient/sshhosts': true }, { '/sshclient/gitusers': true }],
};

export function tableWrapper(api, rows) {
  const Get = async (force) => {
    if (!force && !modifiedRelations(api)) {
      return rows.value;
    } else {
      return await jwtClient
        .get(api)
        .then(({ success, result }) => {
          if (!success) {
            return [];
          } else {
            refreshRelations(api);
            return result;
          }
        })
        .catch((err) => {
          console.log('get error: ', err);
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
          modifyRelations(api);
        }
        return rows.value;
      })
      .catch((err) => {
        console.log('insert error: ', err);
        return rows.value;
      });
  };

  const Update = async (target) => {
    return await jwtClient
      .post(api, target)
      .then(({ success }) => {
        if (success) {
          const idx = rows.value.findIndex((item) => item.id === target.id);
          rows.value[idx] = target;
          modifyRelations(api);
        }
        return rows.value;
      })
      .catch((err) => {
        console.log('update error: ', err);
        return rows.value;
      });
  };

  const Delete = async (target) => {
    const url = api + '/' + target.id;
    return jwtClient
      .delete(url, target)
      .then(({ success }) => {
        if (success) modifyRelations(api);
        return filter(target);
      })
      .catch((err) => {
        console.log('delete error: ', err);
        return rows.value;
      });
  };

  const Ignore = async (target) => {
    return jwtClient
      .put(api, target)
      .then(({ success }) => {
        if (success) modifyRelations(api);
        return filter(target);
      })
      .catch((err) => {
        console.log('ignore error: ', err);
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

  const filter = (target) => {
    if (target?.length > 0) {
      return rows.value.filter((item) => !target.includes(item));
    } else {
      return rows.value.filter((item) => item.id !== target.id);
    }
  };

  function modifyRelations(from) {
    if (relations[from] !== undefined) {
      for (let item of relations[from]) {
        Object.keys(item).forEach((key) => {
          item[key] = true;
        });
      }
    }
  }

  function refreshRelations(to) {
    Object.values(relations).forEach((dest) => {
      for (let item of dest) {
        Object.keys(item).forEach((key) => {
          if (to === key) {
            item[key] = false;
          }
        });
      }
    });
  }

  function modifiedRelations(to) {
    let result = true;
    Object.values(relations).forEach((values) => {
      for (let item of values) {
        Object.keys(item).forEach((key) => {
          if (to === key) {
            result = item[key];
          }
        });
      }
    });
    return result;
  }

  return { Get, Insert, Update, Delete, Ignore, Restore, Selected };
}
