exports.makeRefObj = (shopData) => {
  if (shopData.length === 0) {
    return {};
  }
  let shopObj = {};
  shopData.forEach((obj) => {
    shopObj[obj.shop_name] = obj.shop_id;
  });

  return shopObj;
};
