// upload.js
import * as qiniu from 'qiniu-js';

// 上传文件到七牛
export default async function upload(file) {
	// 用时间戳做为文件名
	const time = new Date().getTime();
	if (!window.qiniuUploadToken) {
		throw 'A method to obtain qiniu token needs to be mounted on the window, the function that window.qiniuUploadToken can execute.'
	}
	const token = await window.qiniuUploadToken();
	return qiniu.upload(file, time, token, {
		fname: time,
	});
}