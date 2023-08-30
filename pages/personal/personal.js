// pages/personal/personal.js
let startY = 0 //手指起始的坐标
let moveY = 0 //手指移动的坐标
let moveDistance = 0 //手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform:"translateY(0)",
        coverTransition:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        if(moveDistance <= 0) return
        if (moveDistance >= 80) moveDistance = 80
        this.setData({
            coverTransform:`translateY(${moveDistance}rpx)`,
            coverTransition:""
        })
    },
    handleTouchEnd(e) {
        this.setData({
            coverTransform:`translateY(0)`,
            coverTransition:`transform .5s linear`
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