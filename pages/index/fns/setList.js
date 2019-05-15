module.exports = function(name, action) {
  const { list } = this.data;

  return list.map(item => {
    if (item.name === name) {
      return {
        ...item,
        ...action
      };
    }
    return item;
  });
};
