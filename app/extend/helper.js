'use strict';

function convertOmitParams(query) {
  const obj = {};
  const entries = Object.entries(query);
  for (const [key, value] of entries) {
    if (value) {
      obj[key] = value;
    }
  }
  return obj;
}

function constructCovid19Model(sources, depth = 1, refId = -1) {
  if (depth > 3) {
    return [];
  }
  if (!Array.isArray(sources)) {
    console.log('数据类型异常');
    return [];
  }
  const areaData = sources.reduce((data, area) => {
    data.push({
      _id: area.id,
      name: area.name,
      today: area.today,
      total: area.total,
      last_update_date: new Date(area.lastUpdateTime),
      area_level: `${depth}`,
      parent_id: refId,
    });
    if (Array.isArray(area.children)) {
      data = [
        ...data,
        ...constructCovid19Model(area.children, depth + 1, area.id),
      ];
    }
    return data;
  }, []);
  return areaData;
}

module.exports = {
  convertOmitParams,
  constructCovid19Model,
};
