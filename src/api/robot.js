import request from "@/utiles/request";


// 小智同学
export const getRobot = data => request({
    url: '/v1_0/socket.io/',
    method: 'POST',
    data,
    transports: ['websocket']

})