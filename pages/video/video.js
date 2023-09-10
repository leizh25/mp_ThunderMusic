// pages/video/video.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [], //导航标签数据
        navId: "", //导航的标识
        videoList: [], //视频列表数据
        isTriggered: false, //标识下拉刷新是否被触发
        offset: 0, //视频分页,
        isLoading: false, //是否正在加载

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
    async getVideoList(navId, offset = this.data.offset) {
        this.setData({
            isLoading: true
        })
        let videoDetails = await request('/video/group', {
            id: navId,
            offset
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
            videoList: this.data.videoList.concat(videoInfoList),
            //关闭下拉刷新
            isTriggered: false,
            isLoading: false
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
    //自定义下拉刷新的回调 : scroll-view
    handleRefresher() {
        // console.log("scroll-view下拉刷新");
        // 再次发请求,获取最新的视频列表数据
        this.setData({
            videoList: []
        })
        this.getVideoList(this.data.navId)
    },
    //自定义上拉触底的回调 scroll-view
    handleToLower() {
        // console.log("scroll-view上拉触底");
        //数据分页: 1.后端分页  2.前端分页
        if (this.data.isLoading) return
        console.log("发情请求 || 在前端截取最新的数据 追加到视频列表的后方");
        let tempOffset = this.data.offset
        this.getVideoList(this.data.navId, tempOffset + 1).then(() => {
            this.setData({
                offset: tempOffset + 1
            })
        })
    },
    //跳转到搜索页面
    toSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
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
        console.log("页面的下拉刷新");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log("页面的下拉触底");
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage({
        from
    }) {
        console.log('from: ', from);
        if (from == "button") {
            return {
                title: "来自button的转发",
                page: "/pages/video/video",
                imageUrl: "/static/images/nvsheng.jpg"
            }
        } else {
            return {
                title: "来自menu的转发",
                page: "/pages/video/video",
                imageUrl: "/static/images/nvsheng.jpg"
            }
        }

    }
})