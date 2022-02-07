### Install

```js
    npm install --save @ctan/ckeditor5-qiniu-upload
```

### Use

```js

import QiniuUploadAdapter from '@ctan/ckeditor5-qiniu-upload/src/adapters/qiniuuploadadapter';


ClassicEditor.builtinPlugins = [
    QiniuUploadAdapter,
    ...
]

ClassicEditor.defaultConfig = {
    qiniuUpload: {
		imgPrefix: 'https://xxxx.cn/',
	},
}

```
