---
title: "Vendor Blob Extraction"
date: 2019-10-10T21:24:00+05:30
---

## How to extract vendor blobs from stock rom?

I got asked this question a lot, so I'll post it here. Its gonna just be steps on how to do it.

⚠️ Note that you need a fully synced rom source for this.

- Place the Device Tree with the extract-files.sh inside.

- If your device tree doesn't have an extract-files script, get it from github, its almost on every tree.

- Grab the stock rom for your device, MIUI/OOS or OneUI whatever.

- Create a new folder named dump and extract it there.

- Now see if it has a payload.bin or system.dat.br and vendor.dat.br

### If it has a payload.bin, then, your device is A/B, and the job is actually very easy,
- Use [this tool](https://forum.xda-developers.com/attachment.php?attachmentid=4760222) and run the python file in it.
- You will now have img files ready.

### You are unlucky and have br files inside.

So what? We can still extract them, a bit of more work, but yes we can.

- Install brotli from your package manager
- Run the following commands, it will decompress the brotli compression of your images
```bash
brotli --decompress system.new.dat.br
brotli --decompress vendor.new.dat.br
```
- Now we to convert the dat files to img, run these commands on terminal, to convert it
```bash
curl -sLo sdat2img.py https://raw.githubusercontent.com/xpirt/sdat2img/master/sdat2img.py
python3 sdat2img.py system.transfer.list system.new.dat
python3 sdat2img.py vendor.transfer.list vendor.new.dat vendor.img
```
- Now you would have both the images ready for extracting.

### Final Step

Lets Extract the img files we have!

- Create folders for extracting.
```bash
mkdir -p system
mkdir -p vendor
```
- Install P7-Zip from your package manager

- Now the extraction.
```bash
7z x system.img -y -osystem
7z x vendor.img -y -ovendor
```

In your folder, there would be two folders system and vendor, with many files now.

### Pulling  blobs

- The work directory which had the system and vendor folders is assumed to be at ~/dump for now.

- cd to the device tree, and run the command

```bash
bash extract-files.sh ~/dump
```

- Your vendor blobs would be at `vendor/brand/device`
