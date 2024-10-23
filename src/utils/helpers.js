export const toSortData = (array) => {
  const categoriesMap = new Set();
  const marketsByCategories = [];

  array.forEach((el) => categoriesMap.add(el.category));

  categoriesMap.forEach((category) => {
    const filteredMarketsByCategory = array.filter((market) => market.category === category);

    const categoryMarkets = [];

    filteredMarketsByCategory.forEach((el) => {
      categoryMarkets.push(el);
    });

    marketsByCategories.push({ category, markets: categoryMarkets });
  });

  return marketsByCategories
}

export const levelTopMarket = (market = {}, osType = '') => {
  return {
    category: market.category ?? '',
    shop: market.shop ?? '',
    pictureFileName: market[`pictureFileName_${osType}`] ?? '',
    iconFileName: market.iconFileName ?? '',
    description: market.description ?? '',
    webLink: market[`webLink_${osType}`] ?? ''
  }
}

export const levellAllMarket = (data = {}, osType = 'web') => {
  let market = {}

  if (osType === 'mobile') {
    market = {
      // category: data.category ?? '',
      shop: data.shop ?? '',
      iconFileName: data.iconFileName ?? '',
      webLink: data[`webLink_${osType}`] ?? ''
    }
  } else if (osType === 'web') {
    market = {
      // category: data.category ?? '',
      shop: data.shop ?? '',
      bannerFileName: data.bannerFileName ?? '',
      webLink: data[`webLink_${osType}`] ?? ''
    }
  }

  return market
}

export const levelMediumMarket = (data = {}, osType = 'web') => {
  return {
    // category: data.category ?? '',
    shop: data.shop ?? '',
    iconFileName: data.iconFileName ?? '',
    webLink: data[`webLink_${osType}`] ?? '',
    description: data.description
  }
}