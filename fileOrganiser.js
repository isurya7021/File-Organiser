let fs = require('fs')
let path = require('path')
let a = process.argv.slice(2)

let Types = {
    Music : ['mp3'],
    Video : ['mp4'],
    Document : ['pdf', 'doc', 'docx', 'xlsx', 'ppt', 'pptx', 'txt'],
    Image : ['jpg', 'jpeg', 'jfif', 'png', 'pjpeg' , 'pjp', 'svg', 'webp'],
    Archive : ['zip', 'tar', 'rar']
}

organiseFn(a[0])

function organiseFn(srcPath) {
    if (srcPath == undefined) {
        console.log('Please Enter path')
    } else {
        let doesExists = fs.existsSync(srcPath)
        if (doesExists) {
            let dest = path.join(srcPath, 'OrganisedFiles')
            if (fs.existsSync(dest) == false) {
                fs.mkdirSync(dest)
            }
            organiseHelper(srcPath, dest)
        } else {
            console.log('Path does not exit')
        }
    }
}

function organiseHelper(src, dest) {
    let names = fs.readdirSync(src)
    for (let i = 0; i < names.length; i++) {
        let filePath = path.join(src, names[i])
        let isFile = fs.lstatSync(filePath).isFile()
        if (isFile) {
            let fileType = getFileType(filePath)
            console.log(names[i], ' belongs to --> ', fileType)
            sendFile(filePath, dest, fileType)
        }
    }
}

function sendFile(filePath, dest, fileType) {
    let destPath = path.join(dest, fileType)
    if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath)
    }
    let filename = path.basename(filePath)
    let destfilepath = path.join(destPath, filename)
    fs.copyFileSync(filePath, destfilepath)
    fs.unlinkSync(filePath)
    console.log(filename, ' Copied to ',  fileType)
}

function getFileType(filePath) {
    let ext = path.extname(filePath).slice(1)
    for (let type in Types) {
        let arr = Types[type]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == ext)
                return type
        }
    }
    return "Others"
}