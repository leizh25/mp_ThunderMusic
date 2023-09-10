// pages/search/search.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: "", //placeholder的内容
        hotList: [], //热搜榜数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取初始化数据
        this.getInitData()
    },
    //获取初始化的数据
    async getInitData() {
        let placeholderData = await request("/search/default")
        let hotListData = await request("/search/hot/detail")
        // console.log('placeholderData: ', placeholderData);
        this.setData({
            placeholderContent: placeholderData.data.showKeyword,
            hotList: hotListData.data
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