import os

print("Enter path")
path = input()

Types = {
    "Music": ['mp3'],
    "Documents": ['pdf', 'doc', 'docx', 'xlsx', 'txt', 'ppt', 'pptx'],
    "Image" : ['jpg', 'jpeg', 'jfif', 'png', 'pjpeg' , 'pjp', 'svg', 'webp'],
    "Archive" : ['zip', 'rar', 'tar'],
    "video" : ['mp4']
}

def getType(filePath):
    _, ext = os.path.splitext(filePath)
    ext = ext[1:]
    for type in Types:
        for i in Types[type]:
            if i == ext:
                return type
    return "Other"

def transferFile(filePath, filename, dest, fileType):
    dest = os.path.join(dest, fileType)
    if os.path.exists(dest) == False:
        os.mkdir(dest)
    dest = os.path.join(dest, filename)
    os.rename(filePath, dest)



def organiseHelper(src, dest):
    filenames = os.listdir(src)
    for i in filenames:
        if i != "Organised":
            filePath = os.path.join(src, i)
            fileType = getType(filePath)
            print(i, "Belongs to -->", fileType)
            transferFile(filePath, i, dest, fileType)
            print(i, "moved to -->", fileType)


def organise(path):
    if path == None:
        print("Enter path")
    else:
        if os.path.exists(path):
            dest = os.path.join(path, "Organised")
            if os.path.exists(dest) == False:
                os.mkdir(dest)
            organiseHelper(path, dest)
        else:
            print("Please Enter Correct path")
            
organise(path)

