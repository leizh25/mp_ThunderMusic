import request from "../../utils/request"

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], //轮播图数据
        recommendList: [], //推荐歌单
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const bannerListData = await request("/banner", {
            type: 2
        })
        this.setData({
            bannerList: bannerListData
        })

        //获取推荐歌单
        const recommendList = await request("/personalized", {
            limit: 10
        })
        this.setData({
            recommendList:recommendList.result
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})