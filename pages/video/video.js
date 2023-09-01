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
    //点击播放 / 继续播放的回调
    handlePlay(e) {
        /* 
        需求:
            1.在点击播放的时间中需要找到上一个播放的视频
            2.在播放新的视频之前关闭上一个正在播放的视频
        关键:
            1.如何找到上一个视频的实例对象
            2.如何去人点击播放的视频和正在播放的视频不是同一个视频
        单例模式:
            1. 需要创建多个对象的场景下,通过一个对象接收,始终保持一个对象
            2. 节省内存空间
        */
        let vid = e.currentTarget.id
        //关闭上一个的视频
        this.vid !== vid && this.videoContext?.stop()
        this.vid = vid
        //创建控制video标签的实例对象
        this.videoContext = wx.createVideoContext(vid)
        // this.videoContext.stop()

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