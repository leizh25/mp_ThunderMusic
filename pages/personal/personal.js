import request from "../../utils/request"

// pages/personal/personal.js
let startY = 0 //手指起始的坐标
let moveY = 0 //手指移动的坐标
let moveDistance = 0 //手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: "translateY(0)",
        coverTransition: "",
        userInfo: {},
        recentPlayList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            //更新userInfo的状态
            this.setData({
                userInfo: JSON.parse(userInfo)
            })
        }
        //获取用户的播放记录
        this.getUserRecentPlayList()

    },
    //获取用户播放记录
    async getUserRecentPlayList() {
        let recentPlayListData = await request("/user/record", {
            uid: this.data.userInfo.userId,
            type: 0
        })
        let index = 0
        // let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => item.id = index++)
        this.setData({
            recentPlayList: recentPlayListData.allData.splice(0, 10)
        })
    },
    handleTouchStart(e) {
        //获取手指的起始坐标
        startY = e.touches[0].clientY

    },
    handleTouchMove(e) {
        moveY = e.touches[0].clientY
        moveDistance = moveY - startY
        // console.log('moveDistance: ', moveDistance);
        //动态更新coverTransform的状态值
        if (moveDistance <= 0) return
        if (moveDistance >= 80) moveDistance = 80
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`,
            coverTransition: ""
        })
    },
    handleTouchEnd(e) {
        this.setData({
            coverTransform: `translateY(0)`,
            coverTransition: `transform .5s linear`
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