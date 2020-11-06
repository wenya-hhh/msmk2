import request from './request'

export function gets(url, data) {
    return request.get(url, {
        params: data
    })
}

export function posts(url, data) {
    return request.post(url, data)
}
export let getBanner = data => gets('banner')
export let getTea = data => gets('teacher/' + data)
export let getTeaInfo = data => gets('teacher/info/' + data)
export let getMain = data => posts('teacher/mainCourse', data)
export let getComment = data => posts('teacher/comment', data)
// 大纲
export let getCourseChapter = data => posts('courseChapter', data)
// 收藏
export let getCollects = data => gets('teacher/collect/' + data)
// 收藏
export let getCollect = data => posts('collect', data)
// 取消收藏
export let getColl = data => request.put(`collect/cancel/${data}/1`)
// 学习详情
export let getStudy = data => gets(`myStudy/course/${data}`)
// 立即报名
export let getOrder = data => posts('order/downOrder', data)
// 我的关注/收藏
export let getCoList = data => gets(`collect?page=1&limit=10&type=${data}`, )
// 一对一辅导
export let getCourse = data => gets(`otoCourse?page=${data.page}&limit=${data.limit}&start_time=${data.start_time}&end_time=${data.end_time}&level_id=${data.level_id}&is_collect=${data.is_collect}&is_attended=${data.is_attended}&sex=${data.sex}&attr_val_id=${data.attr_val_id}`)
// 一对一辅导下拉菜单
export let getOtoCourseOptions = data => gets(`otoCourseOptions`)
// 修改头像
export let add_img = data => posts('public/img', data)
export let ok_up_user = data => request.put('user', data)
export let getClass = data => gets('module/attribute/1')
export let getVideo = data => gets(`getPcRoomCode/course_id=${data.id}/chapter_id=${data.video_id}`)

// 消息
export const msgDetailAjax = data => posts(`message/getMessage`,data); // 消息
export const messageAjax = data => posts(`message/classifyMessage`,data); // 消息

// 会员
export const vipAjax = data => gets(`vip/grade`,data); // 会员
export const downOrderAjax = data => posts(`order/downOrder`,data); // 充值
// 个人信息s
export const AjaxInfo = data => gets("userInfo", data); // 个人信息


