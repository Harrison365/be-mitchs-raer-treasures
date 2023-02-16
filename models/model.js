const db = require("../db");

exports.selectTreasures = ({ sort_by = "age", order = "asc", colour }) => {
  order = order.toLowerCase();
  if (!["age", "cost_at_auction", "treasure_name"].includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort value" });
  }
  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order value :)" });
  }

  const queryValues = [];

  let queryStr = `
      SELECT treasures.*, shop_name FROM treasures
      JOIN shops ON treasures.shop_id = shops.shop_id `;

  if (colour) {
    queryValues.push(colour);
    queryStr += `WHERE colour = $1 `;
  }

  queryStr += `ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, queryValues).then(({ rows }) => rows);
};
