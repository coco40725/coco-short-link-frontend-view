import {Storage} from '@google-cloud/storage';
import cache from 'gulp-cache';
import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime-types';
import through from 'through2';
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const distDir = path.join(__dirname, 'dist/')
const bucketName = 'coco-app'


const projectNameTest = 'test/coco-short-link'
const projectNameProd = 'coco-short-link'
const storage = new Storage({
    projectId: 'aaron-dev-429414',
    keyFilename: './key/gcp-credentials.json'
})


const cleanGCS = async (bucketName, storage) => {
    const options = {
        prefix: `app/${projectName}/`,
    }

    const [files] = await storage.bucket(bucketName).getFiles(options)
    for (let file of files) {
        await storage.bucket(bucketName)
            .file(file.name)
            .delete()
        console.log(`${file.name} is deleted`)
    }
}

const findAllUploadFilesPath = async (dir, multiDistEntireFilePath = []) => {
    const files = await fs.readdir(dir)

    for (let file of files) {
        const entireFilepath = path.join(dir, file)
        const fileStatus = await fs.stat(entireFilepath)

        if (fileStatus.isDirectory()) {
            multiDistEntireFilePath = await findAllUploadFilesPath(entireFilepath, multiDistEntireFilePath)
        } else {
            multiDistEntireFilePath.push(entireFilepath)
        }
    }

    return multiDistEntireFilePath
}

const uploadToGCS = async (bucketName, projectName) => {
    // await cleanGCS(bucketName, storage)
    const multiDistEntireFilePath = await findAllUploadFilesPath(distDir)
    console.log("projectName", projectName)
    multiDistEntireFilePath.forEach(distEntireFilePath => {
        storage.bucket(bucketName)
            .upload(distEntireFilePath,
                {
                    destination: `${projectName}/${distEntireFilePath.replace(distDir, '').replace(/\\/g, '/')}`,
                    metadata: {
                        cacheControl: 'no-store',
                    },
                },
                (err, file) => {
                    if (file) console.log(`Upload ${file.name} successfully`)
                }
            )
    })
}

const minifyImage = sourceImage => {
    return gulp
        .src(sourceImage, {base: './src'})
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('./dist'))
}




gulp.task('minifyImage', minifyImage.bind(minifyImage, './src/assets/**/*.@(jpg|png|svg)'))

/* 上傳 GCS */
gulp.task('uploadToGcsTest', uploadToGCS.bind(uploadToGCS, bucketName, projectNameTest))
gulp.task('uploadToGcsProd', uploadToGCS.bind(uploadToGCS, bucketName, projectNameProd))

/* 部署 */
gulp.task('deployToTest',
    gulp.series( 'uploadToGcsTest')
)


gulp.task('deployToProd',
    gulp.series( 'uploadToGcsProd')
)
