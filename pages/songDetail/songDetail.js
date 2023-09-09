// pages/songDetail/songDetail.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, //标识音乐是否播放
        song: {}, //歌曲详情对象
        musicId: "", //音乐ID
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //接收路由跳转的query参数
        //原生小程序中路由传参对参数的长度有限制,如果参数长度过长,会自动截取掉
        // console.log('options: ', options);
        let musicId = options.musicId
        this.setData({
            musicId
        })
        // console.log('musicId: ', musicId);
        this.getMusicInfo(musicId)

    },
    //点击播放暂停的回调
    handleMusicPlay() {
        let isPlay = !this.data.isPlay
        this.setData({
            isPlay
        })
        let {
            musicId
        } = this.data
        this.musicControl(isPlay, musicId)
    },
    //获取音乐详情的功能函数
    async getMusicInfo(ids) {
        let songData = await request("/song/detail", {
            ids
        })
        console.log('songData: ', songData.songs[0]);
        this.setData({
            song: songData.songs[0]
        })
        //动态修改窗口标题
        wx.setNavigationBarTitle({
            title: this.data.song.name,
        })
    },
    //控制音乐播放 / 暂停的功能函数
    async musicControl(isPlay, musicId) {
        //创建控制音乐播放的实例对象
        let backgroundAudioManager = wx.getBackgroundAudioManager()
        if (isPlay) { //音乐播放
            //获取音乐播放链接
            let musicLinkData = await request("/song/url", {
                id: musicId
            })
            let musicLink = musicLinkData.data[0].url

            backgroundAudioManager.src = musicLink
            backgroundAudioManager.title = this.data.song.name

        } else { //暂停音乐
            backgroundAudioManager.pause()
        }
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