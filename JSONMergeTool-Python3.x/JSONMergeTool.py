# coding:utf-8
import os
import sys

# 传入相对路径
targetdir = ""
targetName = ""

if (len(sys.argv) > 1):
    targetdir = sys.argv[1]
    targetName = sys.argv[2]
else:
    targetdir = ".\\..\\..\\bin\\res\\TiledMap\\"
    targetName = "TiledMap.json"

# print(targetdir, targetName)

def getfilepaths(suffixname):
    filePaths = []
    l = os.walk(targetdir)
    for root, dirs, files in l:    #os.path.curdir
        for file in files:
            if os.path.splitext(file)[1] == suffixname:  # 匹配后缀名称
                if file.find(targetName) == -1:
                    filePaths.append(os.path.join(root, file))
        break
    return filePaths


def readfile(filepath, textlist, isfinally):
    sindex = filepath.rindex('\\') + 1
    eindex = filepath.rindex('.')
    filename = filepath[sindex:eindex]
    filename = '\"' + filename + '\":'

    print(filepath)

    try:
        f = open(filepath, mode="r", encoding="utf-8")
    except UnicodeDecodeError as e:
        f = open(filepath, mode="r")

    # 方法一
    # content = fileopen.read()
    # content = filename + content
    # if isfinally:
    #     content = content + ','

    # 方法二
    lines = f.readlines()
    lines.insert(0, filename)
    if isfinally:
        lines.append(',')
    content = "".join(lines)

    textlist.extend(content)
    f.close()


def readallfiles(filepaths):
    contentList = []
    i = 0
    for path in filepaths:
        i += 1
        if i == len(filepaths):
            readfile(path, contentList, False)
        else:
            readfile(path, contentList, True)
    return contentList


def writefile(filepath, textlist):
    # if(os.path.exists(filepath)):
    #     os.remove(filepath)
    # os.system("pause")

    texts = "".join(textlist).replace("\n", "").replace("\t", "").replace("\r", "").replace(" ", "")

    f = open(filepath, mode="w+", encoding="utf-8")
    f.seek(0)
    f.truncate()    # 清空文件内容
    f.write("{")
    f.write(texts)
    f.write("}")
    f.close()


def merge(filePaths):
    mergeList = readallfiles(filePaths)
    writefile(targetdir + targetName, mergeList)


if __name__ == '__main__':
    filePaths = getfilepaths('.json')
    merge(filePaths)













