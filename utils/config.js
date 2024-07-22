var domain = "http://212.129.154.86:8086"; //统一接口域名，测试环境

var bannerUrl = "/indexImgs"   // 首页轮播图
var noticeList = "/shop/notice/noticeList"   // 公告列表
var prodTagList = "/prod/tag/prodTagList"   // 公告列表
var prodListByTagId = "/prod/prodListByTagId"   // 公告列表
var categoryInfo = "/category/categoryInfo"   // 公告列表
var pageProd = "/prod/pageProd"   // 分类列表右侧的数据
var prodCount = "/p/shopCart/prodCount"   // 购物车数量
var prodInfoUrl = "/prod/prodInfo"   // 购物车数量
var isCollectionUrl = "/p/user/collection/isCollection"   // 根据商品id获取该商品是否在收藏夹中
var addOrCancelUrl = "/p/user/collection/addOrCancel"   // 添加-取消收藏
var prodsByUserUrl = "/p/user/collection/prods"   // 获取用户收藏商品列表
var collectionCountUrl = "/p/user/collection/count"   // 获取用户收藏商品列表
var prodCommDataUrl = "/prodComm/prodCommData"   // 评论数据
var prodCommPageByProdUrl = "/prodComm/prodCommPageByProd"   // 评论数据
var hotSearchByShopIdUrl = "/search/hotSearchByShopId"   // 根据店铺ID获取热搜数据
var searchProdPageUrl = "/search/searchProdPage"   // 根据店铺ID获取热搜数据
var lastedProdPageUrl = "/prod/lastedProdPage"   // 根据店铺ID获取热搜数据



/**************    购物车    ************** */
var cartInfoUrl = "/p/shopCart/info"   // 根据店铺ID获取热搜数据
var prodCountUrl = "/p/shopCart/prodCount"   // 根据店铺ID获取热搜数据
var totalPayUrl = "/p/shopCart/totalPay"   // 根据店铺ID获取热搜数据
var changeItemUrl = "/p/shopCart/changeItem"   // 添加、修改用户购物车物品
var deleteItemUrl = "/p/shopCart/deleteItem"   // 删除用户购物车物品

/**************    公告    ************** */
var noticeListUrl = "/shop/notice/noticeList"   // 公告列表信息
var noticeInfoUrl = "/shop/notice/info"   // 公告详情信息


/**************    订单    ************** */
var orderConfirmUrl = "/p/order/confirm"   // 删除用户购物车物品
var myOrderUrl = "/p/myOrder/myOrder"   // 删除用户购物车物品
var cancelOrderUrl = "/p/myOrder/cancel"   // 根据订单号取消订单


/**************    地址    ************** */
var addAddrUrl = "/p/address/addAddr"   // 删除用户购物车物品
var addrInfoUrl = "/p/address/addrInfo"   // 获取地址信息
var deleteAddrUrl = "/p/address/deleteAddr"   // 删除订单用户地址




/***     用户接口     */
var loginUrl = "/login"
var registerUrl = "/user/register"  
var logoutUrl = "/logOut"  



exports.domain = domain;
exports.bannerUrl = bannerUrl;
exports.noticeList = noticeList;
exports.prodTagList = prodTagList;
exports.prodListByTagId = prodListByTagId;
exports.categoryInfo = categoryInfo;
exports.pageProd = pageProd;
exports.loginUrl = loginUrl;
exports.prodCount = prodCount;
exports.registerUrl = registerUrl;
exports.prodInfoUrl = prodInfoUrl;
exports.logoutUrl = logoutUrl;
exports.isCollectionUrl = isCollectionUrl;
exports.addOrCancelUrl = addOrCancelUrl;
exports.prodCommDataUrl = prodCommDataUrl;
exports.prodCommPageByProdUrl = prodCommPageByProdUrl;
exports.hotSearchByShopIdUrl = hotSearchByShopIdUrl;
exports.searchProdPageUrl = searchProdPageUrl;
exports.cartInfoUrl = cartInfoUrl;
exports.prodCountUrl = prodCountUrl;
exports.totalPayUrl = totalPayUrl;
exports.changeItemUrl = changeItemUrl;
exports.deleteItemUrl = deleteItemUrl;
exports.orderConfirmUrl = orderConfirmUrl;
exports.noticeListUrl = noticeListUrl;
exports.noticeInfoUrl = noticeInfoUrl;
exports.prodsByUserUrl = prodsByUserUrl;
exports.lastedProdPageUrl = lastedProdPageUrl;
exports.collectionCountUrl = collectionCountUrl;
exports.addAddrUrl = addAddrUrl;
exports.addrInfoUrl = addrInfoUrl;
exports.deleteAddrUrl = deleteAddrUrl;
exports.myOrderUrl = myOrderUrl;
exports.cancelOrderUrl = cancelOrderUrl;