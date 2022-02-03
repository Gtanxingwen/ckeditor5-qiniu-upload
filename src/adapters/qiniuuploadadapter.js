/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module upload/adapters/qiniuuploadadapter
 */

/* globals XMLHttpRequest, FormData */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import qiniuUpload from '../upload.js';
import { logWarning } from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

export default class QiniuUploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'QiniuUploadAdapter';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const options = this.editor.config.get( 'qiniuUpload' );

		if ( !options ) {
			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new Adapter( loader, options );
		};
	}
}

class Adapter {
	constructor( loader, options ) {
		this.loader = loader;
		this.options = options;
	}
	async upload() {
		const file = await this.loader.file;
		this.uploader = await qiniuUpload(file, this.options);
		return new Promise((resolve, reject) => {
			this.uploader.subscribe(
				(data) => {},
				(error) => {
					console.error(error);
					return reject(error);
				},
				(data) => {
					return resolve({
						default: this.options.imgPrefix + data.key,
					});
				}
			);
		});
	}

	abort() {
		if (this.uploader) {
			this.uploader.unsubscribe();
		}
	}
}