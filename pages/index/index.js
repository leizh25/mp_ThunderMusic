import request from "../../utils/request"

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList:[], //轮播图数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const bannerListData = await request("http://127.0.0.1:3000/banner", {
            type: 2
        })
        this.setData({
            bannerList:bannerListData
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