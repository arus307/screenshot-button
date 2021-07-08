cd src
jsonData=`cat manifest.json`
version=""
version=$(echo $jsonData | jq -r '.version')

name="ScreenshotButton"

path="../$name-$version.zip"
zip $path -r .