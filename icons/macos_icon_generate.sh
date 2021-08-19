#!/bin/bash
name="icon"
if [ ! -f "$name.png" ];then
	exit 1
fi
if [ -e "$name.icns" ];then
	rm "$name.icns"
fi
if [ -e "${name}s.iconset" ];then
	rm -r "${name}s.iconset"
fi
mkdir -p "${name}s.iconset"
for x in 16 32 128 256 512
do
	sips -z "$x" "$x" "$name.png" --out "${name}s.iconset/icon_${x}x${x}.png"
	x=$[$x*2]
	sips -z "$x" "$x" "$name.png" --out "${name}s.iconset/icon_$[$x/2]x$[$x/2]@2x.png"
done
iconutil -c icns "${name}s.iconset" -o "$name.icns"
rm -r "${name}s.iconset"
