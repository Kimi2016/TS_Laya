@echo off
echo ----------------------Merge JSON start----------------------

rem 第一个参数：文件夹的路径（支持相对路径），第二个参数：生成的文件夹名称（带后缀名称）
python JSONMergeTool.py .\\..\\..\\bin\\res\\TiledMap\\ TiledMap.json


echo ----------------------Merge JSON complete----------------------

pause

