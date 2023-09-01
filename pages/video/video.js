// pages/video/video.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        navId: "",
        videoList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getVideoGroupListData()

    },
    //获取导航数据,
    async getVideoGroupListData() {
        let videoGroupListData = await request("/video/group/list")
        this.setData({
            videoGroupList: videoGroupListData.data.slice(0, 14),
            navId: videoGroupListData.data[0].id,
        })
        //获取视频列表数据
        this.getVideoList(this.data.navId)
    },
    //获取视频列表数据
    async getVideoList(navId) {
        let videoDetails = await request('/video/group', {
            id: navId
        });

        let videoInfoList = [];
        videoDetails.datas.forEach(i => {
            videoInfoList.push({
                id: i.data.vid,
                title: i.data.title,
                creator: i.data.creator,
                commentCount: i.data.commentCount,
                praisedCount: i.data.praisedCount,
                coverUrl: i.data.couverUrl,
                videoUrl: ""
            })
        })
        for (const i of videoInfoList) {
            let result = await request('/video/url', {
                id: i.id
            }).then(r => {
                i.videoUrl = r.urls[0].url
            })
        }
        this.setData({
            videoList: videoInfoList
        })
        //关闭消息提示框
        wx.hideLoading()
    },
    //点击切换导航的回调
    changeNav(e) {
        let navId = e.currentTarget.id
        this.setData({
            navId: navId * 1, //转数字类型
            videoList: []
        })
        //显示正在加载
        wx.showLoading({
            title: '正在加载',
            mask: true
        })
        //动态获取当前导航对应的视频数据
        this.getVideoList(this.data.navId)
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